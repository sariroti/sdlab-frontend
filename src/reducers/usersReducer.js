export default (state = {}, action) => {
    switch (action.type) {
      case 'LOGIN':
          return {...state, payload:action.payload};
      case 'REGISTER':
          return {...state, payload:action.payload};
      default:
        return state;
    }
  };