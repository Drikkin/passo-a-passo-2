import { SECTOR } from '../actions/actionTypes';

const initialState = {
  sector: 1
};

export const sectorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SECTOR:
      return {
        ...state,
        sector: action.sector,
      };
    default:
      return state;
  }
};
