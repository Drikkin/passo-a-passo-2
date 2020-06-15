import { StyleSheet, Platform } from 'react-native';
import { scale, verticalScale, moderateScale, height, width } from './Scaling'
import { statusBarHeight, menuHeight, modalTop } from './Build'
import { Colors } from './Colors'

export const AwareHeight = width*0.1

export const Log = StyleSheet.create({
  container: {
    flex: 1
  },
  containerTop: {
    flex: 1,
    paddingTop: statusBarHeight,
  },
  containerBack: {
    flex: 1,
    padding: width*0.05,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  scrollContentContainer: {
    flexGrow: 1,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    alignSelf: 'center',
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    padding: width*0.02,
    borderRadius: width*0.3,
    position: 'absolute',
    top: modalTop + width*0.01,
    left: width*0.01,
  },
  logo: {
    height: width*0.45,
    width: width*0.4,
  },
  input: {
    fontFamily: 'roboto-regular',
    height: width*0.13,
    flex: 1,
    color: Colors.white,
    fontSize: moderateScale(15),
  },
  errorTxt: {
    fontFamily: 'roboto-regular',
    color: Colors.white,
    textAlign: 'center',
    paddingHorizontal: moderateScale(20),
    marginVertical: moderateScale(35),
    marginBottom: moderateScale(12),
    fontSize: moderateScale(14),
  },
  inputLeft: {
    marginLeft: width*0.01,
    alignItems: 'center',
    justifyContent: 'center',
    width: width*0.12,
  },
  inputcontainer: {
    backgroundColor: '#00000055',
    width: width*0.75,
    height: width*0.15,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: moderateScale(1),
    borderColor: Colors.white,
    borderRadius: moderateScale(7),
    marginBottom: width*0.04,
  },
  button: {
    width: width*0.36,
    height: width*0.15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(7),
    marginBottom: width*0.04,
  },
  button1: {
    flex: 1,
    height: width*0.1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(7),
    marginBottom: width*0.04,
  },
  button2: {
    flex: 1,
    height: width*0.15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(7),
    marginBottom: width*0.04,
  },
  buttonTxt: {
    fontSize: moderateScale(15),
    color: Colors.white,
    letterSpacing: 1,
    textAlign: 'center'
  },
  buttonTxt2: {
    fontSize: moderateScale(15),
    color: Colors.white,
    letterSpacing: 1,
    textAlign: 'center'
  },
  buttonRow: {
    width: width*0.75,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  resetTxt: {
    marginVertical: moderateScale(15),
    fontSize: moderateScale(14),
    color: Colors.white,
    letterSpacing: 1,
    textAlign: 'center'
  },
  resetTxt2: {
    marginVertical: moderateScale(5),
    fontSize: moderateScale(14),
    color: Colors.white,
    letterSpacing: 1,
    textAlign: 'center'
  }
})
