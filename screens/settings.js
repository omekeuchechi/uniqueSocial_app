import React, { useState } from 'react';
import { View, StyleSheet, Button, Linking } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';  

const SettingsPage = ({ navigation }) => {
    //this path is were i set the default fontsize of the app
   const [fontSize, setFontSize] = useState(16);

  const decreaseFontSize = () => {
    if (fontSize > 10) {
      setFontSize(fontSize - 2);
    }
  };

  const increaseFontSize = () => {
    if (fontSize < 24) {
      setFontSize(fontSize + 2);
    }
  };

  const rateUs = () => {
    Linking.openURL('https://your-app-store-link.com');
  };

  const logOut = () => {
    console.log('Logging out...');
  };

  return (
    <View style={styles.container}>
      <Button title="Reduce Font Size" onPress={decreaseFontSize} />
      <Button title="Increase Font Size" onPress={increaseFontSize} />
      <Button title="Rate Us ⭐⭐⭐⭐⭐" onPress={rateUs} />
      <Button title="Log Out 🚪" color="red" onPress={logOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});

export default SettingsPage;