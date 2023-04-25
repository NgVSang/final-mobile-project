import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Footer from '../../../components/layout/Footer'
import Header from '../../../components/layout/Header'
import {Field, Formik} from 'formik'
import WFormInput from '../../../components/WFormInput'
import {Button} from 'react-native-paper'
import {authValidator} from '../../../validations'
import WToast from '../../../components/WToast'
import {useToast} from 'react-native-toast-notifications'
import teacherService from '../../../services/api/teacher/TeacherService'
import { CommonActions } from '@react-navigation/native';

const CreateTeacerScreen = ({navigation,route}) => {
  const [loading,setLoading] = React.useState(false)
  const toast = useToast();

  const handleCreateTeacher = async data => {
    setLoading(true)
    const dataSent = {
      name: data.name,
      username: data.username,
      phone_number: data.phone_number,
      password: data.password,
    }
    await teacherService.create_teacher(dataSent)
    .then((res)=>{
      setLoading(false)
      toast.hideAll();
      toast.show(
          <WToast 
            content={"Tạo thành công"} 
            showTouch={false}
            iconStyle={{
              width:24,
              height:24,
              marginRight:15,
              marginTop:5
            }}
            icon={require('../../../assets/icons/success_icon.png')}
          />
          ,{
          type:'custom_type'
      });
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: '/admin' },
            {
              name: '/admin/teacher',
            },
          ],
        })
      )
    })
    .catch((error)=>{
      console.log(error);
      setLoading(false)
      alert("Tạo thất bại!")
    })
  }

  return (
    <View style={{flex:1}}>
        <Header 
            onGoBack={()=>navigation.goBack()} 
            title='Thêm mới giáo viên'
        />
        <ScrollView style={styles.scrollView}>
        <Formik
            initialValues={{ 
              phone_number: '', 
              password: '' ,
              name:'',
              username:'',
              re_password:''
            }}
            validationSchema={authValidator.SignUpSchema}
            onSubmit={handleCreateTeacher}
          >
            {({ handleSubmit }) => (
                <View style={styles.form_group}>
                  <View style={styles.form_input}>
                    <Field 
                      name="name"  
                      title="Họ và tên"
                      component={WFormInput} 
                      placeholder={('Nhập')} 
                    />
                  </View>
                  <View style={styles.form_input}>
                    <Field 
                      name="phone_number"  
                      title="Điện thoại"
                      keyboardType="phone-pad" 
                      component={WFormInput} 
                      placeholder={('Nhập')} 
                    />
                  </View>
                  <View style={styles.form_input}>
                    <Field 
                      name="username"  
                      title="Username"
                      component={WFormInput} 
                      placeholder={('Nhập')} 
                    />
                  </View>
                  <View style={styles.form_input}>
                    <Field
                      name="password"
                      title="Mật khẩu"
                      component={WFormInput}
                      placeholder={('Nhập')}
                      type="password"
                    />
                  </View>
                  <View style={styles.form_input}>
                    <Field
                      name="re_password"
                      title="Xác nhận mật khẩu"
                      component={WFormInput}
                      placeholder={('Nhập')}
                      type="password"
                    />
                  </View>
                  <TouchableOpacity 
                    onPress={handleSubmit}
                    disabled={loading}
                  >
                    <Button
                      mode="contained"
                      button
                      disabled={loading}
                      loading={loading}
                      style={[styles.btn_login,{
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 10,
                        elevation: 5,
                      }]}
                    >
                      <Text style={[styles.btn_style,{color:'#FFFFFF'}]}>Tạo mới</Text>
                    </Button>
                  </TouchableOpacity>
                </View>
            )}
        </Formik>
        </ScrollView>
        {/* <Footer 
            buttonOkContent={"Thêm"}
            onClickButtonOk={()=>{
            
            }}
            haveButtonCancel={true}
            onClickButtonCancle={()=>{
                navigation.goBack()
            }}
        /> */}
    </View>
  )
}

export default CreateTeacerScreen

const styles = StyleSheet.create({
  scrollView:{
    flex:1,
    paddingTop:10,
    paddingHorizontal:15,
    backgroundColor:'#eef2ff',
    paddingBottom:20
  },
  form_group:{
    width:'100%',
    paddingHorizontal:50
  },  
  form_input:{
      marginBottom:24
  },
  btn_style:{
    fontWeight:'700',
    fontSize:13,
    lineHeight:22
  },
  btn_login:{
    width:'100%',
    height:40,
    borderRadius:24,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#0F6AA9',
  },
})