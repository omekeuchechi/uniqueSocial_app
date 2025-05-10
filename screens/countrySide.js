import React, { useState, useEffect } from 'react';  
import { View, 
    FlatList, 
    TouchableOpacity,
    Text,
    Image,
    TextInput,
    Pressable,
    StatusBar, 
    StyleSheet 
} from 'react-native';  
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';  
import AppText from '../components/appText';
import baseUrl from '../components/url';

const countries = [
    { id: '8', name: 'Algeria', img: 'https://flagcdn.com/dz.svg' },
    { id: '53', name: 'Brazil', img: 'https://flagcdn.com/br.svg' },
    { id: '24', name: 'Burkina Faso', img: 'https://flagcdn.com/bf.svg' },
    { id: '41', name: 'Burundi', img: 'https://flagcdn.com/bi.svg' },
    { id: '39', name: 'Cape Verde', img: 'https://flagcdn.com/cv.svg' },
    { id: '26', name: 'Chad', img: 'https://flagcdn.com/td.svg' },
    { id: '33', name: 'Equatorial Guinea', img: 'https://flagcdn.com/gq.svg' },
    { id: '3', name: 'Egypt', img: 'https://flagcdn.com/eg.svg' },
    { id: '46', name: 'England', img: 'https://flagcdn.com/gb.svg' },
    { id: '40', name: 'Eritrea', img: 'https://flagcdn.com/er.svg' },
    { id: '6', name: 'Ethiopia', img: 'https://flagcdn.com/et.svg' },
    { id: '47', name: 'France', img: 'https://flagcdn.com/fr.svg' },
    { id: '5', name: 'Ghana', img: 'https://flagcdn.com/gh.svg' },
    { id: '21', name: 'Gambia', img: 'https://flagcdn.com/gm.svg' },
    { id: '48', name: 'Germany', img: 'https://flagcdn.com/de.svg' },
    { id: '29', name: 'Guinea', img: 'https://flagcdn.com/gn.svg' },
    { id: '50', name: 'Spain', img: 'https://flagcdn.com/es.svg' },
    { id: '49', name: 'Italy', img: 'https://flagcdn.com/it.svg' },
    { id: '4', name: 'Kenya', img: 'https://flagcdn.com/ke.svg' },
    { id: '36', name: 'Liberia', img: 'https://flagcdn.com/lr.svg' },
    { id: '34', name: 'Lesotho', img: 'https://flagcdn.com/ls.svg' },
    { id: '25', name: 'Mali', img: 'https://flagcdn.com/ml.svg' },
    { id: '23', name: 'Madagascar', img: 'https://flagcdn.com/mg.svg' },
    { id: '7', name: 'Morocco', img: 'https://flagcdn.com/ma.svg' },
    { id: '17', name: 'Mozambique', img: 'https://flagcdn.com/mz.svg' },
    { id: '20', name: 'Namibia', img: 'https://flagcdn.com/na.svg' },
    { id: '1', name: 'Nigeria', img: 'https://flagcdn.com/ng.svg' },
    { id: '15', name: 'Rwanda', img: 'https://flagcdn.com/rw.svg' },
    { id: '13', name: 'Senegal', img: 'https://flagcdn.com/sn.svg' },
    { id: '35', name: 'Sierra Leone', img: 'https://flagcdn.com/sl.svg' },
    { id: '30', name: 'Somalia', img: 'https://flagcdn.com/so.svg' },
    { id: '2', name: 'South Africa', img: 'https://flagcdn.com/za.svg' },
    { id: '43', name: 'South Sudan', img: 'https://flagcdn.com/ss.svg' },
    { id: '10', name: 'Sudan', img: 'https://flagcdn.com/sd.svg' },
    { id: '37', name: 'Swaziland', img: 'https://flagcdn.com/sz.svg' },
    { id: '12', name: 'Tanzania', img: 'https://flagcdn.com/tz.svg' },
    { id: '9', name: 'Tunisia', img: 'https://flagcdn.com/tn.svg' },
    { id: '11', name: 'Uganda', img: 'https://flagcdn.com/ug.svg' },
    { id: '51', name: 'United States', img: 'https://flagcdn.com/us.svg' },
    { id: '16', name: 'Ivory Coast', img: 'https://flagcdn.com/ci.svg' },
    { id: '18', name: 'Zambia', img: 'https://flagcdn.com/zm.svg' },
    { id: '14', name: 'Zimbabwe', img: 'https://flagcdn.com/zw.svg' }
  ];
  

const CountrySelection = ({ navigation, route }) => {  
    const { userData, tokenData } = route.params;
    const [selectedCountry, setSelectedCountry] = useState('');
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');



    const handleCountryUpdate = () => {
        if (selectedCountry.trim() === '') {
            setError('This field is required');
            return;
        }

        // const fullPhoneNumber = `${countries[selectedCountryKey].pattern} ${phone.trim()}`;
    
        const countryData = { country: selectedCountry };

        fetch(`${baseUrl}/user/profile`, {
            method: 'PATCH',
            headers: {
                authorization: tokenData,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(countryData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200 || data.message === 'User profile updated successfully') {
                    setSelectedCountry('');
                    setError('');
                    setMsg('country updated successfully ✔!');
            } else {
              setError(data.message || 'Failed to update country');
            }
          })
          .catch((err) => {
            console.error('Error updating country:', err);
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

    const renderItem = ({ item }) => (  
        <TouchableOpacity  
            onPress={() => setSelectedCountry(item.name)}  
            style={[styles.item, selectedCountry === item.name && styles.selectedItem]}  
        >  
            <AppText fontSize={18}>{item.name}</AppText>  
        </TouchableOpacity>  
    );  

    return (  
        <SafeAreaProvider>
            <StatusBar backgroundColor="#0056b3" barStyle="light-content" />  
                {msg !== '' && <Text style={styles.message}>{msg}</Text>}
                {error !== '' && <Text style={styles.error}>{error}</Text>}
            <SafeAreaView style={styles.container}>  
                <AppText fontSize={24} style={styles.header}>Select Country</AppText>   
                <FlatList  
                    data={countries}  
                    renderItem={renderItem}  
                    keyExtractor={item => item.id}  
                    style={styles.list}  
                />  
                {selectedCountry && (<TextInput 
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}  
                    placeholder="Enter country"  
                    value={selectedCountry}  
                    onChangeText={setSelectedCountry}
                />)}
                {selectedCountry && (  
                    <TouchableOpacity  
                        style={styles.button}  
                        onPress={() => handleCountryUpdate()}  
                    >  
                        <AppText fontSize={18} style={styles.buttonText}>Next</AppText>  
                    </TouchableOpacity>  
                )}  
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
        fontWeight: 'bold',  
        marginBottom: 20,  
    },  
    list: {  
        flex: 1,  
    },  
    item: {  
        padding: 15,  
        borderBottomWidth: 1,  
        borderBottomColor: '#ccc',  
    },  
    selectedItem: {  
        backgroundColor: '#e0e0e0',  
    },  
    button: {  
        backgroundColor: 'blue',  
        padding: 15,  
        borderRadius: 5,  
        alignItems: 'center',  
        marginTop: 20,  
    },  
    buttonText: {  
        color: '#fff',  
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
});  

export default CountrySelection;