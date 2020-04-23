import React, { useContext}from 'react';
import { View, StyleSheet, Text} from 'react-native';
import{ SafeAreaView} from 'react-navigation';
import { Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';
import {Ionicons} from '@expo/vector-icons';

const AccountScreen = () => {
    const { signout } = useContext(AuthContext);
    return( 
        <SafeAreaView forceInset={{top: 'always'}} style={styles.container}>
            <Text style={{fontSize:38, textAlign:"center"}}>Account Screen</Text>
            <Spacer>
            <Button style={styles.signoutBtn} title="Sign Out" onPress={signout}/>
            </Spacer>
            
        </SafeAreaView>
    
    
    ) 
};

AccountScreen.navigationOptions ={
    tabBarIcon: <Ionicons name="ios-settings" size ={20}/>
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 50,
        marginStart: 15
    },
    signoutBtn:{
        marginTop: 200
    }
});

export default AccountScreen;