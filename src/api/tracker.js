import axios from 'axios';
import { AsyncStorage } from 'react-native';


const instance = axios.create({
    baseURL: 'https://5bfe24de.ngrok.io'
});

instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    }, //will be called every time the app is going to make a request
    (error) => {
        return Promise.reject(error);
        
        
     } // will be called every time there is an error with said request
);


export default instance;