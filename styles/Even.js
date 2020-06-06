import { StyleSheet, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { scale, verticalScale, moderateScale, height, width } from './Scaling'
import { Colors } from './Colors'

export const Even = StyleSheet.create({
  container: {
    alignSelf: 'center',
    minHeight: width*0.28,
    width: width*0.93,
    marginVertical: width*0.0175,
    borderRadius: moderateScale(6),
    borderWidth: moderateScale(1),
    borderColor: Colors.gaaa,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: { height: 1, width: 0 },
    elevation: 2,
  },
  left: {
    width: width*0.28,
    alignSelf: 'stretch',
  },
  leftPic: {
    flex: 1,
    backgroundColor: Colors.gf1,
    borderTopStartRadius: moderateScale(5),
    borderBottomStartRadius: moderateScale(5),
    borderBottomEndRadius: 0,
    borderTopEndRadius: 0,
    overflow: 'hidden'
  },
  right: {
    flex: 1,
    padding: width*0.02,
  },
  dateTxt: {
    fontSize: moderateScale(17),
    color: Colors.blue
  },
  timeTxt: {
    fontSize: moderateScale(15),
    color: Colors.g333
  },
  split: {
    height: 1,
    backgroundColor: Colors.gf1,
    alignSelf: 'stretch',
    marginVertical: width*0.01,
  },
  descTitle: {
    fontSize: moderateScale(15),
    color: Colors.blue,
  },
  descTxt: {
    fontSize: moderateScale(14),
    color: Colors.g555,
  },
  rightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  }
})
