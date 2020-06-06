import { StyleSheet, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { scale, verticalScale, moderateScale, height, width } from './Scaling'
import { Colors } from './Colors'

export const statusBarHeight = getStatusBarHeight();
export const menuHeight = height - statusBarHeight;
export const modalTop = Platform.OS === 'ios' ? statusBarHeight : 0;

export const Desc = StyleSheet.create({
  container: {
    padding: width*0.03,
    flex: 1,
    backgroundColor: '#fff'
  },
  img: {
    width: width,
    height: width*0.75,
    backgroundColor: Colors.gf1
  },
  evenIcon: {
    marginRight: width*0.015,
  },
  detailRow: {
    marginBottom: width*0.03,
  },
  imgSq: {
    width: width,
    height: width*0.98,
    backgroundColor: Colors.gf1
  },
  imgDesc: {
    width: width*0.94,
    height: width*0.75,
    backgroundColor: Colors.gf1,
    marginBottom: width*0.03
  },
  imgDescSq: {
    width: width*0.94,
    height: width*0.90,
    backgroundColor: Colors.gf1,
    marginBottom: width*0.03
  },
  title: {
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: width*0.02,
    letterSpacing: moderateScale(1),
    color: Colors.g333,
    fontSize: moderateScale(16),
    marginBottom: width*0.04,
  },
  titleDesc: {
    marginTop: width*0.02,
    paddingRight: width*0.02,
    letterSpacing: moderateScale(1),
    color: Colors.g333,
    fontSize: moderateScale(16),
    marginBottom: width*0.04,
  },
  date: {
    marginTop: width*0.02,
    letterSpacing: moderateScale(1),
    color: Colors.g777,
    fontSize: moderateScale(14),
    marginBottom: width*0.04,
  },
  date1: {
    letterSpacing: moderateScale(1),
    color: Colors.g555,
    fontSize: moderateScale(16),
  },
  date2: {
    letterSpacing: moderateScale(1),
    color: Colors.g555,
    fontSize: moderateScale(15),
  },
  date3: {
    letterSpacing: moderateScale(1),
    color: Colors.g555,
    fontSize: moderateScale(15),
    flex: 1,
  },
  txt: {
    marginBottom: width*0.04,
    fontFamily: 'roboto-regular',
    color: Colors.g333,
    fontSize: moderateScale(15)
  },
  addTxt: {
    color: Colors.g333,
    fontFamily: 'roboto-regular',
    fontSize: moderateScale(13),
    paddingVertical: moderateScale(5)
  },
  strong: {
    fontFamily: 'roboto-medium',
    color: Colors.g111,
    fontSize: moderateScale(15)
  },
  titleHtml: {
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: width*0.02,
    letterSpacing: moderateScale(1),
    fontFamily: 'roboto-regular',
    color: Colors.g333,
    fontSize: moderateScale(16),
    marginBottom: width*0.04,
  },
  vButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: width*0.74,
    height: width*0.14,
    backgroundColor: Colors.lightBlue,
    borderRadius: moderateScale(7),
    marginTop: width*0.05,
    marginBottom: width*0.1
  },
  vText: {
    letterSpacing: moderateScale(1),
    color: Colors.white,
    fontSize: moderateScale(16)
  }
})
