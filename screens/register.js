import React, {useState} from 'react';
import { View, Text, SafeAreaView, ScrollView, TextInput, Pressable, Image, StyleSheet, Button, StatusBar } from 'react-native';

import { Checkbox } from '../components/checkBox';
import Error from '../components/error';
import AppText from '../components/appText';
import baseUrl from '../components/url';
import AppButton from '../components/appButton';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Access } from './sign';

const Register = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = () => {
        if (name == '' || email == '' || password == '') {
            setError('All fields are required');
            return;
        }

        const user = {
            name: name,
            email: email,
            password: password
        }

        // send a post request to the backend
        fetch(`${baseUrl}/user/create`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then((res) => res.json()).then((data) => {
            navigation.navigate('Login', {user: data});
        })
        .catch((err) => console.log(err));
    }


    // 857769217341-to45dj35cb03khplq9ppem6fitd9bhvj.apps.googleusercontent.com
GoogleSignin.configure({
    webClientId: '857769217341-to45dj35cb03khplq9ppem6fitd9bhvj.apps.googleusercontent.com',
});
  
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
  
      const response = await fetch(`${baseUrl}/user/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Google sign-in successful:', data);
        // Save JWT (data.token) and user info (data.user) as needed
      } else {
        console.warn('Google sign-in failed:', data.message);
      }
    } catch (error) {
      console.error('Google Sign-In error:', error);
    }
  };


    return (
        <SafeAreaView style={[styles.container, styles.center]}>
            <StatusBar backgroundColor="#0056b3" barStyle="light-content" /> 
            <View style={styles.formContainer}>
                <View style={[styles.center, styles.formHeader]}>
                    <AppText fontSize={40} style={[{ fontWeight: 'bold' },styles.normalText]}>
                        Get Started
                    </AppText>
                    <AppText fontSize={20} style={[{fontWeight: 600 }, styles.normalText]}>
                        Create an account
                    </AppText>
                </View>
                <View style={styles.formFields}>
                    <View style={[{width: '100%'}, styles.center]}>
                        <TextInput style={[styles.email, {marginBottom:3}]} placeholder="Enter your name" onChangeText={(name) => setName(name.trim())} />
                    </View>
                    <View style={[{width: '100%'}, styles.center]}>
                        <TextInput style={[styles.email, {marginTop: 5}]} placeholder="Enter your Email" keyboardType="email-address" onChangeText={(email) => setEmail(email.trim().toLowerCase())} />
                    </View>
                    <View style={[{width: '100%'}, styles.center]}>
                        <TextInput style={[styles.email, {marginTop: 5}]} placeholder="Enter your password" keyboardType="visible-password" onChangeText={(password) => setPassword(password.trim())} secureTextEntry={true} />
                    </View>
                    {error && name == '' || email == '' || password == '' ? (<Error message={error} style={{ color: 'red', fontSize: 20}} />) : null}
                    <View style={[{flexDirection: 'row', width: '100%', paddingTop: 10, justifyContent: 'space-between' }]}>
                    </View>
                    {/* <Button title='Register' /> */}
                                    <Pressable
                                        style={
                                        styles.loginBtn
                                        }
                                        onPress={handleRegister}
                                    >
                                        {({ pressed }) => (
                                        <Text style={styles.loginText}>Register</Text>
                                        )}
                                    </Pressable>
            <View>
                <AppText onPress={() => navigation.navigate('Login')} style={[styles.normalText, {fontWeight: 900, fontSize: 15, marginHorizontal: '21.1%'}]}>Already have an account?</AppText>
                <AppText onPress={() => navigation.navigate('Home')} style={[styles.normalText, {fontWeight: 900, fontSize: 15, marginHorizontal: '21.1%'}]}>home?</AppText>
            <AppButton 
                style={styles.btn1} 
                titleStyle={[styles.buttonText1, styles.center]} 
                onPress={handleGoogleSignIn}
            >
                <Image source={require('../assets/img/google.png')} style={{width: 20, height: 15}} /> 
                <AppText fontSize={16} style={[styles.buttonText1, {marginLeft: 10}]}>
                    Continue with Google
                </AppText>
            </AppButton>
            </View>
            </View>
            </View>
        </SafeAreaView>    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5fa'
    },
    formContainer: {
        height: '90%',
        width: '100%',
        borderColor: 'white',
        borderWidth: 1,
        marginVertical: 90
    },
    formHeader: {
        flex: 1.2,
        width: '100%'
    },
    formFields: {
        flex: 6,
        padding: 20
    },
    email: {
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 17,
        borderColor: '#cccccc',
        borderWidth: 2,
        color: '#0056b3',
        borderRadius: 8
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginText: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 900,
        textAlign: 'center'
    },
    normalText: {
        color: '#0056b3',
    },
    loginBtn: {
        backgroundColor: '#0056b3',
        borderRadius: 40,
        paddingVertical: 5,
        marginVertical: 30
    },
    btn1: {
        backgroundColor: '#fff',
        borderColor: '#0056b3',
        borderWidth: 1,
    },
})
export default Register;