import React, { useState } from 'react';  
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';  
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';  
import AppText from '../components/appText';  // Import your custom AppText  

const countries = [  
    { id: '1', name: 'United States' },  
    { id: '2', name: 'United Kingdom' },  
    { id: '3', name: 'Afghanistan' },  
    { id: '4', name: 'Albania' },  
    { id: '5', name: 'Algeria' },  
    { id: '6', name: 'American Samoa' },  
    { id: '7', name: 'Andorra' },  
    { id: '8', name: 'Angola' },  
    { id: '9', name: 'Anguilla' },  
    { id: '10', name: 'Antarctica' },  
    { id: '11', name: 'Antigua and Barbuda' },  
    // Add more countries as needed  
];  

const CountrySelection = ({ navigation }) => {  
    const [selectedCountry, setSelectedCountry] = useState(null);  

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
            <SafeAreaView style={styles.container}>  
                <AppText fontSize={24} style={styles.header}>Select Country</AppText>   
                <FlatList  
                    data={countries}  
                    renderItem={renderItem}  
                    keyExtractor={item => item.id}  
                    style={styles.list}  
                />  
                {selectedCountry && (  
                    <TouchableOpacity  
                        style={styles.button}  
                        onPress={() => navigation.navigate('NextScreen', { country: selectedCountry })}  
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
});  

export default CountrySelection;