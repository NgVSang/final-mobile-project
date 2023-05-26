import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import {Field, Formik} from 'formik'
import {authValidator} from '../../../validations'
import WToast from '../../../components/WToast'
import {useToast} from 'react-native-toast-notifications'
import { CommonActions } from '@react-navigation/native';
import WFormInput from '../../../components/WFormInput'
import {Button} from 'react-native-paper'
import {useSelector} from 'react-redux'
import teacherService from '../../../services/api/teacher/TeacherService'
import WSelectInput from '../../../components/WSelectInput'
import classroomService from '../../../services/api/classroom/ClassService'

const CreateClassScreen = ({navigation,route}) => {
  const {token} = useSelector(state => state.auth)
  const [loading,setLoading] = React.useState(false)
  const toast = useToast();
  const [listTeacher,setListTeacher] = React.useState()
  const [selectTeacher, setSelectTeacher] = React.useState()
  const [items, setItems] = React.useState([]);

  React.useEffect(()=>{
    async function fetchData() {
      if (token){
        await teacherService.get_teachers()
        .then((res)=>{
          setListTeacher(res.data)
          console.log(res.data);
        })
        .catch((error)=>{
          alert("Some error")
          console.log(error);
        })
      }
    }
    fetchData()
  },[])

  const handleCreateClass = async data => {
    setLoading(true)
    // console.log(data);
    if (selectTeacher){
      const study_sessions = []
      if (data.study_session1 != ""){
        var parts = data.study_session1.split(", ");
        const session = {
          day_of_week: parts[0],
          start_time: parts[1],
          end_time: parts[2],
        }
        study_sessions.push(session)
      }
      if (data.study_session2 != ""){
        var parts = data.study_session1.split(", ");
        const session = {
          day_of_week: parts[0],
          start_time: parts[1],
          end_time: parts[2],
        }
        study_sessions.push(session)
      }
      if (data.study_session3 != ""){
        var parts = data.study_session1.split(", ");
        const session = {
          day_of_week: parts[0],
          start_time: parts[1],
          end_time: parts[2],
        }
        study_sessions.push(session)
      }
      const dataSent = {
        subject: data.name,
        description: data.description,
        teacher_id: selectTeacher,
        classroom_size: parseInt(data.number_of_student),
        study_sessions: study_sessions
      }
      console.log(dataSent);
      await classroomService.create_classrooms(dataSent)
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
                name: '/admin/class',
              },
            ],
          })
        )
      })
      .catch((error)=>{
        console.log("error:",error);
        setLoading(false)
        alert(error ? error[0].message : "Tạo thất bại")
      })
    }else {
      alert("Vui lòng chọn giáo viên đứng lớp!")
    }
  }
  return (
    <View style={{flex:1}}>
        <Header 
            onGoBack={()=>navigation.goBack()} 
            title='Thêm lớp mới'
        />
        <ScrollView style={styles.scrollView}>
        <Formik
          initialValues={{ 
            name: '', 
            description:'',
            number_of_student:0,
            study_session1:"",
            study_session2:"",
            study_session3:"",
          }}
          validationSchema={authValidator.CreateClassSchema}
          onSubmit={handleCreateClass}
        >
          {({ handleSubmit }) => (
              <View style={styles.form_group}>
                <View style={styles.form_input}>
                  <Field 
                    name="name"  
                    title="Tên môn học"
                    component={WFormInput} 
                    placeholder={('Nhập')} 
                  />
                </View>
                <View style={styles.form_input}>
                  <Field 
                    name="number_of_student"  
                    title="Số lượng học sinh"
                    keyboardType="numeric" 
                    component={WFormInput} 
                    placeholder={('Nhập')} 
                  />
                </View>
                <View style={styles.form_input}>
                  {/* <Field 
                    name="teacher"  
                    title="Giáo viên đứng lớp"
                    component={WFormInput} 
                    placeholder={('Nhập')} 
                  /> */}
                  <WSelectInput 
                    dataSelect={listTeacher}
                    label='Giáo viên đứng lớp'
                    // defaultValueByIndex={0}
                    select_style={styles.input_style}
                    onSelect={(value)=>{
                      setSelectTeacher(value);
                    }}
                  />
                </View>
                <View style={styles.form_input}>
                  <Field
                    name="description"
                    title="Mô tả lớp"
                    component={WFormInput}
                    placeholder={('Nhập')}
                    // type="password"
                  />
                </View>
                <View style={styles.form_input}>
                  <Field
                    name="study_session1"
                    type="text"
                    title="Ngày dạy 1, ví dụ (Monday, 07:00, 09:00)"
                    component={WFormInput}
                    placeholder={('Nhập')}
                  />
                </View>
                <View style={styles.form_input}>
                  <Field
                    name="study_session2"
                    type="text"
                    title="Ngày dạy 2"
                    component={WFormInput}
                    placeholder={('Nhập')}
                  />
                </View>
                <View style={styles.form_input}>
                  <Field
                    name="study_session3"
                    type="text"
                    title="Ngày dạy 3"
                    component={WFormInput}
                    placeholder={('Nhập')}
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

export default CreateClassScreen

const styles = StyleSheet.create({
  scrollView:{
    flex:1,
    paddingTop:10,
    paddingHorizontal:15,
    backgroundColor:'#eef2ff',
    // paddingBottom:50
  },
  form_group:{
    width:'100%',
    paddingHorizontal:30,
    paddingBottom:40,
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