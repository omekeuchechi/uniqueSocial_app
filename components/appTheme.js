import React from 'react';
import {
    useColorScheme,
    View,
    StatusBar
} from 'react-native';


const AppTheme = ({children}) => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
};
    return (
        <View style={{backgroundColor: isDarkMode ? 'black' : 'white'}}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
            {children}
        </View>
    )
}