import { AUTH_USER_SET } from '../actions';

const initialState = {
  authUser: null
};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER_SET: {
      return {
        ...state,
        authUser: action.authUser,
      };
    }
    default:
      return state;
  }
}

export default sessionReducer;
