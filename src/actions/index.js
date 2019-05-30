import axios from 'axios';
import qs from 'qs'
import {LOGIN_URL, USER_URL} from '../constants/url';


export const login = (user) => async dispatch => {
    const response = await axios.post(LOGIN_URL, user);
    if(response.data.error){
        response.data.payload = response.data.error;
    }
    dispatch({type:'LOGIN', payload:response.data.payload});
}

export const register = (user) => async dispatch => {

    const response = await axios.post(USER_URL, qs.stringify(user));
    console.log(response.data.payload);
    dispatch({type:'REGISTER', payload:response.data.payload});
}