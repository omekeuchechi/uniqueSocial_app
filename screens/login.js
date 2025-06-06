import React, {useState} from 'react';
import { 
    View, 
    Text, 
    SafeAreaView, 
    TextInput, 
    Pressable, 
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Image
} from 'react-native';
import { Checkbox } from '../components/checkBox';
// import CheckBox from '@react-native-community/checkbox';
import AppText from '../components/appText';
import Error from '../components/error';
import baseUrl from '../components/url';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AppButton from '../components/appButton';



const Login = ({navigation}) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    // this is for validation of login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [hidePassword, setHidePassword] = useState(true);

    const handleLogin = () => {
        if (email == '' || password == '') {
            setError('All fields are required');
            return;
        }

        const user = {
            email: email,
            password: password
        }

        fetch(`${baseUrl}/user/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then((res) => res.json()).then((data) => {
            if (!data.user.isAdmin) {
             return navigation.navigate('Home', {user: data.user, token: data.token})
            }
            if (data.user.isAdmin) {
                return navigation.navigate('AdminDashboard', {user: data.user, token: data.token})
            }
        })
        .catch((err) => console.log(err))

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
            {console.log()}
            <View style={styles.formContainer}>
                <View style={[styles.center, styles.formHeader]}>
                    <Text style={[{ fontSize: 30, fontWeight: 'bold' },styles.normalText]}>
                        Welcome Back user
                    </Text>
                    <AppText style={[{ fontSize: 15, fontWeight: 600 }, styles.normalText]}>
                        Login Here
                    </AppText>
                </View>
                <View style={styles.formFields}>
                    <View style={[{width: '100%'}, styles.center]}>
                        <TextInput style={[styles.email, {marginBottom:3}]} placeholder="Enter your email" onChangeText={(email) => setEmail(email.trim().toLowerCase())} />
                    </View>
                    <View style={[{width: '100%'}, styles.center]}>
                        <TextInput style={[styles.email, {marginTop: 5}]}  placeholder="Enter your password" secureTextEntry={hidePassword} onChangeText={(password) => setPassword(password.trim())}/>
                        <Pressable onPress={() => setHidePassword(!hidePassword)} style={{position: 'absolute', right: 20, top: 20, width: 20, height: 20}}>
                            <Image source={require('../assets/icons/show_password.png')} style={{width: 22, height: 22}}/>
                        </Pressable>
                    </View>
                    {error && email == '' || password == '' ? (<Error message={error} style={{ color: 'red', fontSize: 15}} />) : null}
                    <View style={[{flexDirection: 'row', width: '100%', paddingTop: 10, justifyContent: 'space-between' }]}>
                        <View style={{ flexDirection:'row', gap: 10 }}>
                            <Text style={styles.normalText}>Remember Me</Text>
                            <Checkbox />
                        </View>
                        <View>
                            <AppText fontSize={13} onPress={() => navigation.navigate('ForgetPassword')} style={[styles.normalText, {textDecoration: 'underline'}]}>Forget password?</AppText>
                        </View>
                    </View>
            <TouchableOpacity
                style={
                styles.loginBtn
                } onPress={handleLogin}
            >
                {/* {({ pressed }) => ( */}
                <Text style={styles.loginText}>Login</Text>
                {/* )} */}
            </TouchableOpacity>
            <View>
                <AppText onPress={() => navigation.navigate('Register')} style={[styles.normalText, {fontWeight: 900, fontSize: 15, marginHorizontal: '23.8%'}]}>Create an account?</AppText>
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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5fa'
    },
    formContainer: {
        height: '70%',
        width: '85%',
        borderColor: 'white',
        borderWidth: 1,
        marginTop: 50
    },
    formHeader: {
        flex: 1,
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

export default Login;