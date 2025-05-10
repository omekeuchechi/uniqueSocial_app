import React, { useEffect, useState } from 'react';  
import {  
    View,  
    SafeAreaView,  
    ScrollView,  
    StyleSheet,  
    Pressable,  
    Animated,  
    ActivityIndicator,  
    StatusBar,  
} from 'react-native';  
import FontAwesome from 'react-native-vector-icons/FontAwesome';  
import AppText from '../components/appText';  
import baseUrl from '../components/url';

const BlogPage = ({ navigation, route }) => {  
    const [user] = useState(route.params.user); // Extract user from route params  
    const [token] = useState(route.params.token); // Extract token from route params  
    const [fadeAnim] = useState(new Animated.Value(0)); // Animated value for fade-in  
    const [posts, setPosts] = useState([]); // State for posts  
    const [loading, setLoading] = useState(true); // State for loading indicator  
    const [error, setError] = useState(null); // State for error handling  

    useEffect(() => {  
        // Fade-in animation when the component mounts  
        Animated.timing(fadeAnim, {  
            toValue: 1,  
            duration: 1000,  
            useNativeDriver: true,  
        }).start();  

        // Fetching posts from the backend with authorization token  
        const fetchPosts = async () => {  
            try {  
                const response = await fetch(`${baseUrl}/post`, {  
                    method: 'GET',  
                    headers: {  
                        'authorization': token,  
                        Accept: 'application/json',  
                    },  
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

        fetchPosts(); // Call the fetch function  
    }, [token, fadeAnim]);  

    return (  
        <SafeAreaView style={styles.container}>  
            <StatusBar backgroundColor="#0056b3" barStyle="light-content" />  
            <View style={styles.header}>  
                <Pressable onPress={() => navigation.goBack()}>  
                    <FontAwesome name="arrow-left" size={20} color="#fff" />  
                </Pressable>  
                <AppText style={styles.headerText}>Blog</AppText>  
                <Pressable onPress={() => navigation.navigate('Options')}>  
                    <FontAwesome name="ellipsis-v" size={20} color="#fff" />  
                </Pressable>  
            </View>  
            <Animated.View style={{ opacity: fadeAnim }}>  
                <ScrollView contentContainerStyle={styles.scrollContainer}>  
                    {loading ? (  
                        <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: 20 }} />  
                    ) : error ? (  
                        <AppText fontSize={12} style={{ color: 'red', textAlign: 'center' }}>{error}</AppText>  
                    ) : posts.length === 0 ? (  
                        <AppText fontSize={12} style={{ color: '#696161', textAlign: 'center' }}>No posts available.</AppText>  
                    ) : (  
                        posts.map((post) => (  
                            <Pressable  
                                key={post._id}  
                                style={styles.postCard}  
                                onPress={() => navigation.navigate('PostDetail', { post })} // Navigate to post detail  
                            >  
                                <AppText fontSize={18} style={styles.postTitle}>{post.content}</AppText>  
                                <AppText fontSize={14} style={styles.postExcerpt}>{post.excerpt}</AppText>  
                            </Pressable>  
                        ))  
                    )}  
                </ScrollView>  
            </Animated.View>  
        </SafeAreaView>  
    );  
};  

const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
        backgroundColor: '#f0f4f8', // Light background  
    },  
    header: {  
        height: 100,  
        backgroundColor: '#0056b3',  
        borderBottomLeftRadius: 30,  
        borderBottomRightRadius: 30,  
        flexDirection: 'row',  
        alignItems: 'center',  
        paddingHorizontal: 20,  
    },  
    headerText: {  
        flex: 1,  
        textAlign: 'center',  
        fontSize: 20,  
        fontWeight: 'bold',  
        color: '#fff',  
    },  
    scrollContainer: {  
        padding: 20,  
    },  
    postCard: {  
        backgroundColor: '#fff',  
        padding: 16,  
        borderRadius: 8,  
        marginBottom: 10,  
        elevation: 3,  
        shadowColor: '#000',  
        shadowOffset: { width: 0, height: 1 },  
        shadowOpacity: 0.2,  
        shadowRadius: 1.5,  
    },  
    postTitle: {  
        fontSize: 18,  
        fontWeight: 'bold',  
        color: '#0056b3',  
    },  
    postExcerpt: {  
        fontSize: 14,  
        color: '#696161',  
        marginTop: 4,  
    },  
});  

export default BlogPage;  