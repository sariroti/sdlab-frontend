import axios from 'axios';
import qs from 'qs';
import {
        USER_URL,
        LOGIN_URL, 
        FORGOT_PASSWORD_TOKEN_URL, 
        FORGOT_PASSWORD_CHANGE_URL,
        FORGOT_PASSWORD_VERIFY_TOKEN_URL
    } from '../constants/url';

const config = {
    headers: {
        Authorization:'',
        crossDomain: true
    }
}

export const login = (user) => async dispatch => {
    const response = await axios.post(LOGIN_URL, user);
    if(response.data.error){
        response.data.payload = response.data.error;
    }
    dispatch({type:'LOGIN', payload:response.data.payload});
}

export const register = (user) => async dispatch => {

    const response = await axios.post(USER_URL, qs.stringify(user));
    dispatch({type:'REGISTER', payload:response.data.payload});
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

const updateProfileDispatch = (error, data) => {
    const payload = 
        {
            type:'UPDATE_PROFILE',
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

export const updateProfile = (user, token) => async dispatch => {
    config.headers.Authorization ='bearer ' + token;
    const response = await axios.put(USER_URL, qs.stringify(user), config);
    console.log(response)
    dispatch(updateProfileDispatch(response.data.error, response.data.payload));
}

export const getProfile = (token) => async dispatch => {
    config.headers.Authorization ='bearer ' + token;
    const response = await axios.get(USER_URL,config);
    
    dispatch(changePasswordDispatch(response.data.error, response.data.payload));
}