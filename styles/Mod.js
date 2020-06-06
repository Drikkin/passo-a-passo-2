import { StyleSheet, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { scale, verticalScale, moderateScale, height, width } from './Scaling'
import { Colors } from './Colors'

export const statusBarHeight = getStatusBarHeight();
export const menuHeight = height - statusBarHeight;
export const modalTop = Platform.OS === 'ios' ? statusBarHeight : 0;

export const Mod = StyleSheet.create({
  closer: {
    height: width*0.13 + modalTop,
    backgroundColor: Colors.inv
  },
  container: {
    flex: 1,
  },
  divider: {
    backgroundColor: Colors.lightBlue,
    height: moderateScale(4),
  },
  row: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  input: {
    flex: 1,
    fontSize: moderateScale(16),
    color: Colors.g333,
    alignSelf: 'stretch',
    fontFamily: 'roboto-regular'
  },
})
