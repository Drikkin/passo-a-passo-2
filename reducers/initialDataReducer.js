import { INITIAL_DATA } from '../actions/actionTypes';

const initialState = {
  initialData: {}
};

export const initialDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_DATA:
      return {
        ...state,
        initialData: action.initialData,
      };
    default:
      return state;
  }
};
