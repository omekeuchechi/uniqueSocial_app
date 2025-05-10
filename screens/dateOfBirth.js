import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  StatusBar,
  TextInput,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { SelectList } from 'react-native-dropdown-select-list';
import AppText from '../components/appText';
import AppButton from '../components/appButton';
import baseUrl from '../components/url';

const DataOfBirth = ({ route }) => {
  const { tokenData } = route.params;

  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const days = Array.from({ length: 31 }, (_, i) => ({
    key: `${i + 1}`,
    value: `${i + 1}`,
  }));

  const months = [
    { key: '01', value: 'January' },
    { key: '02', value: 'February' },
    { key: '03', value: 'March' },
    { key: '04', value: 'April' },
    { key: '05', value: 'May' },
    { key: '06', value: 'June' },
    { key: '07', value: 'July' },
    { key: '08', value: 'August' },
    { key: '09', value: 'September' },
    { key: '10', value: 'October' },
    { key: '11', value: 'November' },
    { key: '12', value: 'December' },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => ({
    key: `${currentYear - i}`,
    value: `${currentYear - i}`,
  }));

  const handleDateOfBirthUpdate = () => {
    if (!selectedDay || !selectedMonth || !selectedYear) {
      setError('All fields are required');
      return;
    }

    const formattedDOB = `${selectedMonth} ${selectedDay}, ${selectedYear}`;

    fetch(`${baseUrl}/user/profile`, {
      method: 'PATCH',
      headers: {
        'authorization': tokenData,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dateOfBirth: formattedDOB }),
    })
      .then((res) =>
        res.json().then((data) => ({ res, data }))
      )
      .then(({ res, data }) => {
        if (res.ok || data.status === 200 || data.message === 'User profile updated successfully') {
          setError('');
          setMsg('Date of birth updated successfully ✔!');
        } else {
          setError(data.message || 'Failed to update date of birth');
        }
      })
      .catch((err) => {
        console.error('Error updating DOB:', err);
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
      <StatusBar backgroundColor="#0056b3" barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {msg !== '' && <Text style={styles.message}>{msg}</Text>}
          {error !== '' && <Text style={styles.error}>{error}</Text>}

          <View style={styles.header}>
            <AppText fontSize={20} style={styles.headerText}>Edit Date of Birth</AppText>
          </View>

          <View style={styles.inputContainer}>
            <AppText style={styles.label}>Select Your Date of Birth</AppText>

            <SelectList
              data={months}
              setSelected={setSelectedMonth}
              placeholder="Month"
              boxStyles={styles.dropdown}
              dropdownTextStyles={styles.dropdownText}
            />

            <SelectList
              data={days}
              setSelected={setSelectedDay}
              placeholder="Day"
              boxStyles={styles.dropdown}
              dropdownTextStyles={styles.dropdownText}
            />

            <SelectList
              data={years}
              setSelected={setSelectedYear}
              placeholder="Year"
              boxStyles={styles.dropdown}
              dropdownTextStyles={styles.dropdownText}
            />
          </View>

          <TextInput
            style={styles.input}
            value={`${selectedMonth} ${selectedDay}, ${selectedYear}`}
            onChangeText={(text) => {
              const [month, day, year] = text.split(' ');
              setSelectedMonth(month);
              setSelectedDay(day.replace(',', ''));
              setSelectedYear(year);
            }}
            placeholder="Your selected date of birth"
          />

          <AppButton
            style={styles.button}
            titleStyle={{ color: '#fff', fontSize: 20 }}
            onPress={handleDateOfBirthUpdate}
          >
            Save
          </AppButton>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    paddingVertical: 50,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    color: '#a09999',
  },
  dropdown: {
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
  },
  dropdownText: {
    fontSize: 16,
  },
  input: {
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  message: {
    color: 'green',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default DataOfBirth;