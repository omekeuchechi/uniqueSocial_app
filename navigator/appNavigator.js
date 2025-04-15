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

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'blue',
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
            <Stack.Screen name="AdminDashboard"
                component={AdminDashboard}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default AppNavigator;  