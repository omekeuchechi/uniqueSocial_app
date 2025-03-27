import React, { useState } from 'react';  
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';  
import AppText from './appText';  
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const UpdateProfileTabBar = () => {  
  const [activeTab, setActiveTab] = useState('ChangeProfiles');  


  const [selectedImage, setSelectedImage] = useState(null);

  const tabs = ['Profiles', 'Password', 'Avatar']; 
  
  const handleImageSelection = (event) => {
    const selectedFile = event.nativeEvent.target.files[0];
    setSelectedImage(selectedFile);
  };

  // Dummy content for each tab  
  const renderContent = () => {  
    switch (activeTab) {  
      case 'Profiles':  
        return <View>
          <AppText>Content for Followers</AppText>
        </View>;  
      case 'Password':  
        return <View>
          <AppText>Content for Comments tab</AppText>
        </View>;  
      case 'Avatar':  
        return <View>
          <Image style={styles.avatar}
          source={require('../assets/img/icons8-user-100.png')}
          />

          <View style={styles.profileCard}>
            <View style={styles.card}>
              <AppText style={{ color: '#000',fontWeight: 900 }} fontSize={20}>Choose from Gallery</AppText>
              <AppText style={{ color: '#000',fontWeight: 200 }} fontSize={13}>Select a photo from</AppText>
            </View>
            <TouchableOpacity style={[styles.button, styles.center, {marginRight: 10}]}>
                  <FontAwesome name="angle-right" size={30} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileCard}>
            <View style={styles.card}>
              <AppText style={{ color: '#000',fontWeight: 900 }} fontSize={20}>Take a Photo</AppText>
              <AppText style={{ color: '#000',fontWeight: 200 }} fontSize={13}>Use your camera to take a picture</AppText>
            </View>
            <TouchableOpacity style={[styles.button, styles.center, {marginRight: 10}]}>
              <TextInput placeholder='add' keyboardType='file' />
                  <FontAwesome name="angle-right" size={30} color="#000" />
            </TouchableOpacity>
          </View>

        </View>;  
      default:  
        return null;  
    }  
  };  

  return (  
    <View>  
      <View style={styles.tabContainer}>  
        {tabs.map((tab) => (  
          <TouchableOpacity  
            key={tab}  
            style={styles.tab}  
            onPress={() => setActiveTab(tab)}  
          >  
            <AppText  
              style={[  
                styles.tabText,  
                activeTab === tab && styles.activeTabText,  
              ]}  
            >  
              {tab}  
            </AppText>  
            {activeTab === tab && <View style={styles.activeTabIndicator} />}  
          </TouchableOpacity>  
        ))}  
      </View>  
      <View style={styles.contentContainer}>{renderContent()}</View>  
    </View>  
  );  
};  

const styles = StyleSheet.create({  
  tabContainer: {  
    flexDirection: 'row',  
    justifyContent: 'space-around',  
    borderBottomWidth: 1,  
    borderBottomColor: '#ddd',  
  },  
  tab: {  
    flex: 1,  
    alignItems: 'center',  
    paddingVertical: 10,  
  },  
  tabText: {  
    fontSize: 16,  
    fontWeight: '500',  
    color: '#333',  
  },  
  activeTabText: {  
    fontWeight: 'bold',  
  },  
  activeTabIndicator: {  
    position: 'absolute',  
    bottom: -1,  
    left: 0,  
    right: 0,  
    height: 2,  
    backgroundColor: 'blue',  
  },  
  contentContainer: {  
    padding: 20,  
  },  
  profileCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
  },
  card: {
    width: '70%',
    padding: 10,
    borderRadius: 10
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 50,
  },
});  

export default UpdateProfileTabBar;  