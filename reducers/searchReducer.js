import { SEARCH_DATA } from '../actions/actionTypes';

const initialState = {
  showData: 0,
  searchItem: {},
  searchId: 0,
  current: '',
  cats: []
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_DATA:
      return {
        ...state,
        showData: action.showData,
        searchItem: action.searchItem,
        searchId: action.searchId,
        current: action.current,
        cats: action.cats
      };
    default:
      return state;
  }
};
