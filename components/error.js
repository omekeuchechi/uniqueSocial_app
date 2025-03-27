import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from './appText';

const Error = ({message, style}) => {
    return (
        <View style={styles.container}>
            <AppText style={style}>
                {message}
            </AppText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '2%'
    }
})

export default Error;