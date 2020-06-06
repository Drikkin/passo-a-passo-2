import { EVENTS_DATA } from '../actions/actionTypes';

const initialState = {
  eventsData: ""
};

export const eventsDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENTS_DATA:
      return {
        ...state,
        eventsData: action.eventsData,
      };
    default:
      return state;
  }
};
