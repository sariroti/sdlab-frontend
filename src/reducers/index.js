import { combineReducers } from 'redux';
import userReducers from './usersReducer';
export default combineReducers({
    users:userReducers
});