import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'

const CreateClassScreen = ({navigation,route}) => {
  return (
    <View style={{flex:1}}>
        <Header 
            onGoBack={()=>navigation.goBack()} 
            title='Thêm lớp mới'
        />
        <ScrollView style={styles.scrollView}>

        </ScrollView>
        <Footer 
            buttonOkContent={"Thêm"}
            onClickButtonOk={()=>{
            
            }}
            haveButtonCancel={true}
            onClickButtonCancle={()=>{
                navigation.goBack()
            }}
        />
    </View>
  )
}

export default CreateClassScreen

const styles = StyleSheet.create({
    scrollView:{
        flex:1,
        paddingHorizontal:15,
        backgroundColor:'#eef2ff',
        paddingBottom:20
      }
})