import React from "react";
import { Text, useWindowDimensions, StyleSheet } from "react-native";

const AppText = ({children, fontSize = 10, style, onPress}) => {

    const {fontScale} = useWindowDimensions();
    const defaultStyle = {
        fontFamily: "Helvetica",
        color: "blue",
        fontSize: fontSize/fontScale
    }

   return (

        <Text style= {StyleSheet.flatten([defaultStyle, style])} onPress={onPress}>
            {children}
        </Text>
    )
}

export default AppText;