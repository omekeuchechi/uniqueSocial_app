import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const Practice = () => {
    return (
        <View style={styles.container}>
            <Text>Login Screen</Text>
            <View style={styles.box1}>
                <Text>
                    red
                </Text>
            </View>
            <View style={styles.box2}>
                <Text>
                    blue
                </Text>
            </View>
            <View style={styles.box3}>
                <Text style={{ color: '#fff' }}>
                    blue
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow',
    },
    text: {
        fontSize: 20,
        color: 'white',
        backgroundColor: 'black',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10
    },
    box1: {
        flex: 1,
        padding: 10,
        backgroundColor: 'red'
    },
    box2: {
        flex: 6,
        padding: 10,
        backgroundColor: 'blue'
    },
    box3: {
        flex: 1,
        padding: 10,
        backgroundColor: 'green'
    }
})