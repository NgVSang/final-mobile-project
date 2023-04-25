import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import teacherService from '../../../services/api/teacher/TeacherService'
import {useSelector} from 'react-redux'
import WTeacher from '../../../components/WTeacher'

const TeacherListScreen = ({navigation,route}) => {
  const [data,setData] = React.useState()
  const {token} = useSelector(state => state.auth)
  
  React.useEffect(()=>{
    async function fetchData() {
      if (token){
        await teacherService.get_teachers()
        .then((res)=>{
          setData(res.data)
          console.log(res.data);
        })
        .catch((error)=>{
          alert("Some error")
          console.log(error);
        })
      }
    }
    fetchData()
    return ()=>{}
  },[token])

  return (
    <View style={{flex:1}}>
      <Header 
          onGoBack={()=>navigation.goBack()} 
          title='Danh sách giáo viên'
      />
      <ScrollView style={styles.scrollView}>
        {
          data?.map((teacher)=>(
            <WTeacher 
              teacher={teacher}
              key={teacher.id}
            />
          ))
        }
      </ScrollView>
      <Footer 
        buttonOkContent={"Thêm giáo viên"}
        onClickButtonOk={()=>{
          navigation.push('/admin/teacher/create')
        }}
      />
    </View>
  )
}

export default TeacherListScreen

const styles = StyleSheet.create({
  scrollView:{
    flex:1,
    paddingHorizontal:15,
    backgroundColor:'#eef2ff',
    paddingBottom:20
  }
})