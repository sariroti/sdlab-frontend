import axios from 'axios';
import {LOGIN_URL} from '../constants/url';

export const login = (user) => async dispatch => {
    const response = await axios.post(LOGIN_URL, user);
    dispatch({type:'LOGIN', payload:response.data.payload});
}