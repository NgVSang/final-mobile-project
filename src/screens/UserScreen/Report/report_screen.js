import { Alert, ScrollView, StyleSheet, TouchableOpacity, View, } from 'react-native'
import React from 'react'
import Header from '../../../components/layout/Header'
import WTextInput from '../../../components/WTextInput';


const ReportScreen = ({navigation}) => {
    const [inputReport,setInputReport] = useState({
        title: "",
        reason: "",
        restDate: null,
    })
    const handleSubmit = () => {
        if(Object.values(inputReport).includes("",null)) {
        Alert("empty value");
        } else {
            Alert("add report success");
        }
    }
    return (
        <View syle={{flex:1 }}>
            <Header onGoBack={()=>navigation.goBack()} title='Báo cáo'/>
            <ScrollView style={styles.scroll_view}>
                <View>

                    
                    <View>
                    <WTextInput 
                    group_style={styles.input}
                    label="Tiêu đề"
                    text={inputReport.title}
                    setText={(e)=>setInputReport(prev=> ({
                        ...prev,
                        title: e.target.value
                    }))}
                    />
                    </View> 
                    <View>
                    <WTextInput 
                    group_style={styles.input}
                    label="lí do"
                    text={inputReport.reason}
                    setText={(e)=>setInputReport(prev=> ({
                        ...prev,
                        reason: e.target.value
                    }))}
                    />
                    </View> 
                    <View>
                        
                    </View> 

                    <View style={styles.buttonWrapper}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={handleSubmit}
                    >
                        <Text style={{color:'#fff'}}>Submit</Text>
                    </TouchableOpacity>
                </View>
                </View>

            </ScrollView>
        </View>
    );
}

export default ReportScreen;

const styles = StyleSheet.create({
    scroll_view:{
        backgroundColor:'#F7FAFF',
        flex:1,
    },
    month_select:{
        display:'flex',
        paddingHorizontal:15,
        paddingVertical:10,
    },
    input:{
        marginTop:30
    },
    buttonWrapper:{
        alignItems:'center',
        marginTop:30
    },
    button:{
        height:40,
        width:200,
        borderRadius:24,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#0F6AA9',
    },
})