import { StyleSheet, Platform } from 'react-native';
import { scale, verticalScale, moderateScale, height, width } from './Scaling'
import { statusBarHeight, menuHeight, modalTop } from './Build'
import { Colors } from './Colors'

export const Vouc = StyleSheet.create({
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
    width: width*0.85,
    minHeight: width*1.15,
    padding: width*0.02,
    borderRadius: width*0.04
  },
  txtContainer: {
    flex: 1,
    padding: width*0.03,
    margin: width*0.02,
    backgroundColor: Colors.white,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(7)
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
  voucher: {
    fontSize: moderateScale(14),
    color: Colors.blue,
    textAlign: 'center',
  },
  promoContainer: {
    flex: 1,
    padding: width*0.03,
    alignItems: 'center',
    justifyContent: 'center'
  },
  estab: {
    fontSize: moderateScale(28),
    color: Colors.red,
    textAlign: 'center',
    marginVertical: moderateScale(3)
  },
  perc: {
    fontSize: moderateScale(30),
    color: Colors.red,
    textAlign: 'center',
    marginVertical: moderateScale(3)
  },
  item:{
    fontSize: moderateScale(24),
    color: Colors.blue,
    textAlign: 'center',
    marginVertical: moderateScale(3)
  },
  code: {
    fontSize: moderateScale(22),
    color: Colors.blue,
    textAlign: 'center',
  },
  divider: {
    height: 0.5,
    margin: moderateScale(7),
    backgroundColor: Colors.blue,
  },
  date: {
    fontSize: moderateScale(13),
    color: Colors.g666,
    textAlign: 'center',
    marginTop: moderateScale(4)
  },
  name: {
    fontSize: moderateScale(17),
    color: Colors.blue,
    textAlign: 'center',
  },
  obs: {
    marginTop: moderateScale(8),
    fontSize: moderateScale(12),
    color: Colors.g666,
    textAlign: 'center',
  },
  close: {
    height: width*0.16,
    width: width*0.16,
    backgroundColor: Colors.white,
    borderColor: Colors.blue,
    borderWidth: moderateScale(1),
    borderRadius: width*0.10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: width*0.06,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: { height: 1, width: 0 },
    elevation: 2,
  }
})
