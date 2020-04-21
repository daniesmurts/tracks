import React, {useState} from 'react';
import { StyleSheet} from 'react-native'
import { Text, Button, Input } from 'react-native-elements';
import Spacer from './Spacer';

const AuthForm = ({headerText, errorMessage, onSubmit, btnText}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    
    return (
        <>
        <Spacer> 
            <Text h3>{headerText}</Text> 
        </Spacer>
        
        <Input label="Email:"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
        
        />
        <Spacer/>
        <Input label="Password:"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        />
        {errorMessage ? <Text style={styles.errMsg}>{errorMessage}</Text> : null}
        <Spacer>
            <Button title={btnText} onPress={() => onSubmit({email, password})}/>
        </Spacer>
        </>
    )
}


const styles = StyleSheet.create({
    errMsg:{
        color: 'red',
        fontSize: 16, 
        marginLeft: 15,
        marginTop: 15
    },
});

export default AuthForm;
