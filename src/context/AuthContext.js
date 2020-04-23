import { AsyncStorage } from 'react-native';
import createDataContext from'./createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';


const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'signin':
            return {errorMessage: '', token: action.payload};
        case 'clear_err_msg':
                return{...state, errorMessage: ''};
        case 'signout':
            return { token: null, errorMessage: ''};    
        default:
            return state;
    }
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem ('token');
    if (token){
        dispatch({type: 'signin', payload: token});
        navigate('TrackList')
    } else {
        navigate('loginFlow');
    }
}

const clearErrorMessage = dispatch => ()=> {
    dispatch({type:'clear_err_msg'})
}



const signup = (dispatch)=> {
    return async ({email, password}) => {
        //make api request to sign up with that email and password

        // if we sign up , modify state to authenticated

        // if sign up fails, reflect an error

        try {
            const response = await trackerApi.post('/signup', { email, password});
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({type: 'signin', payload: response.data.token})
            //navigate
            navigate('TrackList');
        } catch (err) {
            dispatch({
                type: 'add_error', payload: 'Something went wrong with sign up'
            })

        }

    };
};

const signin = (dispatch) => {
    return async ({email, password}) => {
//make api request to sign in with that email and password

        // if we sign in , modify state to authenticated

        // if sign in fails, reflect an error
        try {
            const response = await trackerApi.post ('/signin', { email, password});
            console.log('token saving:', response.data.token);
            
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type:'signin', payload: response.data.token});
            navigate('TrackList');
        } catch (error) {
            dispatch({
                type:'add_err',  payload: "something went wrong with sign in"
            })
        }
    };
};

const signout  = (dispatch) => {
    return async() => {
        await AsyncStorage.removeItem('token');
        dispatch({type:'signout'});
        navigate('signin')
    };
};


export const {Provider, Context } = createDataContext (
    authReducer,
    {signin, signup, signout, clearErrorMessage, tryLocalSignin },
    {token: null, errorMessage: ''}
);