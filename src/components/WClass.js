import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const WClass = ({classInfo}) => {
  return (
    <View style={styles.component}>
        <View style={styles.header}>
            <View style={styles.header_subject}>
                <Text style={styles.header_label}>Môn: </Text>
                <Text style={styles.header_content}>{classInfo?.name}</Text>
            </View>
            <View style={styles.header_id}>
                <Text style={styles.header_label}>Mã lớp: </Text>
                <Text style={styles.header_content}>{classInfo?.id}</Text>
            </View>
        </View>
        <View style={styles.container}>
            <Text style={styles.content_label}>Sĩ số lớp: </Text>
            <Text style={styles.content_styled}>{classInfo?.studentCount}</Text>
        </View>
        <View style={styles.container}>
            <Text style={styles.content_label}>Giờ học: </Text>
            <Text style={styles.content_styled}>{classInfo?.time}</Text>
        </View>
    </View>
  )
}

export default WClass

const styles = StyleSheet.create({
    component:{
        paddingHorizontal:15,
        paddingVertical:10,
        borderWidth:1,
        borderRadius:6,
        backgroundColor:'#FFF'
    },
    container:{
        display:"flex",
        flexDirection:'row',
        alignItems:'flex-end'
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:8
    },
    header_subject:{
        flexDirection:'row',
        paddingHorizontal:8,
        paddingVertical:6,
        borderRadius:6,
        backgroundColor:'#445dad',
    },
    header_id:{
        flexDirection:'row',
        paddingHorizontal:8,
        paddingVertical:6,
        borderRadius:6,
        backgroundColor:'#ff6c02',
    },
    header_label:{
        color:"#fff",
        fontSize:14,
        lineHeight:20,
        fontWeight:'400',
    },
    header_content:{
        color:"#fff",
        fontSize:16,
        lineHeight:20,
        fontWeight:'600',
        textTransform:'uppercase',
    },
    content_label:{
        fontSize:12,
        lineHeight:18,
        fontWeight:'400',
    },
    content_styled:{
        fontSize:14,
        lineHeight:20,
        fontWeight:'600',
    }
})