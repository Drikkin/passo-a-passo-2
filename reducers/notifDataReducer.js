import { NOTIF_DATA } from '../actions/actionTypes';

const initialState = {
  notifData: ""
};

export const notifDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIF_DATA:
      return {
        ...state,
        notifData: action.notifData,
      };
    default:
      return state;
  }
};
