import React, { useState } from 'react';  
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';  
import AppText from '../components/appText';  
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';  
import DateTimePicker from '@react-native-community/datetimepicker';  
import AppButton from '../components/appButton';  

const DataOfBirth = ({ navigation }) => {  
    const [dateOfBirth, setDateOfBirth] = useState(new Date());  
    const [show, setShow] = useState(false);  
    const [formattedDate, setFormattedDate] = useState('');  

    const onChange = (event, selectedDate) => {  
        const currentDate = selectedDate || dateOfBirth;  
        setShow(false);  
        setDateOfBirth(currentDate);  
        // Formatting date (MM/DD/YYYY)  
        const dateString = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;  
        setFormattedDate(dateString);  
    };  

    return (  
        <SafeAreaProvider>  
            <SafeAreaView>  
                <ScrollView style={{ marginVertical: 100 }}>  
                    <View style={styles.container}>  
                        <View style={styles.header}>  
                            <AppText fontSize={20} style={styles.headerText}>Edit Date of Birth</AppText>  
                        </View>  
                        <View style={styles.inputContainer}>  
                            <AppText fontSize={14} style={{ color: '#a09999' }}>Date of Birth</AppText>  
                            <TouchableOpacity onPress={() => setShow(true)} style={styles.input}>  
                                <AppText fontSize={16}>{formattedDate || "Select your date of birth"}</AppText>  
                            </TouchableOpacity>  
                            {show && (  
                                <DateTimePicker  
                                    testID="dateTimePicker"  
                                    value={dateOfBirth}  
                                    mode="date"  
                                    is24Hour={true}  
                                    display="default"  
                                    onChange={onChange}  
                                />  
                            )}  
                        </View>  
                        <AppButton style={styles.button} titleStyle={{ color: '#fff', fontSize: 20 }} onPress={() => navigation.navigate('UpdateProfile')}>  
                            Save  
                        </AppButton>  
                    </View>  
                </ScrollView>  
            </SafeAreaView>  
        </SafeAreaProvider>  
    );  
};  

const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
        padding: 20,  
        backgroundColor: '#fff',  
    },  
    header: {  
        flexDirection: 'row',  
        alignItems: 'center',  
        marginBottom: 20,  
    },  
    headerText: {  
        fontSize: 20,  
        color: '#000',  
        fontWeight: 'bold',  
    },  
    inputContainer: {  
        marginBottom: 20,  
    },  
    input: {  
        borderWidth: 1,  
        borderColor: '#ccc',  
        borderRadius: 5,  
        padding: 10,  
        fontSize: 16,  
        justifyContent: 'center',  
        alignItems: 'center',  
    },  
    button: {  
        backgroundColor: 'blue',  
        borderRadius: 5,  
    },  
});  

export default DataOfBirth;  