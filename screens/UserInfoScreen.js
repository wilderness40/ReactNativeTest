import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';

function UserInfoScreen({navigation, route}) {
  console.log(route.params)
  return (
    <View style={styles.block}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <AntIcon name="left" size={25} style={styles.leftArrowIcon} />
      </TouchableOpacity>
      <Image
        source={require('../assets/imgs/user.png')}
        style={styles.userProfile}
      />
      <View style={styles.userInfoTextFrame}>
        <Text style={styles.userInfoText}>이름</Text>
        <View style={styles.userInfoTextDetail}>
        <Text style={styles.userInfoText}>{route.params.name}</Text>
        </View>
      </View>
      <View style={styles.userInfoTextFrame}>
        <Text style={styles.userInfoText}>이메일</Text>
        <Text style={styles.userInfoText}>{route.params.email}</Text>
      </View>
      <View style={styles.userInfoTextFrame}>
        <Text style={styles.userInfoText}>거주지</Text>
        <Text style={styles.userInfoText}>{route.params.address}</Text>
      </View>
      <View style={styles.userInfoTextFrame}>
        <Text style={styles.userInfoText}>관심사</Text>
        <Text style={styles.userInfoText}>{route.params.interest}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  userProfile: {
    width: 200,
    height: 200,
    borderRadius: 50,
    marginTop: 80,
    marginBottom: 50,
  },
  leftArrowIcon: {
    position: 'absolute',
    right: 160,
    top: 20,
  },
  userInfoTextFrame: {
    width: 300,
    flexDirection: 'row',
    gap:40
  },
  userInfoText:{
    fontWeight:'bold',
    fontSize: 20,
    textAlign : 'left',
    marginBottom: 5
  },
  userInfoTextDetail:{
    fontWeight:'bold',
    fontSize: 20,
    textAlign : 'left',
    marginLeft: 18
  }
});

export default UserInfoScreen;
