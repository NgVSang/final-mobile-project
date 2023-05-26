import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, {useMemo} from 'react'
import {useSelector} from 'react-redux'
import Loading from '../../../components/Loading'
import CalenderFullSize from '../../../components/CalenderFullSize'
import {BASE_URL} from '../../../config'
import classroomService from '../../../services/api/classroom/ClassService'
import dayjs from 'dayjs'

const HomeScreen = ({navigation}) => {
    const {user,token} = useSelector(state => state.auth)
    const [isLoading,setIsLoading] = React.useState(false)
    const [listDate,setListDate] = React.useState([
        
    ])
    const convertDayString = (dayString) =>{
        switch (dayString) {
            case "Monday":
                return 1
            case "Tuesday":
                return 2
            case "Wednesday":
                return 3
            case "Thursday":
                return 4
            case "Friday":
                return 5
            case "Saturday":
                return 6
            case "Sunday":
                return 0
            default:
                return 0;
        }
    }

    const getListDate = (data) => {
        const listDate = []
        const date = new Date();
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        for (let i = date.getDate() ; i <= lastDay; i++){
            date.setDate(i);
            for (let j = 0 ; j < data.length ; j++){
                for (let k = 0; k < data[j].study_sessions.length; k ++ ){
                    const study_session = data[j].study_sessions[k]
                    if (date.getDay() == convertDayString(study_session.day_of_week)) {
                        const day = dayjs(date).format("YYYY-MM-DD")
                        if (!listDate.includes(day)) {
                            listDate.push(day);
                        }
                    }
                  
                }
            }
        }
        setListDate(listDate)
    }

    React.useEffect(()=>{
        if (token){
            setIsLoading(true)
            classroomService.get_classrooms()
            .then((res)=>{
                getListDate(res.data.classrooms)
                setIsLoading(false)
            })
            .catch((error)=>{
                setIsLoading(false)
                alert("Some error")
            })
        }
    },[token])

    return (
        <View style={{flex:1 ,backgroundColor:'#eef2ff'}}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.header_left} onPress={()=>{
                    // navigation.push('ProfileUser')
                }}>
                    <Image 
                        source={{uri:(user.avatar)}}
                        style={{
                            width:40,
                            height:40,
                            resizeMode:'cover',
                            borderRadius:6,
                            marginRight:10,
                        }}
                    />
                    <View>
                        <Text style={styles.header_left_hi}>XIN CHÀO!</Text>
                        <Text  style={styles.header_left_name}>{user.name}</Text>
                    </View>
                </TouchableOpacity>
                {/* Thông tin tích điểm */}
                {/* <View style={styles.header_right}>
                    <Image 
                        source={require('../../assets/icons/StarIcon.png')}
                        style={{
                            width:16.78,
                            height:16,
                            marginRight:4
                        }}
                    />
                    <Text style={styles.header_right_point}>{77} điểm</Text>
                </View> */}
            </View>
            <ScrollView style={styles.scroll_view}>
                {
                    isLoading ? 
                    (
                        <Loading />
                    ):(
                        <CalenderFullSize style={styles.calender_style} listDate={listDate}/>
                    )
                }
                <View style={styles.manager}>
                    <TouchableOpacity style={styles.manager_box} onPress={()=>{
                        navigation.push("/user/class")
                    }
                    }>
                        <View style={styles.manager_box_icon}>
                            <Image 
                                source={require('../../../assets/icons/class_icon.png')}
                                style={{
                                    width:26.21,
                                    height:32,
                                    resizeMode:'contain'
                                }}
                            />
                        </View>
                        <Text style={styles.manager_content}>Danh sách lớp</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.manager_box} onPress={()=>{
                        // navigation.push("Car/List")
                    }}>
                        <View style={styles.manager_box_icon}>
                            <Image 
                                source={require('../../../assets/icons/report_icon.png')}
                                style={{
                                    width:32,
                                    height:32,
                                    resizeMode:'contain'
                                }}
                            />
                        </View>
                        <Text style={styles.manager_content}>Báo cáo</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.manager_box} onPress={()=>{
                        navigation.push("/salary")
                    }}>
                        <View style={styles.manager_box_icon}>
                            <Image 
                                source={require('../../../assets/icons/salary_icon.png')}
                                style={{
                                    width:31.57,
                                    height:32,
                                    resizeMode:'contain'
                                }}
                            />
                        </View>
                        <Text style={styles.manager_content}>Bảng lương</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.manager_box}>
                        <View style={styles.manager_box_icon}>
                            <Image 
                                source={require('../../assets/icons/PointInformationIcon.png')}
                                style={{
                                    width:24.53,
                                    height:32,
                                    resizeMode:'contain'
                                }}
                            />
                        </View>
                        <Text style={styles.manager_content}>Thông tin tích điểm</Text>
                    </TouchableOpacity> */}
                    {/* <TouchableOpacity style={styles.manager_box} onPress={()=>navigation.push("Infringes/Search")}>
                        <View style={styles.manager_box_icon}>
                            <Image 
                                source={require('../../assets/icons/SearchErrorIcon.png')}
                                style={{
                                    width:32,
                                    height:32,
                                    resizeMode:'contain'
                                }}
                            />
                        </View>
                        <Text style={styles.manager_content}>Tra cứu lỗi vi phạm</Text>
                    </TouchableOpacity> */}
                    {/* <TouchableOpacity style={styles.manager_box} onPress={()=>navigation.push("Profile")}>
                        <View style={styles.manager_box_icon}>
                            <Image 
                                source={require('../../assets/icons/AccountInformationIcon.png')}
                                style={{
                                    width:32,
                                    height:32,
                                    resizeMode:'contain'
                                }}
                            />
                        </View>
                        <Text style={styles.manager_content}>Thông tin tài khoản</Text>
                    </TouchableOpacity> */}
                </View>
            </ScrollView>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        paddingHorizontal:15,
        marginTop:50,
        paddingBottom:15,
        alignItems:'center'
    },
    header_left:{
        flexDirection:'row'
    },
    header_left_hi:{
        fontSize:11,
        lineHeight:16,
        color:'#394B6A',
        fontWeight:'400',
    },
    header_left_name:{
        fontSize:17,
        fontWeight:'500',
        lineHeight:24,
        color:'#2E333D',
    },
    header_right:{
        flexDirection:'row'
    },
    header_right_point:{
        fontSize:13,
        fontWeight:'500',
        lineHeight:18,
        color:'#394B6A',
    },
    scroll_view:{
        width:'100%',
        flex:1,
        paddingHorizontal:15,
        backgroundColor:'#eef2ff',
        paddingBottom:20
    },
    calender_style:{
        marginTop:10,
        marginBottom:30
    },
    manager:{
        flexDirection:'row',
        flexWrap:'wrap',
        columnGap:10,
        rowGap:8,
    },
    manager_box:{
        width:'31%',
        paddingHorizontal:15,
        paddingVertical:10,
        flexDirection:'column',
        borderRadius:6,
        shadowColor: '#0000000D',
        shadowOffset: {width: 2, height: 8},
        shadowOpacity: 0,
        shadowRadius: 0,
        backgroundColor:'#FFFFFF',
        marginBottom:15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    manager_box_icon:{
        width:'auto',
        height:30,
        marginBottom:8
    },
    icon_style:{
        flex:1,
        width:null,
        height:null,
        resizeMode:'contain',
    },
    manager_content:{
        fontSize:12,
        lineHeight:16,
        fontWeight:'400',
        color:'#394B6A'
    }
})