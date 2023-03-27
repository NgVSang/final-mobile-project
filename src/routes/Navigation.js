import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationService from '../services/NavigationService';
import React, {useEffect} from 'react'
import UserBottom from './UserBottom';
import AuthScreen from '../screens/Auth/auth_screen';
import {useDispatch, useSelector} from 'react-redux';
import SalaryScreen from '../screens/UserScreen/Salary/salary_screen';
import ReportScreen from '../screens/UserScreen/Report/report_screen';


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
          name="/salary" 
          component={SalaryScreen} 
          options={{ 
            headerShown: false 
          }}
        />
        <Stack.Screen 
          name="/report" 
          component={ReportScreen} 
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