import { StyleSheet, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { scale, verticalScale, moderateScale, height, width } from './Scaling'
import { Colors } from './Colors'

export const statusBarHeight = getStatusBarHeight();
export const menuHeight = height - statusBarHeight;
export const modalTop = Platform.OS === 'ios' ? statusBarHeight : 0;

export const Menu = StyleSheet.create({
  menuContainer: {
    top: statusBarHeight,
    position: 'absolute',
    width: width*0.66,
    bottom: 0,
    backgroundColor: '#f3f3f3',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.5,
    elevation: 4,
    shadowRadius: 5,
    borderTopRightRadius: width*0.025,
    borderBottomRightRadius: width*0.03,
  },
  closeContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#00000066',
  },
  topRow: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: width*0.01
  },
  logo: {
    width: width*0.25,
    height: width*0.25,
  },
  wrap: {
    padding: width*0.03,
  },
  innerWrap: {
    paddingLeft: width*0.03
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    height: width*0.14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gddd,
  },
  title: {
    fontSize: moderateScale(18),
  },
  subTitle: {
    fontSize: moderateScale(16),
  },
  icon: {
    width: width*0.08,
    height: width*0.1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: width*0.02
  }
})
