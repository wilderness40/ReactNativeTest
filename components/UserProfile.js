import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';


function Userprofile({name, email, id, interest, address, navigation}) {

  return (
    <>
      <View style={styles.userInfo} key={id}>
        <Image
          source={require('../assets/imgs/user.png')}
          style={styles.userProfileIcon}
        />
        <View style={styles.userInfoTextContainer}>
          <View style={styles.userInfoText}>
            <Text >{name}</Text>
            <Text>{email}</Text>
          </View>
          <TouchableOpacity 
          onPress={() => 
            { 
                console.log('여기')
            navigation.navigate('UserInfo',  {name, email, interest ,address}) }
        }
            style={styles.rightArrowIcon}
        >
            <AntIcon name="right" size={25}  />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 20,
  },
  userInfoText: {
    flexDirection: 'column',
    marginLeft: 20,
    width: 100,
  },
  userProfileIcon: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  userInfoTextContainer:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightArrowIcon: {
    width: 50,
    height: 50,
    // backgroundColor: '#c7c7c7',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 120,
  },
});
export default Userprofile;
