import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Modal,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {addData, getCollection, getCurrentTime} from '../apis/firebase';
import UserProfile from '../components/UserProfile';
import AntIcon from 'react-native-vector-icons/AntDesign';

function HomeScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [userProfileInfo, setUserProfileInfo] = useState([
    {name: '', email: '', address: '', interest: ''},
  ]);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userInterest, setUserInterest] = useState('');
  const [searchResult, setSearchResult] = useState([
    {name: '', email: '', address: '', interest: ''},
  ]);

  const searchUser = () => {
    console.log(searchText);
    console.log(
      userProfileInfo.filter(user => {
        return user.name == searchText || user.email == searchText;
      }),
    );
    if (
      userProfileInfo.filter(user => {
        return user.name == searchText || user.email == searchText;
      })
    ) {
      setSearchResult(
        userProfileInfo.filter(user => {
          return user.name == searchText || user.email == searchText;
        }),
      );
    } else {
      console.log('검색결과가 존재하지 않습니다');
    }
  };
  const registerUser = async () => {
    console.log(
      userProfileInfo.find(user => {
        console.log(user.email == userEmail);
      }),
    );
    try {
      // 파이어베이스에 유저 정보 등록
      if (
        userName !== 0 &&
        userEmail !== 0 &&
        userAddress !== 0 &&
        userInterest !== 0 &&
        !userProfileInfo.find(user => {
          return user.email == userEmail;
        })
      ) {
        const newUser = {
          name: userName,
          email: userEmail,
          address: userAddress,
          interest: userInterest,
          createdAt: getCurrentTime(),
        };
        await addData('Users', newUser);
        setUserProfileInfo([...userProfileInfo, newUser]);
        setModalVisible(!modalVisible);
        console.log('유저 등록 완료');
      } else {
        console.log('이미 가입된 이메일 입니다');
      }
    } catch (error) {
      console.log(`유저 등록 실패 - ${error}`);
    }
  };
  useEffect(() => {
    function onResult(querySnapshot) {
      const list = [];
      querySnapshot.forEach(doc => {
        console.log(doc.data());
        list.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setUserProfileInfo(list);
      if (searchText) {
        setUserProfileInfo(
          list.filter(user => {
            {
              return user.name == searchText || user.email == searchText;
            }
          }),
        );
      } else if (searchText === '') {
        setUserProfileInfo(list);
      }
    }

    function onError(error) {
      console.error(`유저 정보 가져오기 실패 - ${error}`);
    }
    return getCollection('Users', onResult, onError, null, {
      exists: true,
      condition: ['createdAt', 'asc'],
    });
  }, [searchText]);
  return (
    <SafeAreaView style={styles.block}>
      <View style={styles.searchIconFrame}>
        <Image
          source={require('../assets/imgs/readingGlasses.png')}
          style={styles.searchIcon}
        />
      </View>
      <TouchableWithoutFeedback onPress={searchUser}>
        <View style={styles.inputFrame}>
          <TextInput
            placeholder=""
            selectionColor={'#c7c7c7'}
            style={styles.input}
            fontSize={20}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </TouchableWithoutFeedback>
      <FlatList
        data={userProfileInfo}
        style={styles.userInfoText}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: '90%',
              height: 1,
              backgroundColor: '#c7c7c7',
              marginTop: 20,
            }}
          />
        )}
        renderItem={({item}) => (
          <UserProfile {...item} navigation={navigation} />
        )}
      />
      {/* 유저등록버튼 */}
      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
        <AntIcon name="pluscircle" size={25} style={styles.userRegisterIcon} />
      </TouchableOpacity>
      {/* 유저 등록 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalCenter}>
          <View style={styles.registerInputFrame}>
            <Text style={styles.userPrivateInfo}>
             이름&nbsp;&nbsp;&nbsp;&nbsp;
            </Text>
            <TextInput
              style={styles.registerInput}
              placeholder="이름을 입력해주세요"
              selectionColor={'#c7c7c7'}
              fontSize={15}
              borderRadius={5}
              value={userName}
              onChangeText={setUserName}
            />
          </View>

          <View style={styles.registerInputFrame}>
            <Text style={styles.userPrivateInfo}>이메일</Text>
            <TextInput
              style={styles.registerInput}
              placeholder="이메일을 입력해주세요"
              selectionColor={'#c7c7c7'}
              fontSize={15}
              borderRadius={5}
              value={userEmail}
              onChangeText={setUserEmail}
            />
          </View>

          <View style={styles.registerInputFrame}>
            <Text style={styles.userPrivateInfo}>거주지</Text>
            <TextInput
              style={styles.registerInput}
              placeholder="거주지를 입력해주세요"
              selectionColor={'#c7c7c7'}
              fontSize={15}
              borderRadius={5}
              value={userAddress}
              onChangeText={setUserAddress}
            />
          </View>

          <View style={styles.registerInputFrame}>
            <Text style={styles.userPrivateInfo}>관심사</Text>
            <TextInput
              style={styles.registerInput}
              placeholder="관심사를 입력해주세요"
              selectionColor={'#c7c7c7'}
              fontSize={15}
              borderRadius={5}
              value={userInterest}
              onChangeText={setUserInterest}
            />
          </View>
        </View>
        <View style={styles.modalBtn}>
          <TouchableOpacity
            style={styles.modalBtnCancel}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.modalText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={registerUser}
            style={styles.modalBtnRegist}>
            <Text style={styles.modalText}>등록</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchIconFrame: {
    width: 50,
    height: 50,
    backgroundColor: '#c7c7c7',
    position: 'absolute',
    top: 50,
    left: 20,
  },
  searchIcon: {
    width: 30,
    height: 30,
    top: 10,
    left: 10,
    position: 'absolute',
    zIndex: 10,
  },
  inputFrame: {
    alignItems: 'center',
  },
  input: {
    marginTop: 50,
    paddingLeft: 60,
    fontSize: 20,
    color: '#333',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'darkgrey',
    width: '90%',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 20,
  },
  userInfoText: {
    flexDirection: 'column',
    marginLeft: 20,
  },
  userProfileIcon: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  rightArrowIcon: {
    marginLeft: 65,
  },
  userRegisterIcon: {
    marginBottom: 20,
    marginLeft: 360,
  },
  modalCenter: {
    width: '80%',
    height: 300,
    backgroundColor: '#f5f2f2',
    position: 'absolute',
    top: 200,
    left: 50,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  registerInputFrame: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'center',
    zIndex: 10,
    marginBottom: 5,
    marginLeft: 20,
  },

  registerInput: {
    width: '70%',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#c8c8c8',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginLeft: 20,
  },
  userPrivateInfo: {
    fontSize: 18,
  },
  modalBtn: {
    position: 'absolute',
    top: 450,
    right: 90,
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-around',
    gap: 30,
  },
  modalBtnCancel: {
    width: 100,
    height: 35,
    backgroundColor: '#735755',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  modalBtnRegist: {
    width: 100,
    height: 35,
    backgroundColor: '#4669e8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  modalText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
