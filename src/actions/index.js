import axios from 'axios';
import qs from 'qs';
import {
        LOGIN_URL, 
        FORGOT_PASSWORD_TOKEN_URL, 
        FORGOT_PASSWORD_CHANGE_URL,
        FORGOT_PASSWORD_VERIFY_TOKEN_URL
    } from '../constants/url';

export const login = (user) => async dispatch => {
    const response = await axios.post(LOGIN_URL, user);
    dispatch({type:'LOGIN', payload:response.data.payload});
}

export const requestPasswordChange = (email) => async dispatch => {
    const response = await axios.post(FORGOT_PASSWORD_TOKEN_URL, qs.stringify({email}));
    const payload = {
        error:null,
        data:response.data.payload
    }
    if(response.data.error){
        payload.error = response.data.error;
    }
    dispatch({type:'PASSWORD_CHANGE_TOKEN', payload});
}

const verifyTokenPasswordChangeDispatch = (error, data) => {
    const payload = 
        {
            type:'VERIFY_TOKEN_PASSWORD_CHANGE',
            payload:{
                data
            },
            error
    }
    return payload;
}

const changePasswordDispatch = (error, data) => {
    const payload = 
        {
            type:'PASSWORD_CHANGE',
            payload:{
                data
            },
            error
    }
    return payload;
}
export const verifyTokenPasswordChange = (token) => async dispatch => {
        const response = await axios.post(FORGOT_PASSWORD_VERIFY_TOKEN_URL, qs.stringify({token}));
       
        dispatch(verifyTokenPasswordChangeDispatch(response.data.error, response.data.payload));
}
export const changePassword = (user) => async dispatch => {
    const response = await axios.post(FORGOT_PASSWORD_CHANGE_URL, qs.stringify({token:user.token, password:user.password}));
    console.log(response)
    dispatch(changePasswordDispatch(response.data.error, response.data.payload));
}