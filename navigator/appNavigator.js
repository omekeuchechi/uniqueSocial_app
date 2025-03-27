import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/login";
import Register from "../screens/register";
import ForgetPassword from "../screens/forgetPassword";
import Home from "../screens/home";
import UpdateProfile from "../screens/updateProfile";
import Welcome from './../screens/welcome';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    console.log(Stack)
    return (
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
        </Stack.Navigator>
    )
}

export default AppNavigator;