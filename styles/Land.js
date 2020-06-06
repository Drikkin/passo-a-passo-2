import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale, height, width } from './Scaling'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Colors } from './Colors'

const statusBarHeight = getStatusBarHeight()
// 141 : 157
export const Slider = {
  sliderWidth: width,
  itemWidth: width*0.35
}

export const Land = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: statusBarHeight,
    justifyContent: 'space-between',
    padding: width*0.08
  },
  anotherContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: width*0.08,
    paddingTop: width*0.04
  },
  anotherOneRly: {
    justifyContent: 'center',
    flex: 1,
  },
  containerSimple: {
    marginTop: statusBarHeight,
    padding: width*0.08
  },
  containerPre: {
    flex: 1,
    marginTop: statusBarHeight,
    justifyContent: 'space-between',
    paddingVertical: width*0.08
  },
  carouselContainer: {
    height: width*0.4
  },
  sliderItem: {
    width: width*0.35,
    height: width*0.35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width*0.03,
  },
  sliderImg: {
    width: width*0.35,
    height: width*0.35,
    borderRadius: width*0.03,
    backgroundColor: '#ddd'
  },
  logo: {
    width: width*0.564,
    height: width*0.628,
    alignSelf: 'center'
  },
  preButton: {
    backgroundColor: Colors.gold,
    borderRadius: moderateScale(3),
    width: width*0.7,
    height: width*0.15,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  preTxt: {
    color: Colors.white,
    fontSize: moderateScale(17),
    alignSelf: 'center',
    textAlign: 'center',
    letterSpacing: moderateScale(2)
  },
  logoSm: {
    width: width*0.423,
    height: width*0.471,
    alignSelf: 'center'
  },
  logoXs: {
    width: width*0.2115,
    height: width*0.2355,
    alignSelf: 'center',
    marginBottom: moderateScale(20)
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  buttonContainer: {
    width: width*0.42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBackground: {
    borderWidth: moderateScale(2),
    borderColor: Colors.gold,
    borderRadius: 9,
    width: width*0.27,
    height: width*0.27,
    marginTop: -width*0.27,
    zIndex: -2,
    marginBottom: moderateScale(6),
  },
  buttomImgClass: {
    width: width*0.28,
    height: width*0.28,
  },
  buttomImgClub: {
    width: width*0.31,
    height: width*0.29,
  },
  buttonTxt: {
    fontSize: moderateScale(16),
    color: Colors.white,
    textAlign: 'center',
    marginVertical: moderateScale(3),
    letterSpacing: moderateScale(1)
  },
  siteTxt: {
    fontSize: moderateScale(14),
    color: Colors.white,
    alignSelf: 'center',
    letterSpacing: moderateScale(1)
  }
})
