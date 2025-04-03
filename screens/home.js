import React, { useEffect, useState } from 'react';  
import {  
    View,  
    SafeAreaView,  
    ScrollView,  
    StyleSheet,  
    Image,  
    Pressable,  
    Animated,  
} from 'react-native';  
import AppText from '../components/appText';  
import TabBar from '../components/profileTabs';  
import FontAwesome from 'react-native-vector-icons/FontAwesome';  
import ThreeDotNav from '../components/threeDot';  

const Home = ({ navigation, route }) => {  
    const [fadeAnim] = useState(new Animated.Value(0));  

    useEffect(() => {  
        // Fade-in animation when the component mounts  
        Animated.timing(fadeAnim, {  
            toValue: 1,  
            duration: 1000,  
            useNativeDriver: true,  
        }).start();  
    }, []);  

    const user = route.params.user.user;  

    const menuOptions = [  
        { key: 'UpdateProfile' },  
        { key: 'Option 2' },  
        { key: 'Option 3' },  
        { key: 'Option 4' },  
        { key: 'Option 5' },  
    ];  

    return (  
        <SafeAreaView style={styles.container}>  
            <ScrollView>  
                <View style={styles.header}>  
                    <ThreeDotNav title="Profile" dotColor="#fff" menuOptions={menuOptions} onPress={() => navigation.navigate('Options')} />  
                </View>  
                <Animated.View style={{ opacity: fadeAnim }}>  
                    <View>  
                        <Image source={require('../assets/img/pro.png')} style={styles.profileImg} />  
                    </View>  
                    <View style={styles.userInfo}>  
                        <View style={styles.profileDetails}>  
                            <AppText fontSize={17} style={styles.profileTxt}>{user.name}</AppText>  
                            <AppText fontSize={13} style={styles.profileTxt}>{user.email}</AppText>  
                        </View>  
                        <Pressable onPress={() => navigation.navigate('UpdateProfile')}>  
                            <AppText fontSize={13} style={styles.editText}>EDIT</AppText>  
                        </Pressable>  
                    </View>  
                    <View style={styles.aboutHead}>  
                        <AppText fontSize={14} style={styles.aboutTxt}>About User</AppText>  
                    </View>  
                    <View style={styles.aboutContent}>  
                        <AppText fontSize={12} style={{ color: '#696161' }}>  
                            I am a passionate software developer with a rich background in building applications and websites.  
                        </AppText>  
                    </View>  
                    <TabBar />  
                    <View style={styles.achievements}>  
                        <AppText fontSize={15} style={{ color: '#fff' }}>Achievements</AppText>  
                    </View>  
                    <View style={styles.achievementsBox}>  
                        <Pressable onPress={() => navigation.navigate('BlogPage')}>  
                            <FontAwesome name="book" size={20} color="#000" />  
                            <AppText fontSize={12} style={styles.postText}> Posts</AppText>  
                        </Pressable>  
                    </View>  
                </Animated.View>  
            </ScrollView>  
        </SafeAreaView>  
    );  
};  

const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
        backgroundColor: '#fff',  
    },  
    header: {  
        backgroundColor: 'blue',  
        height: 130,  
        justifyContent: 'flex-end',  
        paddingHorizontal: 10,  
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
        flexDirection: 'row',  
        justifyContent: 'space-between',  
        paddingHorizontal: '6%',  
        marginTop: -40,  
    },  
    profileDetails: {  
        flex: 1,  
        gap: 4,  
    },  
    profileTxt: {  
        color: '#696161',  
    },  
    editText: {  
        fontWeight: 'bold',  
        color: 'blue', // Make the edit text more prominent  
    },  
    aboutHead: {  
        marginHorizontal: '2.3%',  
        padding: 12,  
    },  
    aboutTxt: {  
        fontStyle: 'italic',  
        textDecorationLine: 'underline',  
    },  
    aboutContent: {  
        paddingHorizontal: '7%',  
    },  
    achievements: {  
        paddingHorizontal: '8%',  
        paddingVertical: '3%',  
        backgroundColor: '#a09d9d',  
    },  
    achievementsBox: {  
        flexDirection: 'row',  
        alignItems: 'center',  
        justifyContent: 'flex-start',  
        paddingHorizontal: '8%',  
    },  
    postText: {  
        marginHorizontal: 5,  
        color: '#000',  
    },  
});  

export default Home;  