import { USER_DATA } from '../actions/actionTypes';

const initialState = {
  userData: {}
};

export const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        userData: action.userData,
      };
    default:
      return state;
  }
};
