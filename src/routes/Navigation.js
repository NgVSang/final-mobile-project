import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationService from '../services/NavigationService';
import React, {useEffect} from 'react'
import MainScreen from '../screens/main_screen';
import UserBottom from './UserBottom';
import AuthScreen from '../screens/Auth/auth_screen';
import {useDispatch, useSelector} from 'react-redux';


const Stack = createNativeStackNavigator()
const Navigation = () => {
  const {token} = useSelector(state => state.auth)
  
  return (
    <NavigationContainer ref={ref => NavigationService.setTopLevelNavigator(ref)}>
      <Stack.Navigator 
        initialRouteName={
          (token && token != "") ? "/user" : "/auth"  
        }
      >   
        <Stack.Screen 
          name="/user" 
          component={UserBottom} 
          options={{ 
            headerShown: false 
          }}
        />
        <Stack.Screen 
          name="/auth" 
          component={AuthScreen} 
          options={{ 
            headerShown: false 
          }}
        />
        <Stack.Screen 
          name="/" 
          component={MainScreen} 
          options={{ 
            headerShown: false 
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})