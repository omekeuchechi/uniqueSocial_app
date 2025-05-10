import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import {
  SafeAreaView,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { SelectList } from 'react-native-dropdown-select-list';

import AppText from '../components/appText';
import AppButton from '../components/appButton';
import baseUrl from '../components/url';

const countries = {
  US: { name: 'United States', pattern: '+1' },
  UK: { name: 'United Kingdom', pattern: '+44' },
  CA: { name: 'Canada', pattern: '+1' },
  AU: { name: 'Australia', pattern: '+61' },
  IN: { name: 'India', pattern: '+91' },
  DE: { name: 'Germany', pattern: '+49' },
  FR: { name: 'France', pattern: '+33' },
  IT: { name: 'Italy', pattern: '+39' },
  ES: { name: 'Spain', pattern: '+34' },
  BR: { name: 'Brazil', pattern: '+55' },
  JP: { name: 'Japan', pattern: '+81' },
  CN: { name: 'China', pattern: '+86' },
  RU: { name: 'Russia', pattern: '+7' },
  MX: { name: 'Mexico', pattern: '+52' },
  KR: { name: 'South Korea', pattern: '+82' },
  ZA: { name: 'South Africa', pattern: '+27' },
  NG: { name: 'Nigeria', pattern: '+234' },
  PH: { name: 'Philippines', pattern: '+63' },
  AR: { name: 'Argentina', pattern: '+54' },
  TR: { name: 'Turkey', pattern: '+90' },
};

const countryList = Object.entries(countries).map(([key, value]) => ({
  key,
  value: value.name,
}));

const EditPhone = ({ navigation, route }) => {
  const { userData, tokenData } = route.params;

  const [selectedCountryKey, setSelectedCountryKey] = useState('US');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handlePhoneNumberUpdate = () => {
    if (phone.trim() === '') {
      setError('This field is required');
      return;
    }

    const fullPhoneNumber = `${countries[selectedCountryKey].pattern} ${phone.trim()}`;

    const phoneNumberData = {
      phoneNumber: fullPhoneNumber,
    };

    fetch(`${baseUrl}/user/profile`, {
      method: 'PATCH',
      headers: {
        authorization: tokenData,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(phoneNumberData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (
          data.status === 200 ||
          data.message === 'User profile updated successfully'
        ) {
          setPhone('');
          setError('');
          setMsg('Phone number updated successfully ✔!');
        } else {
          setError(data.message || 'Failed to update phone number');
        }
      })
      .catch((err) => {
        console.error('Error updating phone:', err);
        setError('An error occurred. Please try again.');
      });
  };

  useEffect(() => {
    if (msg !== '') {
      const timer = setTimeout(() => setMsg(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  useEffect(() => {
    if (error !== '') {
      const timer = setTimeout(() => setError(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.inner}>
          {msg !== '' && <Text style={styles.message}>{msg}</Text>}
          {error !== '' && <Text style={styles.error}>{error}</Text>}

          <AppText style={styles.label}>Select Country</AppText>
          <SelectList
            setSelected={setSelectedCountryKey}
            data={countryList}
            save="key"
            placeholder="Select Country"
            defaultOption={{ key: 'US', value: 'United States' }}
            boxStyles={styles.dropdown}
          />

          <AppText style={styles.label2}>Phone Number</AppText>
          <View style={styles.phoneContainer}>
            <Text style={styles.countryCode}>
              {countries[selectedCountryKey].pattern}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <AppButton
            titleStyle={{ color: '#fff', fontSize: 20 }}
            onPress={() => {
              handlePhoneNumberUpdate();
              console.log(
                `${countries[selectedCountryKey].pattern} ${phone}`
              );
            }}
          >
            Submit
          </AppButton>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    padding: 20,
  },
  message: {
    color: 'green',
    marginBottom: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: '#c4e1c4',
    borderColor: 'green',
  },
  error: {
    color: '#fff',
    borderWidth: 1,
    padding: 10,
    elevation: 2,
    backgroundColor: '#c78585',
    borderColor: 'red',
    borderRadius: 5,
    marginBottom: 10,
  },
  label: {
    marginTop: 40,
    marginBottom: -20,
    fontSize: 20,
    color: '#0056b3',
  },
  label2: {
    marginTop: 10,
    marginBottom: 12,
    fontSize: 20,
    color: '#0056b3',
  },
  dropdown: {
    borderColor: '#ccc',
    borderWidth: 2,
    marginTop: 30,
    marginBottom: 20,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  countryCode: {
    marginRight: 10,
    fontSize: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 10,
  },
});

export default EditPhone;