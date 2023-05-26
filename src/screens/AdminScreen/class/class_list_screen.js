import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import classroomService from '../../../services/api/classroom/ClassService'
import {useSelector} from 'react-redux'
import Loading from '../../../components/Loading'
import WClass from '../../../components/WClass'

const ClassListScreen = ({navigation,route}) => {
  const {token} = useSelector(state => state.auth)
  const [data,setData] = React.useState()
  const [isLoading,setIsLoading] = React.useState(true)
  React.useEffect(()=>{
    setIsLoading(true)
    async function fetchData() {
      if (token){
        await classroomService.admin_get_classrooms()
        .then((res)=>{
          setData(res.data)
          setIsLoading(false)
          console.log(res.data);
        })
        .catch((error)=>{
          alert("Some error")
          console.log(error);
          setIsLoading(false)
        })
      }
    }
    fetchData()
  },[token])

  return (
    <View style={{flex:1}}>
      <Header 
        onGoBack={()=>navigation.goBack()} 
        title='Danh sách lớp học'
      />
      <ScrollView style={styles.scrollView}>
      {
        isLoading ? (
          <Loading />
        ):(
          <>
            {
              data?.map((classInfo, index) => (
                <WClass 
                  classInfo={classInfo}
                  key={classInfo.id}
                />
              ))
            }
          </>
        )
      }
      </ScrollView>
      <Footer 
        buttonOkContent={"Thêm lớp"}
        onClickButtonOk={()=>{
          navigation.push('/admin/class/create')
        }}
      />
    </View>
  )
}

export default ClassListScreen

const styles = StyleSheet.create({
  scrollView:{
    flex:1,
    paddingHorizontal:15,
    backgroundColor:'#eef2ff',
    paddingBottom:20
  }
})