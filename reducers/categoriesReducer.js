import { CATEGORIES } from '../actions/actionTypes';

const initialState = {
  catLessons: 1,
  catClub: {}
};

export const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIES:
      return {
        ...state,
        catLessons: action.catLessons,
        catClub: action.catClub,
      };
    default:
      return state;
  }
};
