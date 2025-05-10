import React, { useState } from 'react';  
import {  
    View,  
    SafeAreaView,  
    ScrollView,  
    StyleSheet,  
    Pressable,  
    StatusBar,
    TextInput,  // Import StatusBar  
} from 'react-native';  
import AppText from '../../components/appText';  
import FontAwesome from 'react-native-vector-icons/FontAwesome';  
import ThreeDotNav from '../../components/threeDot';  
import { SafeAreaProvider } from 'react-native-safe-area-context';  

const AdminDashboard = ({ navigation, route }) => {  
    const [user, setUser] = useState(route.params.user);  
    const [isAdmin, setIsAdmin] = useState(user.isAdmin);  
    const [token, setToken] = useState(null);  

    const post = {
        category: 'Faith',
        content: 'This is a test post',
        userId: user.id
    }

    const handleCreatePost = () => {
        fetch(`${baseUrl}/post/create`, {
            method: 'POST',
            body : JSON.stringify(post),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()).then((json) => {
            console.log(json);
            if (json.status === 'success') {
                console.log('Post created successfully!');
            } else {
                console.log('Failed to create post:', json.message);
            }
        }).catch((error) => {
            console.error('Error:', error);
        })
    }

    return (  
        <SafeAreaProvider style={{ backgroundColor: '#f0f4f8' }}> {/* Light background to contrast cards */}  
            <StatusBar backgroundColor="#0056b3" barStyle="light-content" /> {/* Darker blue for status bar */} 
            <View style={styles.formModal}>
                <AppText>Create Post</AppText>
                <TextInput placeholder='Enter post category' style={styles.categoryArea}/>
                <TextInput multiline={true}  placeholder='Enter post content' style={styles.contentArea}/>              
            </View>
            <SafeAreaView style={styles.container}> 
            <View style={styles.header}>  
                    <Pressable onPress={() => navigation.navigate('AdminDashboard')} style={styles.menuIcon}>  
                        <FontAwesome name="bars" size={20} color="#fff" />  
                    </Pressable>  
                    <AppText style={styles.headerText}>Welcome back Admin</AppText>  
                    {/*<ThreeDotNav navigation={navigation} />*/}  
                </View>  
                <ScrollView contentContainerStyle={styles.scrollContainer}>  
                    <View style={styles.greetingContainer}>  
                        <AppText style={styles.greetingText}>{user.name}</AppText>  
                        <AppText style={styles.subText}>Explore the dashboard</AppText>  
                    </View>  
                    <View style={styles.cardContainer}>  
                        <Pressable style={styles.card} onPress={() => { /* Navigate to another screen */ }}>  
                            <FontAwesome name="bar-chart" size={50} color="#0056b3" />  
                            <AppText style={styles.cardText}>View Analytics</AppText>  
                        </Pressable>  
                        <Pressable style={styles.card} onPress={() => { /* Navigate to another screen */ }}>  
                            <FontAwesome name="users" size={50} color="#0056b3" />  
                            <AppText style={styles.cardText}>Manage Users</AppText>  
                        </Pressable>  
                    </View>  
                    <View style={styles.cardContainer}>  
                        <Pressable style={styles.card} onPress={() => { /* Navigate to another screen */ }}>  
                            <FontAwesome name="cogs" size={50} color="#0056b3" />  
                            <AppText style={styles.cardText}>Settings</AppText>  
                        </Pressable>  
                        <Pressable style={styles.card} onPress={() => { /* Navigate to another screen */ }}>  
                            <FontAwesome name="file-text" size={50} color="#0056b3" />  
                            <AppText style={styles.cardText}>Reports</AppText>  
                        </Pressable>  
                    </View>  
                </ScrollView>
                
                {/* Bottom tab bar with icons */}  
                <View style={styles.bottomTab}>  
                    <Pressable onPress={() => navigation.navigate('Home')}>  
                        <FontAwesome name="home" size={24} color="#fff" />  
                    </Pressable>  
                    <Pressable onPress={handleCreatePost}>  
                        <FontAwesome name="plus" size={24} color="#fff" />  
                    </Pressable>  
                    <Pressable onPress={() => { /* Handle comment icon action */ }}>  
                        <FontAwesome name="comment" size={24} color="#fff" />  
                    </Pressable>  
                    <Pressable onPress={() => { /* Handle bucket icon action */ }}>  
                        <FontAwesome name="trash" size={24} color="#fff" />  
                    </Pressable>  
                </View>  
            </SafeAreaView>  
        </SafeAreaProvider>  
    );  
}  

const styles = StyleSheet.create({  
    container: {   
        flex: 1,
        backgroundColor: '#f0f4f8',  
    },  
    formModal: {
        flex: 14,
        display: 'visible',
        borderWidth: 2,
        backgroundColor: '#f0f4f8',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentArea: {
        height: 100,
        width: '80%',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    categoryArea: {
        width: '80%',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5
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
    menuIcon: {  
        marginRight: 10,  
    },  
    headerText: { 
        flex: 1,   
        textAlign: 'center',  
        fontSize: 20,  
        fontWeight: 'bold',  
        color: '#fff',
    },  
    scrollContainer: {  
        padding: 16
    },  
    greetingContainer: {  
        marginBottom: 20,  
    },  
    greetingText: {  
        fontSize: 24,  
        fontWeight: 'bold',  
        color: '#333',
    },  
    subText: {  
        fontSize: 16,  
        color: '#666', 
    },  
    cardContainer: {  
        flexDirection: 'row',  
        justifyContent: 'space-between',  
        flexWrap: 'wrap',  
    },  
    card: {
        flex: 1,  
        backgroundColor: '#fff',  
        padding: 16,  
        borderRadius: 8,  
        marginBottom: 10,  
        elevation: 3,  
        shadowColor: '#000',  
        shadowOffset: { width: 0, height: 1 },  
        shadowOpacity: 0.2,  
        shadowRadius: 1.5,  
        marginHorizontal: 5,  
    },  
    cardText: {  
        fontSize: 16,  
        textAlign: 'center',  
        fontWeight: 'bold',  
        color: '#0056b3',  
        marginTop: 8, 
    },  
    bottomTab: {  
        height: 60,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderColor: '#404040',
        backgroundColor: '#0056b3',
        flexDirection: 'row',  
        justifyContent: 'space-around',  
        alignItems: 'center',  
    },  
});  

export default AdminDashboard;  