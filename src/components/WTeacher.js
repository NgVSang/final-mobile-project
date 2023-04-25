import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const WTeacher = ({
    teacher
}) => {
  return (
    <TouchableOpacity style={styles.component}>
        <View style={styles.image_wrapper}>
            <Image 
                source={{uri:teacher?.avatar}}    
                style ={{
                    width: 50,
                    height:50,
                    borderRadius:6
                }}     
            />
        </View>
        <View style={{display:'flex',flex:1}}>
            <View style={styles.header}>
                <View style={styles.header_subject}>
                    <Text style={styles.header_content}>{teacher?.name}</Text>
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.content_label}>Số điện thoại: </Text>
                <Text style={styles.content_styled}>{teacher?.phone_number}</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.content_label}>Số buổi phải dạy: </Text>
                <Text style={styles.content_styled}>{teacher?.teaching_sessions?.length}</Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default WTeacher

const styles = StyleSheet.create({
    wrapper:{

    },
    component:{
        marginVertical:5,
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:6,
        backgroundColor:'#FFF',
        flexDirection:'row',
        display:'flex',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image_wrapper:{

    },
    container:{
        display:"flex",
        flexDirection:'row',
        alignItems:'flex-start',
        marginLeft: 8,
        flex:1
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:8,
        flex:1
    },
    header_subject:{
        flexDirection:'row',
        paddingHorizontal:8,
        paddingVertical:6,
        // borderRadius:6,
        // backgroundColor:'#445dad',
    },
    header_id:{
        flexDirection:'row',
        paddingHorizontal:8,
        paddingVertical:6,
        borderRadius:6,
        // backgroundColor:'#ff6c02',
    },
    header_label:{
        // color:"#",
        fontSize:16,
        lineHeight:20,
        fontWeight:'400',
    },
    header_content:{
        // color:"#fff",
        fontSize:16,
        lineHeight:20,
        fontWeight:'600',
    },
    content_label:{
        fontSize:12,
        display:'flex',
        lineHeight:18,
        fontWeight:'400',
    },
    content_styled:{
        fontSize:14,
        lineHeight:20,
        fontWeight:'600',
        display:'flex',
        flex:1
    },
    content_styled_row:{
        fontSize:14,
        lineHeight:20,
        fontWeight:'600',
    },
})