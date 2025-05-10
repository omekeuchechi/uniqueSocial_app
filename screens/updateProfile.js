import React, {useState} from 'react';
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
import UserBottomNav from '../components/userBottomNav';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const UpdateProfile = ({navigation, route}) => {
    // const scheme = useColorScheme();
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [user] = useState(route.params.user);
    const [token] = useState(route.params.token);

    const handleSubmit = () => {
        // Update profile details here
        console.log('Profile updated successfully');
    }

    const userTabData = [  
        { route: 'BlogPage', icon: 'home' },  
        { route: 'UpdateProfile', icon: 'user' },  
        { route: 'Settings', icon: 'gear' },  
        // { route: 'Edit', icon: 'pencil' },  
    ];
    
    return (
        <SafeAreaView>
            <StatusBar backgroundColor="#0056b3" barStyle="light-content" />  
            <UpdateProfileTabBar navigation={navigation} user={user} token={token} />
        </SafeAreaView>
    )
}


export default UpdateProfile;