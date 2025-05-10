import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, StatusBar } from 'react-native';
import AppText from '../components/appText';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppButton from '../components/appButton';
import Error from '../components/error';
import baseUrl from '../components/url';

const EditUserName = ({ navigation, route }) => {
  const { userData, tokenData } = route.params;

  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // This path it clear message after 2 seconds
  useEffect(() => {
    if (msg !== '') {
      const timer = setTimeout(() => {
        setMsg('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  const handleUserNameUpdate = () => {
    if (userName.trim() === '') {
      setError('This field is required');
      return;
    }

    const userNameData = {
      name: userName.trim(),
    };

    fetch(`${baseUrl}/user/profile`, {
      method: 'PATCH',
      headers: {
        'authorization': tokenData,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userNameData),
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 200 || data.message === "User profile updated successfully") {
          setUserName('');
          setError('');
          setMsg('Username updated successfully ✔!');
        } else {
          setError(data.message || 'Failed to update username');
        }
      })
      .catch(err => {
        console.error('Error updating username:', err);
        setError('An error occurred. Please try again.');
      });
  };

  const reloadScreen = () => {
    navigation.replace('EditUserName', { userData, tokenData });
  };
  

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#0056b3" barStyle="light-content" />
      <SafeAreaView>
        <ScrollView contentContainerStyle={{ marginVertical: 100 }}>
          <View style={styles.container}>
            {msg !== '' && (
              <AppText style={styles.successMsg}>{msg}</AppText>
            )}
            <View style={styles.header}>
              {/* Optional back button */}
              {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <FontAwesome name="angle-left" size={30} color="#000" />
              </TouchableOpacity> */}
              <AppText fontSize={20} style={styles.headerText}>Edit UserName</AppText>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Enter your new username"
                style={styles.input}
                value={userName}
                onChangeText={(text) => setUserName(text.trim().toLowerCase())}
              />
            </View>
            <AppButton
              style={styles.button}
              titleStyle={{ color: '#fff', fontSize: 20 }}
              onPress={handleUserNameUpdate}
            >
              Save
            </AppButton>
            <TouchableOpacity onPress={reloadScreen} style={styles.reloadButton}>
                <FontAwesome name="refresh" size={20} color="#fff" />
                <AppText style={{ color: 'white', marginLeft: 5 }}>Reload</AppText>
            </TouchableOpacity>

            {error && userName.trim() === '' && (
              <Error message={error} style={{ color: 'red', fontSize: 15 }} />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    color: '#0056b3',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0056b3',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
  },
  successMsg: {
    color: 'green',
    fontSize: 16,
    marginBottom: 10,
    alignSelf: 'center',
  },
});

export default EditUserName;