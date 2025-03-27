import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';

const ThreeDotNav = ({ title, dotColor, menuOptions, onPress }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.menuIcon}>
                <View style={[styles.dot, { backgroundColor: dotColor }]} />
                <View style={[styles.dot, { backgroundColor: dotColor }]} />
                <View style={[styles.dot, { backgroundColor: dotColor }]} />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalView}>
                    <FlatList
                        data={menuOptions}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => {
                                setModalVisible(false);
                                // Handle option press
                                console.log(item.key);
                            }}>
                                <Text style={styles.menuItem} onPress={onPress}>{item.key}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.key}
                    />
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};


const styles = StyleSheet.create({  
    container: {  
        flexDirection: 'row',  
        justifyContent: 'space-between',  
        alignItems: 'center',  
        padding: 20,  
    },  
    title: {  
        fontSize: 20,  
        fontWeight: 'bold',
        color: '#FFFFFF',  
    },  
    menuIcon: {  
        padding: 5,  
    },  
    dot: {  
        width: 8,  
        height: 8,  
        backgroundColor: 'black',  
        borderRadius: 4,  
        marginVertical: 2,  
    },  
    modalView: {  
        margin: 20,  
        backgroundColor: '#fffffff9',
        borderRadius: 10,  
        padding: 20,  
        shadowColor: '#000',  
        shadowOffset: { width: 0, height: 2 },  
        shadowOpacity: 0.25,  
        shadowRadius: 4,  
        elevation: 5,  
    },  
    menuItem: {  
        padding: 15,  
        fontSize: 16,  
    },  
    closeButton: {  
        marginTop: 10,  
        padding: 10,  
        backgroundColor: '#2196F3',  
        borderRadius: 5,  
        alignItems: 'center',  
    },  
    closeButtonText: {  
        color: 'white',  
        fontWeight: 'bold',  
    },  
});  

export default ThreeDotNav;  