import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import React from 'react'
import dayjs from 'dayjs'; // Đường dẫn đúng đến thư viện Day.js
import 'dayjs/locale/vi'; // Import locale tiếng Việt của Day.js
dayjs.locale('vi');

const WClass = ({classInfo}) => {

    const dictionary = {
        'Monday': 'Thứ Hai',
        'Tuesday': 'Thứ Ba',
        'Wednesday': 'Thứ Tư',
        'Thursday': 'Thứ Năm',
        'Friday': 'Thứ Sáu',
        'Saturday': 'Thứ Bảy',
        'Sunday': 'Chủ Nhật'
    };

    function convertToVietnamese(word) {
        return dictionary[word] || word; // Trả về giá trị trong từ điển hoặc giữ nguyên nếu không tìm thấy
    }

    const renderIcon = React.useCallback((name)=> {
        switch (name) {
            case "Văn":
                return <Image 
                    source={require('../assets/images/literature_image.jpg')}
                    style={{
                        width: 100,
                        height:80
                    }}
                />
            case "Lý":
                return <Image 
                    source={require('../assets/images/physical_image.png')}
                    style={{
                        width: 100,
                        height:80
                    }}
                />
            case "Hóa":
                return <Image 
                    source={require('../assets/images/chemicals_image.jpg')}
                    style={{
                        width: 100,
                        height:80
                    }}
                />
            default:
                return <Image 
                source={require('../assets/images/default_class.jpeg')}
                style={{
                    width: 100,
                    height:80
                }}
            />
        }
             
    },[])

    return (
    <View style={styles.component}>
        <View style={styles.image_wrapper}>
            {renderIcon(classInfo?.name)}
        </View>
        <View style={{display:'flex',flex:1}}>
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
                <Text style={styles.content_styled}>{classInfo?.classroom_size}</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.content_label}>Giờ học: </Text>
                <View style={{
                    display:'flex',
                    flex:100,
                    flexDirection:'column'
                }}>
                    {
                        classInfo?.study_sessions?.map((time)=>(
                            <Text 
                                key={time.id}
                                style={{
                                    
                                }}
                            >
                                - Từ<Text style={styles.content_styled_row}> {time.start_time} </Text>
                                đến 
                                <Text style={styles.content_styled_row}> {time.end_time} </Text>
                                vào 
                                <Text style={styles.content_styled_row}> {convertToVietnamese(time.day_of_week)}</Text>
                            </Text>
                        ))
                    }
                </View>
                <Text style={styles.content_styled}>{classInfo?.time}</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.content_label}>Mô tả: </Text>
                <Text style={styles.content_styled}>{classInfo?.description}</Text>
            </View>
        </View>
    </View>
  )
}

export default WClass

const styles = StyleSheet.create({
    component:{
        marginVertical:5,
        paddingHorizontal:15,
        paddingVertical:10,
        // borderWidth:1,
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
        textTransform:'uppercase',
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