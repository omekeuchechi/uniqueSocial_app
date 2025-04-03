import React, { useState } from 'react';  
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView } from 'react-native';  
import AppText from './appText';  
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FilePickerManager from 'react-native-file-picker';

const UpdateProfileTabBar = ({ navigation }) => {  
  const [activeTab, setActiveTab] = useState('Account');  

  // const renderNavigation = navigation.navigate('Welcome');
  const [renderNavigation, setRenderNavigation] = useState(navigation);

  const [selectedImage, setSelectedImage] = useState(null);

  const tabs = ['Account', 'Settings', 'Avatar'];
  
  const handleImageSelection = (event) => {
    const selectedFile = event.nativeEvent.target.files[0];
    setSelectedImage(selectedFile);
  };

  // const handleImageUpload = () => {
    // FilePickerManager.showFilePicker(null, (response) => {
    //   console.log('Response = ', response);

    //   if (response.didCancel) {
    //     console.log('User cancelled file picker');
    //   }
    //   else if (response.error) {
    //     console.log('FilePickerManager Error: ', response.error);
    //   }
    //   else {
    //     this.setState({
    //       file: response
    //     });
    //   }
    // });
  // }

  // Dummy content for each tab  
  const renderContent = () => {  
    switch (activeTab) {  
      case 'Account':  
        return <View>
          <View>
            <AppText style={styles.firstText} fontSize={14}>Manage your personal and login information here</AppText>
          </View>
          <View>
            <AppText fontSize={14} style={{ color: '#a09999' }}>Personal information</AppText>
            <View style={styles.card}>
              <View style={[styles.inerCard, {flexDirection: 'row', justifyContent: 'space-between'}]}>
                <AppText fontSize={14} style={styles.UserText}>Username</AppText>
                <AppText fontSize={14} style={{ position: 'relative', left: 50 }}>omekejoseph</AppText>
                <TouchableOpacity style={[styles.button]} onPress={() => renderNavigation.navigate('EditUserName')}>
                <FontAwesome name="pencil" size={20} color="#000" />
                </TouchableOpacity>
              </View>
              <View style={styles.inerCard}>
                <AppText fontSize={14} style={styles.UserText}>Phone</AppText>
                <TouchableOpacity style={[styles.button, styles.cardBtn]} onPress={() => renderNavigation.navigate('EditPhone')}>
                <AppText fontSize={14}>+2349031592480</AppText>
                  <FontAwesome name="angle-right" size={30} color="#000" />
                </TouchableOpacity>
              </View>
              <View style={styles.inerCard}>
                <AppText fontSize={14} style={styles.UserText}>Birthday</AppText>
                <TouchableOpacity style={[styles.button, styles.cardBtn]} onPress={() => renderNavigation.navigate('DataOfBirth')}>
                <AppText fontSize={14}>Novermber 17 2015</AppText>
                  <FontAwesome name="angle-right" size={30} color="#000" />
                </TouchableOpacity>
              </View>
              <View style={styles.inerCard}>
                <AppText fontSize={14} style={styles.UserText}>Country</AppText>
                <TouchableOpacity style={[styles.button, styles.cardBtn]} onPress={() => renderNavigation.navigate('CountrySelection')}>
                <AppText fontSize={14}>Nigeria</AppText>
                  <FontAwesome name="angle-right" size={30} color="#000" />
                </TouchableOpacity>
              </View>
              <View style={styles.inerCardLast}>
                <AppText fontSize={14} style={styles.UserText}>City</AppText>
                <TouchableOpacity style={[styles.button, styles.cardBtn]}>
                <AppText fontSize={14}>Port Harcourt</AppText>
                  <FontAwesome name="angle-right" size={30} color="#000" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
            <AppText fontSize={14}>Login information</AppText>
          <View style={styles.card}>
            {/* this path is for login details */}
            <View style={styles.inerCard}>
              <AppText fontSize={14} style={styles.UserText}>Email</AppText>
              <TouchableOpacity style={[styles.button, styles.cardBtn]}>
              <AppText fontSize={14}>omekejoseph@gmail.com</AppText>
                <FontAwesome name="angle-right" size={30} color="#000" />
              </TouchableOpacity>
            </View>
            <View style={styles.inerCardLast}>
              <AppText fontSize={14} style={styles.UserText}>Update password</AppText>
              <TouchableOpacity style={[styles.button, styles.cardBtn]}>
              <AppText fontSize={14}>************</AppText>
                <FontAwesome name="angle-right" size={30} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>;  
      case 'Settings':  
        return <View>
          <AppText>Content for Comments tab</AppText>
        </View>;  
      case 'Avatar':  
        return <View>
          <Image style={styles.avatar}
          source={require('../assets/img/icons8-user-100.png')}
          />

          <View style={styles.profileCard}>
            <View style={styles.cardAvatar}>
              <AppText style={{ color: '#000',fontWeight: 900 }} fontSize={20}>Choose from Gallery</AppText>
              <AppText style={{ color: '#979494',fontWeight: 200 }} fontSize={13}>Select a photo from phone</AppText>
            </View>
            <TouchableOpacity style={[styles.button, styles.center, {marginRight: 10}]}>
                  <FontAwesome name="angle-right" size={30} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileCard}>
            <View style={styles.cardAvatar}>
              <AppText style={{ color: '#000',fontWeight: 900 }} fontSize={20}>Take a Photo</AppText>
              <AppText style={{ color: '#979494',fontWeight: 200 }} fontSize={13}>Use your camera to take a picture</AppText>
            </View>
            <TouchableOpacity style={[styles.button, styles.center, {marginRight: 10}]}>
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
      <View>
          <ScrollView style={styles.contentContainer}>
          {renderContent()}
          </ScrollView> 
      </View>  
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
    backgroundColor: '#fff',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 50,
  },
  firstText: {
    color: '#6b6969',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  UserText: {
    color: '#000',
    fontWeight: 'bold',
  },
  card: {
    width: '113%',
    padding: 10,
    marginVertical: 10,
    position: 'relative',
    left: -20,
    backgroundColor: '#fff',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 5,
  },
  cardAvatar: {
    padding: 10,
    marginVertical: 3,
    backgroundColor: '#fff',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 5,
  },
  inerCard: {
    paddingHorizontal: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  inerCardLast: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  cardBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});  

export default UpdateProfileTabBar;  