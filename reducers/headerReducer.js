import { HEADER } from '../actions/actionTypes';

const initialState = {
  title: 'INÍCIO',
  page: 1,
  subPage: 1,
  data: {}
};

export const headerReducer = (state = initialState, action) => {
  switch (action.type) {
    case HEADER:
      return {
        ...state,
        title: action.title,
        page: action.page,
        subPage: action.subPage,
        data: action.data,
      };
    default:
      return state;
  }
};
