import { Platform } from "react-native";

let baseUrl;

Platform.OS === 'android' ? baseUrl = 'http://192.168.43.84:3000/api/v1' : baseUrl = 'http://localhost:3000/api/v1'; 

export default baseUrl;