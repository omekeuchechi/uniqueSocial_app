import React from 'react';  
import { View, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';  
import AppText from '../components/appText'; // Replace this with your actual AppText component  
import Icon from 'react-native-vector-icons/FontAwesome';  
import { useRef } from 'react';  

const BlogPage = () => {  
    const animation = useRef(new Animated.Value(0)).current;  

    const animate = () => {  
        Animated.loop(  
            Animated.sequence([  
                Animated.timing(animation, {  
                    toValue: 1,  
                    duration: 1000,  
                    useNativeDriver: true,  
                }),  
                Animated.timing(animation, {  
                    toValue: 0,  
                    duration: 1000,  
                    useNativeDriver: true,  
                }),  
            ]),  
        ).start();  
    };  

    const scaleAnimation = animation.interpolate({  
        inputRange: [0, 1],  
        outputRange: [1, 1.2],  
    });  

    return (  
        <View style={styles.container}>  
            <ScrollView style={styles.scrollContainer}>  
                <View style={styles.header}>  
                    <AppText fontSize={30} style={styles.title}>My Blog</AppText>  
                    <TouchableOpacity onPress={animate}>  
                        <Animated.View style={{ transform: [{ scale: scaleAnimation }] }}>  
                            <Icon name="pencil" size={30} color="#000" />  
                        </Animated.View>  
                    </TouchableOpacity>  
                </View>  
                
                <View style={styles.blogPost}>  
                    <AppText fontSize={20} style={styles.postTitle}>Post Title 1</AppText>  
                    <AppText style={styles.postContent}>This is the content of the first blog post. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</AppText>  
                </View>  
                
                <View style={styles.blogPost}>  
                    <AppText fontSize={20} style={styles.postTitle}>Post Title 2</AppText>  
                    <AppText style={styles.postContent}>This is the content of the second blog post. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</AppText>  
                </View>  
                
                {/* More blog posts can be added here */}  
            </ScrollView>  
        </View>  
    );  
};  

const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
        padding: 20,  
        backgroundColor: '#fff',  
    },  
    scrollContainer: {  
        flex: 1,  
    },  
    header: {  
        flexDirection: 'row',  
        alignItems: 'center',  
        justifyContent: 'space-between',  
        marginBottom: 20,  
    },  
    title: {  
        fontWeight: 'bold',  
    },  
    blogPost: {  
        marginBottom: 20,  
        padding: 10,  
        borderWidth: 1,  
        borderColor: '#ccc',  
        borderRadius: 5,  
    },  
    postTitle: {  
        fontWeight: 'bold',  
        marginBottom: 10,  
    },  
    postContent: {  
        color: '#666',  
    },  
});  

export default BlogPage;  