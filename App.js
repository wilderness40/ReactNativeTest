import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {addData, getCollection, getCurrentTime} from './apis/firebase';

import HomeScreen from './screens/HomeScreen';
import UserInfoScreen from './screens/UserInfoScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{headerShown: false}}>
          {props => <HomeScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="UserInfo" options={{headerShown: false}}>
          {props => <UserInfoScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
