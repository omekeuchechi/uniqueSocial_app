import React from 'react';
import { 
    View, 
    Text, 
    SafeAreaView, 
    TextInput, 
    Pressable, 
    StyleSheet,
    useColorScheme,
    StatusBar,
    ScrollView,
    Image,
    Button
} from 'react-native';
import AppText from '../components/appText';
import TabBar from '../components/profileTabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppButton from '../components/appButton';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import baseUrl from '../components/url';

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


const Welcome = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#0056b3" barStyle="light-content" />  
            <View style={[styles.center]}>
                <Image source={require('../assets/img/welcome1.png')} style={[styles.welcomeImg, styles.center]} />    
            </View>
            <View style={[styles.center, {position: 'relative', top: -100}]}>
                <AppText fontSize={33} style={[{ textAlign: 'center' }, styles.bold, styles.color1]}>Connect Anywhere You Are</AppText>
                <AppText fontSize={13} style={styles.color3}>Connect to the world of developer</AppText>
            </View>
            <View style={[{ flex: 1, gap: 8, position: 'relative', top: -90}]}>
                <AppButton style={styles.btn} titleStyle={styles.buttonText} onPress={() => navigation.navigate('Register')}>create an account</AppButton>
                <AppButton style={styles.btn1} titleStyle={styles.buttonText1} onPress={() => navigation.navigate('Login')}>I already have an account</AppButton>
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    welcomeImg: {
        width: '90%',
        height: '70%',
        position: 'relative',
        top: -10
    },
    bold: {
        fontWeight: 'bold',
    },
    color1: {
        color: '#000'
    },
    color2: {
        color: '#fff'
    },
    color3: {
        color: 'gray'
    },
    btn: {
        backgroundColor: '#0056b3',
        borderColor: '#0056b3',
        borderWidth: 1,
    },
    btn1: {
        backgroundColor: '#fff',
        borderColor: '#0056b3',
        borderWidth: 1,
    },
    buttonText: {  
        color: '#fff', 
        fontSize: 16,  
    },
    buttonText1: {  
        color: '#0056b3', 
        fontSize: 16,  
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default Welcome;