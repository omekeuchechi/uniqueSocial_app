import React, { useRef, useState, useEffect } from 'react';  
import {  
  StyleSheet,  
  ScrollView,  
  View,  
  TouchableOpacity,  
  Animated,  
} from 'react-native';  
import { SafeAreaView } from 'react-native-safe-area-context';  
import AppText from '../components/appText'; // Your custom text component  
import Icon from 'react-native-vector-icons/FontAwesome';  
import UserBottomNav from '../components/userBottomNav'; // Your bottom nav component  
import baseUrl from '../components/url'; // Your backend URL  

// Replace with a proper token (or get from route params)  
const defaultToken = 'your-auth-token';  

const BlogPage = ({ navigation, route }) => {  
  const animation = useRef(new Animated.Value(0)).current;  
  const fadeAnim = useRef(new Animated.Value(0)).current;  
  const [user] = useState(route.params.user);
  const [token] = useState(route.params.token);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const executeFadeIn = () => {  
    Animated.timing(fadeAnim, {  
      toValue: 1,  
      duration: 1000,  
      useNativeDriver: true,  
    }).start();  
  };  

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
      ])  
    ).start();  
  };  

  const scaleAnimation = animation.interpolate({  
    inputRange: [0, 1],  
    outputRange: [1, 1.2],  
  });  

  const userTabData = [  
    { route: 'BlogPage', icon: 'home' },  
    { route: 'UpdateProfile', icon: 'user' },  
    { route: 'SettingsPage', icon: 'gear' },  
  ];  

  // Fetch posts on component mount  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

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
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token, fadeAnim]); 

  return (  
    <SafeAreaView style={styles.safeAreaContainer}>  
      <View style={styles.pageContainer}>  

        {/* Header section */}  
        <View style={styles.header}>  
          <AppText fontSize={30} style={styles.title}>My Blog</AppText>  
          <TouchableOpacity onPress={animate}>  
            <Animated.View style={{ transform: [{ scale: scaleAnimation }] }}>  
              <Icon name="pencil" size={30} color="#000" />  
            </Animated.View>  
          </TouchableOpacity>  
        </View>  

        {/* Blog Posts List */}  
        <ScrollView style={styles.scrollContainer}>  
          {loading ? (  
            <View style={styles.loadingContainer}>  
              <AppText>Loading...</AppText>  
            </View>  
          ) : error ? (  
            <View style={styles.loadingContainer}>  
                            <AppText>Error: {error}</AppText>
            </View>
          ) : (
            posts.length > 0 ? (
              posts.map((post, index) => (
                <View key={index} style={styles.blogPost}>
                  <AppText fontSize={20} style={styles.postTitle}>
                    {post.category || `Post Title ${index + 1}`}
                  </AppText>
                  <AppText style={styles.postContent}>{post.content || 'Blog post content...'}</AppText>
                </View>
              ))
            ) : (
              <View style={styles.loadingContainer}>
                <AppText>No posts found.</AppText>
              </View>
            )
          )}
          <View>
            <AppText fontSize={20} style={{ textAlign: 'center', marginTop: 20 }}>{user.name}</AppText>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNavContainer}>  
          <UserBottomNav navigation={navigation} userTabData={userTabData} />  
        </View>
      </View>
    </SafeAreaView>
  );
};

// Styles for your component
const styles = StyleSheet.create({  
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
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
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  bottomNavContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
});

export default BlogPage;