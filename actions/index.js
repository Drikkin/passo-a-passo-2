import { USER_DATA, INITIAL_DATA, VOUCHERS_LIST, NEWS_DATA, NOTIF_DATA, EVENTS_DATA, SECTOR, HEADER, CATEGORIES, LOGIN_MODAL, SEARCH_DATA } from './actionTypes';

export const saveUserData = value => ({
  type: USER_DATA,
  userData: value
});

export const saveInitialData = value => ({
  type: INITIAL_DATA,
  initialData: value
});

export const saveNewsData = value => ({
  type: NEWS_DATA,
  newsData: value
});

export const saveNotifData = value => ({
  type: NOTIF_DATA,
  notifData: value
});

export const saveEventsData = value => ({
  type: EVENTS_DATA,
  eventsData: value
});

export const saveVouchersList = value => ({
  type: VOUCHERS_LIST,
  vouchersList: value
});

export const saveSector = value => ({
  type: SECTOR,
  sector: value
});

export const saveHeader = (value, page, subPage, data) => ({
  type: HEADER,
  title: value,
  page: page,
  subPage: subPage,
  data: data,
});

export const saveCategories = (value, second) => ({
  type: CATEGORIES,
  catLessons: value,
  catClub: second,
});

export const saveLoginState = value => ({
  type: LOGIN_MODAL,
  isLoginOpen: value
});

export const saveSearch = (value, data, id, current, cats) => ({
  type: SEARCH_DATA,
  showData: value,
  searchItem: data,
  searchId: id,
  current: current,
  cats: cats,
});
