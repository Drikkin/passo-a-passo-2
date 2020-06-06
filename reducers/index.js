import { combineReducers } from 'redux';

import { sectorReducer } from './sectorReducer';
import { headerReducer } from './headerReducer';

import { userDataReducer } from './userDataReducer';
import { initialDataReducer } from './initialDataReducer';
import { newsDataReducer } from './newsDataReducer';
import { notifDataReducer } from './notifDataReducer';
import { eventsDataReducer } from './eventsDataReducer';
import { vouchersListReducer } from './vouchersListReducer';

import { categoriesReducer } from './categoriesReducer';
import { loginModalReducer } from './loginModalReducer';
import { searchReducer } from './searchReducer';

export const Reducers = combineReducers({
  sectorState: sectorReducer,
  userDataState: userDataReducer,
  initialDataState: initialDataReducer,
  newsDataState: newsDataReducer,
  vouchersListState: vouchersListReducer,
  notifDataState: notifDataReducer,
  eventsDataState: eventsDataReducer,
  headerState: headerReducer,
  categoriesState: categoriesReducer,
  loginModalState: loginModalReducer,
  searchState: searchReducer,
});
