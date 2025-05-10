import React, { useState } from 'react';  
import {  
    View,  
    Text,  
    SafeAreaView,  
    TextInput,  
    Pressable,  
    StyleSheet,
    StatusBar,  
    Modal  
} from 'react-native';  
import AppText from '../components/appText';  

const ForgetPassword = ({ navigation }) => {  
    const [email, setEmail] = useState('');  
    const [modalVisible, setModalVisible] = useState(false);  
    const [message, setMessage] = useState('');  

    const handleResetPassword = async () => {  
        // Basic email validation  
        if (!email.includes('@')) {  
            setMessage('Please enter a valid email address.');  
            setModalVisible(true);  
            return;  
        }  

        // Here you would typically make an API call to your backend  
        // to request a password reset.  For this example, we'll just  
        // simulate a successful request.  

        // Simulate success  
        setMessage('A password reset link has been sent to your email address.');  
        setModalVisible(true);  
    };  

    return (  
        <SafeAreaView style={[styles.container, styles.center]}>  
        <StatusBar backgroundColor="#0056b3" barStyle="light-content" /> 
            <View style={styles.formContainer}>  
                <View style={[styles.center, styles.formHeader]}>  
                    <Text style={[{ fontSize: 30, fontWeight: 'bold' }, styles.normalText]}>  
                        Reset Your Password  
                    </Text>  
                    <AppText style={[{ fontSize: 15, fontWeight: 600 }, styles.normalText]}>  
                        Enter your email to receive a reset link.  
                    </AppText>  
                </View>  
                <View style={styles.formFields}>  
                    <View style={[{ width: '100%' }, styles.center]}>  
                        <TextInput  
                            style={styles.email}  
                            placeholder="Enter your email"  
                            keyboardType="email-address"  
                            value={email}  
                            onChangeText={setEmail}  
                        />  
                    </View>  

                    <Pressable  
                        style={styles.resetBtn}  
                        onPress={handleResetPassword}  
                    >  
                        {({ pressed }) => (  
                            <Text style={styles.resetText}>Reset Password</Text>  
                        )}  
                    </Pressable>  

                    <Pressable onPress={() => navigation.goBack()}>  
                        <AppText style={[styles.normalText, { fontWeight: 900, fontSize: 15, textAlign: 'center' }]} onPress={() => navigation.navigate('Login')}>  
                            Back to Login  
                        </AppText>  
                    </Pressable>  
                </View>  
            </View>  

            {/* Success/Error Modal */}  
            <Modal  
                animationType="slide"  
                transparent={true}  
                visible={modalVisible}  
                onRequestClose={() => {  
                    setModalVisible(!modalVisible);  
                }}  
            >  
                <View style={styles.centeredView}>  
                    <View style={styles.modalView}>  
                        <Text style={styles.modalText}>{message}</Text>  
                        <Pressable  
                            style={[styles.button, styles.buttonClose]}  
                            onPress={() => setModalVisible(!modalVisible)}  
                        >  
                            <Text style={styles.textStyle}>Okay</Text>  
                        </Pressable>  
                    </View>  
                </View>  
            </Modal>  
        </SafeAreaView>  
    );  
};  

const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
        padding: 10,  
        backgroundColor: '#f5f5fa',  
    },  
    formContainer: {  
        height: '60%', // Adjusted height  
        width: '85%',  
        borderColor: 'white',  
        borderWidth: 1,  
        marginTop: 50,  
    },  
    formHeader: {  
        flex: 1,  
        width: '100%',  
    },  
    formFields: {  
        flex: 3, // Adjusted flex  
        padding: 20,  
    },  
    email: {  
        width: '100%',  
        paddingHorizontal: 15,  
        paddingVertical: 17,  
        borderColor: '#cccccc',  
        borderWidth: 2,  
        color: '#4d1ecf',  
        borderRadius: 8,  
        marginBottom: 20, // Added margin  
    },  
    center: {  
        alignItems: 'center',  
        justifyContent: 'center',  
    },  
    resetText: {  
        color: '#fff',  
        fontSize: 20,  
        fontWeight: 900,  
        textAlign: 'center',  
    },  
    normalText: {  
        color: '#4d1ecf',  
    },  
    resetBtn: {  
        backgroundColor: '#462be0',  
        borderRadius: 40,  
        paddingVertical: 10,  
        marginVertical: 10,  
    },  
    // Modal styles  
    centeredView: {  
        flex: 1,  
        justifyContent: 'center',  
        alignItems: 'center',  
        marginTop: 22,  
    },  
    modalView: {  
        margin: 20,  
        backgroundColor: 'white',  
        borderRadius: 20,  
        padding: 35,  
        alignItems: 'center',  
        shadowColor: '#000',  
        shadowOffset: {  
            width: 0,  
            height: 2,  
        },  
        shadowOpacity: 0.25,  
        shadowRadius: 4,  
        elevation: 5,  
    },  
    button: {  
        borderRadius: 20,  
        padding: 10,  
        elevation: 2,  
    },  
    buttonClose: {  
        backgroundColor: '#2196F3',  
    },  
    textStyle: {  
        color: 'white',  
        fontWeight: 'bold',  
        textAlign: 'center',  
    },  
    modalText: {  
        marginBottom: 15,  
        textAlign: 'center',  
    },  
});  

export default ForgetPassword;  