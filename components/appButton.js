import React from 'react';  
import { TouchableOpacity, StyleSheet } from 'react-native';
import AppText from './appText';

const AppButton = ({style, children, onPress, titleStyle}) => {
    
   const button = {  
        backgroundColor: '#007BFF', // Background color  
        padding: 10,  
        borderRadius: 5,  
        alignItems: 'center',  
    };
    
    return (  
      <TouchableOpacity style={StyleSheet.flatten([button, style])} onPress={onPress}>  
        <AppText style={titleStyle}>{children}</AppText>  
      </TouchableOpacity>
    );  
  };  
    
  
  export default AppButton;