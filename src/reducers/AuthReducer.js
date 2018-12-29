const INITIAL_STATE = { email: '' };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'email_changed':
      return action.payload;
  
    default:
      return state;
  }
}