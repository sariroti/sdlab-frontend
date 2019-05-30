export default (state = {}, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {...state, payload:action.payload};
      case 'PASSWORD_CHANGE_TOKEN':
          return {...state, payload:action.payload};
      case 'VERIFY_TOKEN_PASSWORD_CHANGE':
          return {...state, payload:action.payload}; 
      case 'PASSWORD_CHANGE':
          return {...state, payload:action.payload};
      default:
        return state;
    }
  };