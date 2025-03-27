import React, {useState} from "react";
import { View, TouchableOpacity } from "react-native";

export const Checkbox = () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <View>
            <TouchableOpacity 
            onPress={() => setIsChecked(!isChecked)}
            style={{
                width: 17,
                height: 17,
                backgroundColor: isChecked ? 'blue' : 'white',
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 4,
            }}
            />
        </View>
    )
}