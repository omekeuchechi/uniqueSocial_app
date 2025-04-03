import React, { userState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import AppText from '../components/appText';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppButton from '../components/appButton';

const EditUserName = ({ navigation, route }) => {
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <ScrollView style={{marginVertical: 100}}>
                    <View style={[styles.container]}>
                        <View style={styles.header}>
                            {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                                <FontAwesome name="angle-left" size={30} color="#000" />
                            </TouchableOpacity> */}
                            <AppText fontSize={20} style={[styles.headerText]}>Edit UserName</AppText>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Enter your new username"
                                style={styles.input}
                            />
                        </View>
                        <AppButton style={styles.button} titleStyle={{ color: '#fff', fontSize: 20 }} onPress={() => navigation.navigate('Register')}>Save</AppButton>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

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
        color: '#000',
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
        backgroundColor: 'blue',
        borderRadius: 5,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default EditUserName;