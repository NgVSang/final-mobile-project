import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, {useCallback, useMemo, useState} from 'react'
import Header from '../../../components/layout/Header'
import dayjs from 'dayjs'
import {convertPrice} from '../../../services/utils'
import WSelectInput from '../../../components/WSelectInput'
import {useSelector} from 'react-redux'
import classroomService from '../../../services/api/classroom/ClassService'
import WClass from '../../../components/WClass'
import Loading from '../../../components/Loading'

const SalaryScreen = ({navigation}) => {
    const now = new Date()
    const {user,token} = useSelector(state => state.auth)
    const [isLoading,setIsLoading] = React.useState(true)
    const [data, setData] = useState();

    React.useEffect(()=>{
        if (token){
            setIsLoading(true)
            classroomService.get_classrooms()
            .then((res)=>{
                setData(res.data)
                console.log(res.data);
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
            <Header onGoBack={()=>navigation.goBack()} title='Bảng lương'/>
            <ScrollView style={styles.scroll_view}>
                {
                    isLoading ? (
                        <Loading />
                    ):(
                        <>
                            {
                                data?.classrooms?.map((classInfo, index) => (
                                    <WClass 
                                        classInfo={classInfo}
                                        key={classInfo.id}
                                    />
                                ))
                            }
                            {
                                data? (
                                    <>
                                        <View style={styles.group_content}>
                                            <Text style={styles.group_title}>Số lớp dạy: </Text>
                                            <Text style={styles.group_main}>{data?.classrooms ? data?.classrooms.length: 0} lớp</Text>
                                        </View>
                                        <View style={styles.group_content}>
                                            <Text style={styles.group_title}>Số học sinh phải dạy: </Text>
                                            <Text style={styles.group_main}>{
                                                data?.classrooms?.reduce(function (accumulator, currentValue) {
                                                return accumulator + currentValue.classroom_size;
                                                }, 0)
                                            } học sinh</Text>
                                        </View>
                                        <View style={styles.group_content}>
                                            <Text style={styles.group_title}>Tiền: </Text>
                                            <Text style={styles.group_main}>500.000đ / 1 học sinh</Text>
                                        </View>
                                        <View style={styles.group_content}>
                                            <Text style={styles.group_title}>Tổng tiền ước tính: </Text>
                                            <Text style={styles.group_main}>{convertPrice(data.salary)}đ</Text>
                                        </View>
                                        <View 
                                            style={{
                                                marginBottom:30
                                            }}
                                        />
                                    </>
                                ):(<></>)
                            }
                        </>
                    )
                }
            </ScrollView>
        </View>
    )
}

export default SalaryScreen

const styles = StyleSheet.create({
    scroll_view:{
        backgroundColor:'#F7FAFF',
        flex:1,
        paddingHorizontal:15,
        paddingBottom: 30,
    },
    group_content:{
        marginTop: 10,
        display:'flex',
        flexDirection: 'row',
        alignItems:'flex-end'
    },
    group_title:{
        fontSize:13,
        lineHeight:24,
        color:'#394B6A',
        fontWeight:'400',
    },
    group_main:{
        fontSize:17,
        fontWeight:'500',
        lineHeight:24,
        color:'#2E333D',
    }
})