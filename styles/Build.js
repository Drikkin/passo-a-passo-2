import { StyleSheet, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { scale, verticalScale, moderateScale, height, width } from './Scaling'
import { Colors } from './Colors'

export const statusBarHeight = getStatusBarHeight();
export const menuHeight = height - statusBarHeight;
export const modalTop = Platform.OS === 'ios' ? statusBarHeight : 0;

export const Build = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerBlue: {
    flex: 1,
    backgroundColor: Colors.blue,
  },
  containerTop: {
    flex: 1,
    paddingTop: width*0.015,
    backgroundColor: '#fff',
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  rowFlexedAligned: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  // map section

  addContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: moderateScale(5),
    backgroundColor: Colors.white,
    padding: moderateScale(3),
    alignSelf: 'center',
    width: width*0.94,
    marginBottom: width*0.03,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: { height: 1, width: 0 },
    elevation: 2,
  },
  addPicture: {
    height: width*0.5,
    backgroundColor: '#ddd',
  },
  rowLeft: {
    padding: moderateScale(5),
    flex: 1,
    justifyContent: 'center',
  },
  addTxt: {
    color: Colors.g333,
    fontSize: moderateScale(13),
    paddingVertical: moderateScale(5)
  },
  buttonTxt: {
    fontSize: moderateScale(15),
    marginLeft: width*0.01,
    color: Colors.blue,
  },
  rightCircle: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: moderateScale(6),
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowColor: '#000',
    shadowOffset: { height: 1, width: 0 },
    elevation: 2,
    borderRadius: width*0.015,
    borderWidth: 2,
    borderColor: Colors.blue,
  },
  map: {
    alignSelf: 'center',
    width: width*0.8,
    height: width*0.8,
    borderRadius: 3,
    marginBottom: width*0.1
  },

  //search
  search: {
    height: width*0.15,
    backgroundColor: Colors.gf1,
    justifyContent: 'space-between'
  },
  searchFree: {
    minHeight: width*0.15,
    backgroundColor: Colors.gf1,
    justifyContent: 'space-between'
  },
  searchRow: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    padding: width*0.01,
  },
  shadowUp: {
    backgroundColor: Colors.gddd,
    height: moderateScale(1),
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowColor: Colors.black,
    shadowOffset: { height: -1, width: 0 },
  },
  shadowDown: {
    backgroundColor: Colors.gddd,
    height: moderateScale(1),
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowColor: Colors.black,
    shadowOffset: { height: 2, width: 0 },
  },
  searchIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width*0.15
  },
  searchTxt: {
    fontSize: moderateScale(15),
    color: Colors.g333
  }
})
