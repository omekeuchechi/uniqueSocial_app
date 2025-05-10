import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/login";
import Register from "../screens/register";
import ForgetPassword from "../screens/forgetPassword";
import Home from "../screens/home";
import UpdateProfile from "../screens/updateProfile";
import Welcome from "../screens/welcome";
import EditUserName from "../screens/editUserName";
import EditPhone from "../screens/editPhone";
import DataOfBirth from "../screens/dateOfBirth";
import CountrySelection from "../screens/countrySide";
import BlogPage from "../screens/bioPage";
import AdminDashboard from "../screens/admin/adminProfile";
import SettingsPage from "../screens/settings";
import EditEmail from "../screens/editEmail";
import EditPassword from "../screens/editPassword";


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#0056b3',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
            <Stack.Screen name="EditUserName" component={EditUserName} />
            <Stack.Screen name="EditPhone" component={EditPhone} />
            <Stack.Screen name="DataOfBirth" component={DataOfBirth} />
            <Stack.Screen name="CountrySelection" component={CountrySelection} />
            <Stack.Screen name="BlogPage" component={BlogPage} />
            <Stack.Screen name="SettingsPage" component={SettingsPage} />
            <Stack.Screen name="EditEmail" component={EditEmail} />
            <Stack.Screen name="EditPassword" component={EditPassword} />
            <Stack.Screen name="AdminDashboard"
                component={AdminDashboard}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default AppNavigator;  