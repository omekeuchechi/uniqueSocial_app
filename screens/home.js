import React, {useEffect, useState} from 'react';
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
    Image
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AppText from '../components/appText';
import TabBar from '../components/profileTabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Svg, { Circle, Rect, Path } from 'react-native-svg';
import ThreeDotNav from '../components/threeDot';



const Home = ({navigation, route}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');


        const menuOptions = [
            { key: 'UpdateProfile'},
            { key: 'Option 2'},
            { key: 'Option 3'},
            { key: 'Option 4'},
            { key: 'Option 5'},
        ];


        // const navLink = ['UpdateProfile', 'UpdateProfile', 'UpdateProfile', 'UpdateProfile', 'UpdateProfile'];

    // const MyIcon = () => <FontAwesome name="rocket" size={30} color="#900" />;
    // const userResult = route.params.user;
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.header}>
                    {/* {console.log(route.params.user)} */}
                    {/* {console.log(route.params.user.name)} */}
                <ThreeDotNav title="Profile" dotColor="#fff" menuOptions={menuOptions} onPress={() => navigation.navigate()} />
                </View>
                <View>
                    <Image source={require('../assets/img/pro.png')} style={styles.profileImg}/>
                </View>
                <View style={styles.userInfo}>
                    <View style={styles.profileDetails}>
                        <AppText fontSize={17} style={styles.profileTxt}>omekejoseph</AppText>
                        <AppText fontSize={13} style={styles.profileTxt}>omekejoseph97@gmail.com</AppText>
                    </View>
                    <View>
                        <AppText fontSize={13} style={{ fontWeight: 900 }} onPress={() => navigation.navigate('UpdateProfile')}>EDIT</AppText>
                    </View>
                </View>
                <View style={styles.aboutHead}>
                    <AppText fontSize={14} style={styles.aboutTxt}>About User</AppText>
                </View>
                <View style={styles.aboutContent}>
                    <AppText fontSize={12} style={{ color: '#696161' }}>Who am i?, you may think am just a starter but am not just that, Enough of this crap let talk what i am or who am i, am a 10x programmer Who have develop website like clicker.ng, web-bros and Now trying to show you my potentials as a software developer that is who i am ASAP.</AppText>
                </View>
                <TabBar />
                <View style={styles.achievements}><AppText fontSize={15} style={{ color: '#fff' }}>Achievements</AppText></View>
                <View style={styles.achievementsBox}>
                    <Image source={require('../assets/img/succese.jpg')} style={styles.achPic} />
                    <AppText fontSize={12}>Succesfuly have 6 followers</AppText>
                    {/* <MyIcon /> */}
                    <FontAwesome 
                        name="facebook"
                        size={30}
                        color="red"
                    />
                    {/* <Svg width="100" height="100">
  <Circle cx="50" cy="50" r="40" stroke="blue" strokeWidth="2" fill="red" />
</Svg> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'blue',
        height: 130,
    },
    profileImg: {
        width: 60,
        height: 60,
        borderWidth: 4,
        borderRadius: 5,
        borderColor: 'white',
        position: 'relative',
        top: -50,
        left: 18,
    },
    userInfo: {
        flex: 1,
        marginTop: -30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '6%'
    },
    profileDetails: {
        flex: 1,
        gap: 4
    },
    profileTxt: {
        color: '#696161'
    },
    aboutHead: {
        marginHorizontal: '2.3%',
        padding: 12
    },
    aboutTxt: {
        fontStyle: 'italic',
        textDecorationLine: 'underline'
    },
    aboutContent: {
        paddingHorizontal: '7%',
    },
    achievements: {
        paddingHorizontal: '8%',
        paddingVertical: '3%',
        backgroundColor: '#a09d9d',
    },
    achPic: {
        width: 50,
        height: 50,
        borderRadius: 30,
    },
    achievementsBox: {
        flex: 1,
        flexDirection: 'row',
        gap: 9,
        alignItems: 'center'
    }
});

export default Home;