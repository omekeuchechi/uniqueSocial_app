import React from 'react';
import { 
    View, 
    Text, 
    SafeAreaView, 
    TextInput, 
    Pressable, 
    StyleSheet,
    useColorScheme,
    StatusBar,
    ScrollView,
    Image
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AppText from '../components/appText';
import UpdateProfileTabBar from '../components/updateProfileTabs';

const UpdateProfile = ({navigation}) => {
    // const scheme = useColorScheme();
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [address, setAddress] = React.useState('');

    const handleSubmit = () => {
        // Update profile details here
        console.log('Profile updated successfully');
    }
    
    return (
        <SafeAreaView>
            <UpdateProfileTabBar />
        </SafeAreaView>
    )
}


export default UpdateProfile;