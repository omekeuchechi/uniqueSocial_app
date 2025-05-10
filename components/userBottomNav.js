import React, { useState } from 'react';  
import { View, StyleSheet, Pressable } from 'react-native';  
import FontAwesome from 'react-native-vector-icons/FontAwesome';  

const UserBottomNav = ({ navigation, userTabData, user, token }) => {  
  const [activeIndex, setActiveIndex] = useState(null);  

  const handlePress = (index, route) => {  
    setActiveIndex(index);  
    navigation.navigate(route, { user, token });  
  };  

  return (  
    <View style={styles.bottomTab}>  
      {userTabData.map((item, index) => (  
        <Pressable  
          key={index}  
          onPress={() => handlePress(index, item.route)}  
        >  
          <FontAwesome  
            name={item.icon}  
            size={24}  
            color={activeIndex === index ? '#ffd700' : '#fff'}
          />  
        </Pressable>  
      ))}  
    </View>  
  );  
};  

const styles = StyleSheet.create({  
  bottomTab: {  
    flexDirection: 'row',  
    justifyContent: 'space-around',  
    alignItems: 'center',  
    backgroundColor: '#0056b3',  
    paddingVertical: 10,  
    position: 'absolute',  
    bottom: 0,  
    width: '100%',  
  },  
});  

export default UserBottomNav;  