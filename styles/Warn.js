import { StyleSheet, Platform } from 'react-native';
import { scale, verticalScale, moderateScale, height, width } from './Scaling'
import { statusBarHeight, menuHeight, modalTop } from './Build'
import { Colors } from './Colors'

export const Warn = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#00000044',
    alignItems: 'center',
    justifyContent: 'center'
  },
  overlay: {
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: { height: 1, width: 0 },
    elevation: 2,
    width: width*0.75,
    padding: width*0.02,
    backgroundColor: Colors.white,
    borderRadius: width*0.04
  },
  txtContainer: {
    padding: width*0.04,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(7),
    margin: width*0.02,
    padding: width*0.02,
    borderWidth: 0.5,
    height: width*0.13,
    borderColor: Colors.g999
  },
  buttonTxt: {
    fontSize: moderateScale(15),
    letterSpacing: moderateScale(1)
  },
  title: {
    fontSize: moderateScale(17),
    color: Colors.blue,
    textAlign: 'center',
    marginBottom: moderateScale(15)
  },
  desc: {
    fontSize: moderateScale(14),
    color: Colors.g666,
    textAlign: 'center',
  },
})
