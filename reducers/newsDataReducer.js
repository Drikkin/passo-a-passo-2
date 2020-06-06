import { NEWS_DATA } from '../actions/actionTypes';

const initialState = {
  newsData: ""
};

export const newsDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEWS_DATA:
      return {
        ...state,
        newsData: action.newsData,
      };
    default:
      return state;
  }
};
