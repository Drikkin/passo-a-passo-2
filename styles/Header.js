import { StyleSheet, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { scale, verticalScale, moderateScale, height, width } from './Scaling'
import { Colors } from './Colors'

export const statusBarHeight = getStatusBarHeight();
export const menuHeight = height - statusBarHeight;
export const modalTop = Platform.OS === 'ios' ? statusBarHeight : 0;

export const Header = StyleSheet.create({
  imgBg: {
    width: width,
    height: modalTop + width*0.13,
    paddingTop: modalTop
  },
  topRow: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  divider: {
    backgroundColor: Colors.lightBlue,
    height: moderateScale(4)
  },
  topIcon: {
    height: width*0.12,
    width: width*0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTitle: {
    color: Colors.white,
    fontSize: moderateScale(18),
    alignSelf: 'center',
    textAlign: 'center',
    width: width*0.7,
    letterSpacing: moderateScale(1)
  },
  bottonRow: {
    paddingHorizontal: width*0.02,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  iconContainerS: {
    height: width*0.12,
    width: width*0.11,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -moderateScale(3),
    borderBottomWidth: moderateScale(3),
    borderBottomColor: Colors.blue
  },
  iconS: {
    marginBottom: -moderateScale(3)
  },
  iconContainer: {
    height: width*0.12,
    width: width*0.11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainerS: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: moderateScale(3),
    borderBottomColor: Colors.blue
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTxtS: {
    letterSpacing: moderateScale(1),
    fontSize: moderateScale(16),
    marginBottom: -moderateScale(3),
    color: Colors.blue,
  },
  buttonTxt: {
    letterSpacing: moderateScale(1),
    fontSize: moderateScale(16),
    color: Colors.g999
  },
})
