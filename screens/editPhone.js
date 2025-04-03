import React, { userState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import AppText from '../components/appText';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppButton from '../components/appButton';

const EditPhone = ({navigation, route}) => {
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <ScrollView style={{marginVertical: 100}}>
                    <View style={[styles.container]}>
                        <View style={styles.header}>
                            {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                                <FontAwesome name="angle-left" size={30} color="#000" />
                            </TouchableOpacity> */}
                            <AppText fontSize={20} style={[styles.headerText]}>Edit Phone Number</AppText>
                        </View>
                        <View style={styles.inputContainer}>
                                <AppText fontSize={14} style={{ color: '#a09999' }}>Country</AppText>  
                                <View style={[styles.input, { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }]}>  
                                    <AppText fontSize={14} style={{ position: 'relative', left: 50, color: '#444242' }}>United States</AppText>  
                                    <TouchableOpacity onPress={() => navigation.navigate('EditUserName')}>  
                                        <FontAwesome name="angle-right" size={20} color="#000" />  
                                    </TouchableOpacity>  
                                </View>
                                <AppText fontSize={14} style={{ color: '#a09999' }}>Phone Number</AppText>  
                            <TextInput
                                placeholder="Enter your new phone number"
                                style={styles.input}
                                // value={route.params?.phoneNumber}
                                // onChangeText={(text) => setPhoneNumber(text)}
                                // secureTextEntry={false}
                                keyboardType="phone-pad"
                            />
                        </View>
                        <AppButton style={styles.button} titleStyle={{ color: '#fff', fontSize: 20 }} onPress={() => navigation.navigate('UpdateProfile')}>Save</AppButton>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>    
    );
}

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
    backButton: {
        marginRight: 10,
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
    },
    button: {
        backgroundColor: 'blue',
        borderRadius: 5,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default EditPhone;