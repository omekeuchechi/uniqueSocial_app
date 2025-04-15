import React, { useEffect, useState } from 'react';  
import {  
    View,  
    SafeAreaView,  
    ScrollView,  
    StyleSheet,  
    Image,  
    Pressable,  
    Animated,  
    ActivityIndicator,  
} from 'react-native';  
import AppText from '../components/appText';  
import TabBar from '../components/profileTabs';  
import FontAwesome from 'react-native-vector-icons/FontAwesome';  
import baseUrl from '../components/url';  

const Home = ({ navigation, route }) => {  
    const [user] = useState(route.params.user);  
    const [token] = useState(route.params.token);  
    const [fadeAnim] = useState(new Animated.Value(0));  
    const [posts, setPosts] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  

    useEffect(() => {  
        // Fade-in animation when the component mounts  
        Animated.timing(fadeAnim, {  
            toValue: 1,  
            duration: 1000,  
            useNativeDriver: true,  
        }).start();  

        // Fetching posts from the backend  
        const fetchPosts = async () => {  
            try {  
                const response = await fetch(`${baseUrl}/post`, {  
                    method: 'GET',  
                    headers: {  
                        'authorization': token,  
                        Accept: 'application/json',   
                    }  
                });  

                if (!response.ok) {  
                    throw new Error(`HTTP error! status: ${response.status}`);  
                }  

                const data = await response.json();  
                setPosts(data.posts);  
            } catch (error) {  
                console.error('Fetch Error:', error.message);  
                setError(error.message);  
            } finally {  
                setLoading(false); // Ensure loading is set to false after the fetch is done  
            }  
        };  

        fetchPosts();  
    }, [token, fadeAnim]);  

    return (  
        <SafeAreaView style={styles.container}>  
            <ScrollView>  
                <View style={styles.header}>  
                    {/* <ThreeDotNav title="Profile" dotColor="#fff" menuOptions={menuOptions} onPress={() => navigation.navigate('Options')} />   */}  
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

                    {loading ? (  // Display loading indicator  
                        <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: 20 }} />  
                    ) : error ? (  // Display error message  
                        <AppText fontSize={12} style={{ color: 'red', textAlign: 'center' }}>{error}</AppText>  
                    ) : posts.length === 0 ? (  
                        <AppText fontSize={12} style={{ color: '#696161', textAlign: 'center' }}>No posts available.</AppText>  
                    ) : (  
                        posts.map(post => (  
                            <View key={post._id} style={styles.postCard}>  
                                <AppText fontSize={14}>{post.category}</AppText>  
                                <AppText fontSize={12} style={{ color: '#696161' }}>{post.content}</AppText>  
                            </View>  
                        ))  
                    )}  
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
        color: 'blue',  
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
    postCard: {  
        padding: 10,  
        borderBottomWidth: 1,  
        borderBottomColor: '#ddd',  
    },  
});  

export default Home;  