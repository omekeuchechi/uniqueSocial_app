import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Pressable, StatusBar, StyleSheet, Image } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AppText from '../components/appText';
import baseUrl from '../components/url';

const EditPassword = ({navigation, route}) => {
    const { userData, tokenData } = route.params;
    const [password, setPassword] = useState();
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);

    const handlePasswordUpdate = () =>{
        if (password.trim() === '') {
            setError('This field is required');
            return;
        }

        setLoading(true);
        fetch(`${baseUrl}/user/profile`, {
            method: 'PATCH',
            headers: {
                'authorization': tokenData,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: password.trim() }),
        })
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                if (data.status === 200 || data.message === 'User profile updated successfully') {
                    setError('');
                    setMsg('password updated successfully');
                } else {
                    setError(data.message || 'Failed to update password');
                }
            })
            .catch(error => {
                setLoading(false);
                setError('An error occurred. Please try again.');
                console.error('Error updating password:', error);
            });
    }


    useEffect(() => {
            if (msg !== '') {
                const timer = setTimeout(() => setMsg(''), 2000);
                return () => clearTimeout(timer);
            }
        }, [msg]);
    
        useEffect(() => {
            if (error !== '') {
                const timer = setTimeout(() => setError(''), 2000);
                return () => clearTimeout(timer);
            }
        }, [error]);
    

        return(
            <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />
                <View style={styles.header}>
                    <AppText style={styles.headerText}>Edit Password</AppText>
                </View>
                <View style={styles.content}>
                    <TextInput
                        style={[styles.input]}
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                        }}
                        secureTextEntry={hidePassword}
                    />
                    <Pressable onPress={() => setHidePassword(!hidePassword)} style={{position: 'absolute', right: 20, top: 20, width: 20, height: 20}}>
                        <Image source={require('../assets/icons/show_password.png')} style={{width: 22, height: 22}}/>
                    </Pressable>
            
                    {error ? <Text style={styles.errorText}>{error}</Text> : <Text style={styles.successText}>{msg}</Text>}

                    <Pressable onPress={handlePasswordUpdate} style={styles.button}>
                        {loading ? <AppText style={styles.buttonText}>Loading...</AppText> : <AppText style={styles.buttonText}>Update Password</AppText>}
                    </Pressable>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );

}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#fff', 
        padding: 20 
    },
    header: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 20 
    },
    headerText: { 
        fontSize: 24, 
        fontWeight: 'bold' 
    },
    content: { 
        flex: 1 
    },
    input: { 
        height: 50, 
        borderColor: '#ccc', 
        borderWidth: 1, 
        borderRadius: 5, 
        paddingHorizontal: 10, 
        marginBottom: 10 
    },
    errorInput: { 
        borderColor: 'red', 
        backgroundColor: '#ffe6e6' 
    },
    errorText: { 
        color: 'red', 
        marginBottom: 10 
    },
    successText: { 
        color: 'green', 
        marginBottom: 10 
    },
    button: { 
        backgroundColor: '#0056b3', 
        paddingVertical: 15, 
        borderRadius: 5, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    buttonText: { 
        color: '#fff', 
        fontSize: 18, 
        fontWeight: 'bold' 
    },
});

export default EditPassword;