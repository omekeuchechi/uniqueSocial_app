import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  Animated,
  ActivityIndicator,
  StatusBar,
  PanResponder,
} from 'react-native';

import AppText from '../components/appText';
import TabBar from '../components/profileTabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import baseUrl from '../components/url';
import UserBottomNav from '../components/userBottomNav';

const Home = ({ navigation, route }) => {
  const [user] = useState(route.params.user);
  const [token] = useState(route.params.token);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [headerHidden, setHeaderHidden] = useState(false);

  const userTabData = [
    { route: 'BlogPage', icon: 'home' },
    { route: 'UpdateProfile', icon: 'user' },
    { route: 'SettingsPage', icon: 'gear' },
  ];

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

  const headerY = useRef(new Animated.Value(0)).current;

  // PanResponder: only allow drag down if header is hidden, otherwise no drag up
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only allow gesture if dragging down or header is hidden
        if (gestureState.dy > 0 || headerHidden) {
          return true;
        }
        // Prevent drag if moving up and header is visible
        return false;
      },
      onPanResponderMove: (_, gestureState) => {
        // Only allow dragging down if header is hidden
        if (gestureState.dy > 0 || headerHidden) {
          headerY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50 && headerHidden) {
          // Dragged down enough to reveal header
          Animated.timing(headerY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            setHeaderHidden(false);
          });
        } else {
          // Snap back if not enough pull
          Animated.spring(headerY, {
            toValue: headerHidden ? -150 : 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#0056b3" barStyle="light-content" />
      <ScrollView>
        {/* Draggable header */}
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.header,
            {
              transform: [{ translateY: headerY }],
            },
          ]}
        >
          <View style={styles.headerContent}>
            <Pressable onPress={() => navigation.navigate('Options')}>
              <FontAwesome name="bars" size={20} color="#fff" />
            </Pressable>
            <AppText style={styles.headerText}>Welcome, {user.name}</AppText>
            <Pressable onPress={() => navigation.navigate('UpdateProfile', {user, token})}>
              <FontAwesome name="user" size={20} color="#fff" />
            </Pressable>
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.greetingContainer}>
            <Image source={require('../assets/img/pro.png')} style={styles.profileImg} />
            <AppText fontSize={24} style={styles.greetingText}>{user.name}</AppText>
            <AppText fontSize={16} style={styles.subText}>Explore your dashboard</AppText>
          </View>

          {/* Your posts and other content here */}


          <TabBar />
        </Animated.View>
      </ScrollView>
      <UserBottomNav navigation={navigation} userTabData={userTabData} user={user} token={token} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  header: {
    height: 100,
    backgroundColor: '#0056b3',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    position: 'relative',
    zIndex: 10,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  greetingContainer: {
    marginBottom: 20,
    alignItems: 'center',
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
  profileImg: {
    width: 70,
    height: 70,
    borderWidth: 4,
    borderRadius: 40,
    borderColor: 'white',
    position: 'relative',
    alignSelf: 'center',
  },
  cardContainer: {
    paddingHorizontal: 20,
  },
  postCard: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
  },
});

export default Home;