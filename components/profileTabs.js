import React, { useState } from 'react';  
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';  
import AppText from './appText';  

const TabBar = () => {  
  const [activeTab, setActiveTab] = useState('About');  

  const tabs = ['Followers', 'Following', 'About'];  

  // Dummy content for each tab  
  const renderContent = () => {  
    switch (activeTab) {  
      case 'Followers':  
        return <AppText>Content for Followers</AppText>;  
      case 'Following':  
        return <AppText>Content for Comments tab</AppText>;  
      case 'About':  
        return <AppText>Who am i?, you may think am just a starter but am not just that, Enough of this crap let talk what i am or who am i, am a 10x programmer Who have develop website like clicker.ng, web-bros and Now trying to show you my potentials as a software developer that is who i am ASAP.</AppText>;  
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
});  

export default TabBar;  