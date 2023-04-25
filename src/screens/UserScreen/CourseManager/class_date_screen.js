import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'
import Header from '../../../components/layout/Header'
import dayjs from 'dayjs'
import {formatDate} from '../../../services/utils'
import WClass from '../../../components/WClass'
import classroomService from '../../../services/api/classroom/ClassService'
import {useSelector} from 'react-redux'
import Loading from '../../../components/Loading'

const ClassInDate = ({navigation,route}) => {
    const {day} = route.params
    const {token} = useSelector(state => state.auth)
    const [data,setData] = React.useState()
    const [isLoading,setIsLoading] = React.useState(false)

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

    const getListClass = (data) => {
        let listClass = []
        const date = new Date(day.dateString);
        for (let j = 0 ; j < data.length ; j++){
            for (let k = 0; k < data[j].study_sessions.length; k ++ ){
                const study_session = {
                    name:data[j].name,
                    ...data[j].study_sessions[k],
                }
                if (date.getDay() == convertDayString(study_session.day_of_week)) {
                    listClass.push(study_session)
                }
                
            }
        }
        listClass.sort(function(a, b) {
            return a.start_time.localeCompare(b.start_time);
        });
        setData(listClass)
    }

    React.useEffect(()=>{
        if (token){
            setIsLoading(true)
            classroomService.get_classrooms()
            .then((res)=>{
                getListClass(res.data.classrooms)
                setIsLoading(false)
            })
            .catch((error)=>{
                setIsLoading(false)
                alert("Some error")
            })
        }
    },[token])
    
    return (
        <View style={{flex:1}}>
            <Header 
                onGoBack={()=>navigation.goBack()} 
                title='Lịch dạy học hôm nay'
            />
            <ScrollView style={{flex:1 ,backgroundColor:'#F7FAFF'}}>
                <View style={styles.content}>
                    <Text style={styles.content_title}>
                        {
                            dayjs(day.dateString).day() == 0 ?
                            'Chủ nhật' : 'Thứ ' + (dayjs(day.dateString).day() + 1)
                        } 
                        , ngày {formatDate(day.dateString)}
                    </Text>
                    {
                        isLoading ? (
                            <Loading />
                        ):(
                            <View>
                                {
                                    data?.map((classInfo)=>(
                                        <View key={classInfo.id} style={styles.box}>
                                            <Image 
                                                source={require('../../../assets/icons/class_icon.png')}
                                                style={{
                                                    width:55,
                                                    height:55,
                                                    borderRadius:4,
                                                    marginRight:10
                                                }}
                                            />
                                            <View style={{
                                                flexDirection:'column'
                                            }}>
                                                <Text style={styles.box_title}>Môn {classInfo.name}</Text>
                                                <Text style={styles.box_id}>Mã lớp {classInfo.id}</Text>
                                                <Text style={styles.box_time}>{classInfo.start_time} - {classInfo.end_time}</Text>
                                            </View>
                                        </View>
                                    ))
                                }
                            </View>
                        )
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default ClassInDate

const styles = StyleSheet.create({
    content:{
        paddingHorizontal:15,
        paddingTop:25
    },
    content_title:{
        fontSize:16,
        lineHeight:20,
        fontWeight:'700',
        color:'#394B6A',
        textTransform:'uppercase',
        marginBottom:15
    },
    box: {
        borderRadius:6,
        paddingHorizontal:15,
        paddingVertical:10,
        marginBottom:20,
        backgroundColor:'#FFF',
        display:'flex',
        flexDirection:'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 7,
    },
    box_title:{
        flex:1,
        fontSize:16,
        lineHeight:20,
        fontWeight:'600',
    },
    box_id:{
        flex:1,
        fontSize:14,
        lineHeight:18,
        fontWeight:'400',
    },
    box_time:{
        flex:1,
        fontSize:12,
        lineHeight:18,
        fontWeight:'400',
    }
})