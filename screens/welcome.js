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


const Welcome = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#0056b3" barStyle="light-content" />  
            <View style={[styles.center]}>
                <Image source={require('../assets/img/welcome1.png')} style={[styles.welcomeImg, styles.center]} />    
            </View>
            <View style={[styles.center, {position: 'relative', top: -80}]}>
                <AppText fontSize={33} style={[{ textAlign: 'center' }, styles.bold, styles.color1]}>Connect Anywhere You Are</AppText>
                <AppText fontSize={13} style={styles.color3}>Connect to the world of developer</AppText>
            </View>
            <View style={[{ flex: 1, gap: 8, position: 'relative', top: -40}]}>
                <AppButton style={styles.btn} titleStyle={styles.buttonText} onPress={() => navigation.navigate('Register')}>create an account</AppButton>
                <AppButton style={styles.btn1} titleStyle={styles.buttonText1} onPress={() => navigation.navigate('Login')}>I already have an account</AppButton>
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
        backgroundColor: 'blue',
        borderColor: 'blue',
        borderWidth: 1,
    },
    btn1: {
        backgroundColor: '#fff',
        borderColor: 'blue',
        borderWidth: 1,
    },
    buttonText: {  
        color: '#fff', 
        fontSize: 16,  
    },
    buttonText1: {  
        color: 'blue', 
        fontSize: 16,  
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default Welcome;