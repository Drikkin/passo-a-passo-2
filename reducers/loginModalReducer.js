import { LOGIN_MODAL } from '../actions/actionTypes';

const initialState = {
  isLoginOpen: false
};

export const loginModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_MODAL:
      return {
        ...state,
        isLoginOpen: action.isLoginOpen,
      };
    default:
      return state;
  }
};
