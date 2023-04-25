import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'

const ClassListScreen = ({navigation,route}) => {
  return (
    <View style={{flex:1}}>
      <Header 
        onGoBack={()=>navigation.goBack()} 
        title='Danh sách lớp học'
      />
      <ScrollView style={styles.scrollView}>

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