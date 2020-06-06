import { StyleSheet, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { scale, verticalScale, moderateScale, height, width } from './Scaling'
import { Colors } from './Colors'

export const Item = StyleSheet.create({
  container: {
    alignSelf: 'center',
    height: width*0.23,
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
  containerTp: {
    alignSelf: 'center',
    height: width*0.23,
    width: width*0.93,
    marginVertical: width*0.0175,
    borderRadius: moderateScale(6),
    borderWidth: moderateScale(1),
    borderColor: Colors.gaaa,
    backgroundColor: Colors.gf1,
    flexDirection: 'row',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: { height: 1, width: 0 },
    elevation: 2,
  },
  containerSm: {
    alignSelf: 'center',
    minHeight: width*0.19,
    width: width*0.93,
    marginVertical: width*0.0175,
    borderRadius: moderateScale(6),
    borderWidth: moderateScale(1),
    borderColor: Colors.gaaa,
    backgroundColor: Colors.white,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: { height: 1, width: 0 },
    elevation: 2,
  },
  subContainer: {
    alignSelf: 'center',
    minHeight: width*0.17,
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
    flex: 1,
    borderTopWidth: moderateScale(1),
    borderTopColor: Colors.gaaa,
    backgroundColor: Colors.white,
    flexDirection: 'row',
  },
  titleRow: {
    flexDirection: 'row',
    alignSelf: 'center',
    minHeight: width*0.17,
    flex: 1,
    borderRadius: moderateScale(6),
    backgroundColor: Colors.white,
    elevation: 1,
  },
  notifContainer: {
    alignSelf: 'center',
    minHeight: width*0.2,
    width: width*0.93,
    marginVertical: width*0.0175,
    paddingTop: width*0.03,
    paddingBottom: width*0.055,
    borderRadius: moderateScale(6),
    borderWidth: moderateScale(1),
    borderColor: Colors.gddd,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: { height: 1, width: 0 },
    elevation: 2,
  },
  notifTitle: {
    fontSize: moderateScale(15),
    letterSpacing: moderateScale(1),
    color: Colors.blue,
    marginBottom: moderateScale(5)
  },
  notifDesc: {
    fontSize: moderateScale(13),
    letterSpacing: moderateScale(1),
    color: Colors.g666,
  },
  notifRight: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: width*0.05
  },
  leftSm: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width*0.02,
    borderTopStartRadius: moderateScale(4),
    borderBottomStartRadius: moderateScale(4),
    borderBottomEndRadius: moderateScale(1),
    borderTopEndRadius: moderateScale(1),
    overflow: 'hidden'
  },
  left: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width*0.23,
    borderTopStartRadius: moderateScale(4),
    borderBottomStartRadius: moderateScale(4),
    borderBottomEndRadius: moderateScale(1),
    borderTopEndRadius: moderateScale(1),
    overflow: 'hidden'
  },
  lockBase: {
    backgroundColor: Colors.white,
    borderRadius: width*0.08,
    width: width*0.15,
    opacity: 0.6,
    height: width*0.15,
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    left: width*0.04,
    elevation: 2,
    shadowOpacity: 0.4,
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: { height: 1, width: 0 },
  },
  leftImg: {
    backgroundColor: Colors.gf1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width*0.23,
    borderRadius: moderateScale(4),
    overflow: 'hidden'
  },
  leftImg2: {
    backgroundColor: Colors.gf1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width*0.23,
    borderRadius: moderateScale(4),
    overflow: 'hidden'
  },
  right: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: width*0.05
  },
  difImg: {
    width: width*0.17,
    height: width*0.17
  },
  subTitle: {
    fontSize: moderateScale(14),
    letterSpacing: moderateScale(1),
    color: Colors.g999,
  },
  title: {
    fontSize: moderateScale(16),
    letterSpacing: moderateScale(1),
    color: Colors.blue,
  },
  titleSm: {
    fontSize: moderateScale(15),
    letterSpacing: moderateScale(1),
    color: Colors.blue,
  },
  titleSmoff: {
    fontSize: moderateScale(15),
    letterSpacing: moderateScale(1),
    color: Colors.g777,
  },
  titleSmTp: {
    fontSize: moderateScale(13),
    letterSpacing: moderateScale(1),
    color: Colors.g777,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  blank: {
    height: width*0.13,
    backgroundColor: '#fff'
  },
  offDate: {
    position: 'absolute',
    bottom: moderateScale(3),
    right: moderateScale(5),
    fontSize: moderateScale(12),
    color: Colors.g999
  },
  titleCount: {
    fontSize: moderateScale(13),
    color: Colors.g999
  },
  subLayout: {
    marginTop: width*0.01,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width*0.01,
    height: width*0.07,
    width: width*0.3,
  },
  subLayoutText: {
    fontSize: moderateScale(13),
    color: Colors.white
  }
})
