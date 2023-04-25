import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationService from '../services/NavigationService';
import React, {useEffect} from 'react'
import UserBottom from './UserBottom';
import AuthScreen from '../screens/Auth/auth_screen';
import {useDispatch, useSelector} from 'react-redux';
import SalaryScreen from '../screens/UserScreen/Salary/salary_screen';
import ClassInDate from '../screens/UserScreen/CourseManager/class_date_screen';
import AdminBottom from './AdminBottom';
import ClassroomsScreen from '../screens/UserScreen/Classrooms/classrooms_screen';
import {setHeaderConfigAxios} from '../services/https/apiConfig';
import ClassListScreen from '../screens/AdminScreen/class/class_list_screen';
import TeacherListScreen from '../screens/AdminScreen/Teacher/teacher_list_screen';
import CreateClassScreen from '../screens/AdminScreen/class/create_class_screen';
import CreateTeacerScreen from '../screens/AdminScreen/Teacher/create_teacher_screen';


const Stack = createNativeStackNavigator()
const Navigation = () => {
  const {token, user} = useSelector(state => state.auth)

  useEffect(()=>{
    if (token){
      setHeaderConfigAxios(token);
    }else{
      setHeaderConfigAxios();
    }
  },[token])
  
  return (
    <NavigationContainer ref={ref => NavigationService.setTopLevelNavigator(ref)}>
      <Stack.Navigator 
        initialRouteName={
          (token && token != "") ? user.role == "Teacher" ? "/user" : "/admin" : "/auth"  
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
          name="/admin" 
          component={AdminBottom} 
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
          name="/user/class/date" 
          component={ClassInDate} 
          options={{ 
            headerShown: false 
          }}
        />
        <Stack.Screen 
          name="/user/class" 
          component={ClassroomsScreen} 
          options={{ 
            headerShown: false 
          }}
        />
        <Stack.Screen 
          name="/admin/class" 
          component={ClassListScreen} 
          options={{ 
            headerShown: false 
          }}
        />
        <Stack.Screen 
          name="/admin/class/create" 
          component={CreateClassScreen} 
          options={{ 
            headerShown: false 
          }}
        />
        <Stack.Screen 
          name="/admin/teacher" 
          component={TeacherListScreen} 
          options={{ 
            headerShown: false 
          }}
        />
        <Stack.Screen 
          name="/admin/teacher/create" 
          component={CreateTeacerScreen} 
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