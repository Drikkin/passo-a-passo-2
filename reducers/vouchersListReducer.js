import { VOUCHERS_LIST } from '../actions/actionTypes';

const initialState = {
  vouchersList: []
};

export const vouchersListReducer = (state = initialState, action) => {
  switch (action.type) {
    case VOUCHERS_LIST:
      return {
        ...state,
        vouchersList: action.vouchersList,
      };
    default:
      return state;
  }
};
