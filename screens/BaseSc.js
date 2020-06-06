import React, { Component } from 'react';
import { Feather, AntDesign, Entypo, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, ImageBackground, View, Platform, TouchableOpacity, AsyncStorage, Modal, ScrollView, Image, Animated, Easing, BackHandler} from 'react-native';
import { WebView } from 'react-native-webview';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loading from '../components/Loading.js'
import { RobotoBold, RobotoRegular, RobotoMedium } from '../components/Text.js'
import Difficulty from '../components/base/Difficulty.js'
import About from '../components/base/About.js'
import News from '../components/base/News.js'
import Maps from '../components/base/Maps.js'
import Classes from '../components/base/Classes.js'
import SubClasses from '../components/base/SubClasses.js'
import DisplayNews from '../components/base/DisplayNews.js'
import DisplayClass from '../components/base/DisplayClass.js'
import DisplayEvents from '../components/base/DisplayEvents.js'
import Notif from '../components/base/Notif.js'
import Events from '../components/base/Events.js'
import MyVouchers from '../components/base/MyVouchers.js'
import Categories from '../components/base2/Categories.js'
import Promos from '../components/base2/Promos.js'
import SubPromos from '../components/base2/SubPromos.js'
import DisplayPromos from '../components/base2/DisplayPromos.js'
import Warning from '../components/modals/Warning.js'
import Login from '../components/Login.js'
import Register from '../components/Register.js'
import ResetPassword from '../components/ResetPassword.js'
import Voucher from '../components/modals/Voucher.js'
import HeaderTop from '../components/HeaderTop.js'
import { scale, verticalScale, moderateScale, width } from '../styles/Scaling.js'
import { Build } from '../styles/Build'
import { Header } from '../styles/Header'
import { Colors } from '../styles/Colors'
import { Menu } from '../styles/Menu'
import { saveHeader, saveSector, saveUserData, saveVouchersList } from '../actions'

const width08 = width*0.8
const width07 = width*0.7

const IS_IOS = Platform.OS == 'ios'
const HOME_TITLE = [ 'AULAS DE DANÇA', 'CLUBE DE VANTAGENS' ]
const DIFFICULTIES = ['INICIANTE', 'INTERMEDIÁRIO', 'AVANÇADO']

class BaseSc extends React.Component {

  constructor() {
    super();

    this.state = {
      isWarnOpen: false,
      isPremiumOpen: false,
      isVoucherOpen: false,
      isLoginOpen: false,
      isRegisterOpen: false,
      isResetOpen: false,
      isMenuOpen: false,
      isDisconnectOpen: false,
      username: '',
      password: '',
      voucherData: {},
      loop: false,
    }
    this.canLoop = true
    this.translateMenu = new Animated.Value(-width08)
    this.opacityMenu = new Animated.Value(0)
    this.changeOpacity = new Animated.Value(0)
  }

  componentDidMount() {
    this.canLoop = true
    this.loopState()
  }

  componentWillUnmount() {
    this.canLoop = false
  }

  loopState() {
    this.setState({loop: !this.state.bool}, () => {
      if(this.canLoop) {
        setTimeout(() => {this.loopState()}, 1500)
      }
    })
  }

  moveMenu(bool) {
    if (bool) {
      Animated.timing( this.changeOpacity, {
        toValue: 1,
        duration: 250,
        easing: Easing.linear,
        useNativeDriver: true
      }).start();
      Animated.timing( this.translateMenu, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.poly(2)),
        useNativeDriver: true
      }).start();
      Animated.timing( this.opacityMenu, {
        toValue: 1,
        duration: 50,
        easing: Easing.quad,
        useNativeDriver: true
      }).start();
    } else {
      Animated.timing( this.changeOpacity, {
        toValue: 0,
        duration: 250,
        easing: Easing.linear,
        useNativeDriver: true
      }).start();
      Animated.timing( this.translateMenu, {
        toValue: -width08,
        duration: 250,
        easing: Easing.out(Easing.poly(2)),
        useNativeDriver: true
      }).start();
      Animated.timing( this.opacityMenu, {
        toValue: 0,
        duration: 50,
        delay: 200,
        easing: Easing.quad,
        useNativeDriver: true
      }).start();
    }
  }

  toggleMenu(bool) {
    if(bool) {
      this.moveMenu(bool)
      this.setState({isMenuOpen: true})
    } else {
      this.moveMenu(bool)
      setTimeout(() => {
        this.setState({isMenuOpen: false})
      }, 250)
    }
  }

  changePage(title, page, subPage, data) {
    if(this.state.isMenuOpen || this.translateMenu.__getValue() > -10){
      this.toggleMenu(false)
    }
    let temp = title
    if(page === 1 && subPage === 1){
      temp = HOME_TITLE[this.props.sector]
    }
    if(page === 4 && subPage === 1){
      temp = 'NOTÍCIAS'
    }
    this.props.saveHeader(temp, page, subPage, data)
  }

  changeSector(sector) {
    this.props.saveSector(sector)
    if (sector === 0) {
      this.props.saveHeader('AULAS DE DANÇA', 1, 1, {})
    } else {
      this.props.saveHeader('CLUBE DE VANTAGENS', 1, 1, {})
    }
    if(this.state.isMenuOpen){
      this.toggleMenu(false)
    }
  }

  goToLand() {
    this.props.navigation.navigate('LandSc', {sector: this.props.sector})
  }

  warnState(isWarnOpen) {
    this.setState({isWarnOpen})
  }

  discState(isDisconnectOpen) {
    this.setState({isDisconnectOpen})
  }

  premiumState(isPremiumOpen) {
    this.setState({isPremiumOpen})
  }

  loginState(bool) {
    if(this.state.isMenuOpen && bool){
      if(this.props.userData.ok) {
        this.discState(true)
      } else {
        this.moveMenu(false)
        setTimeout(() => {
          this.setState({isMenuOpen: false}, () => {
            this.setState({isLoginOpen: bool})
          })
        }, 250)
      }
    } else {
      this.setState({isLoginOpen: bool})
    }
  }

  registerState(bool) {
    this.setState({isRegisterOpen: bool})
  }

  resetState(bool) {
    this.setState({isResetOpen: bool})
  }

  voucherState(bool, data) {
    this.setState({voucherData: data ? data : {}}, () => {
      this.setState({isVoucherOpen: bool})
    })
  }

  warnOkay() {
    this.setState({isWarnOpen: false}, () => {
      this.setState({isLoginOpen: true})
    })
  }

  discOkay() {
    this.props.saveUserData({})
    this.props.saveVouchersList([])
    AsyncStorage.removeItem('LoginData', (err,result) => {});
    this.discState(false)
  }

  render() {
    const { sector, page, subPage, title, userData } = this.props
    const { isMenuOpen, voucherData } = this.state

    if(this.state.isLoginOpen){
      if(this.state.isResetOpen){
        return <ResetPassword loginState={this.loginState.bind(this)} registerState={this.registerState.bind(this)} resetState={this.resetState.bind(this)}/>
      }
      if(this.state.isRegisterOpen){
        return <Register loginState={this.loginState.bind(this)} registerState={this.registerState.bind(this)} resetState={this.resetState.bind(this)}/>
      }
      return <Login loginState={this.loginState.bind(this)} registerState={this.registerState.bind(this)} resetState={this.resetState.bind(this)}/>
    }

    return (
      <View style={Build.container}>

        <Modal animationType="fade" transparent={true} visible={this.state.isWarnOpen} onRequestClose={() => this.setState({isWarnOpen: false})}>
          <Warning title='Conteúdo bloqueado!' desc='Faça o login com sua conta para acessar este conteúdo.' warnState={this.warnState.bind(this)} warnOkay={this.warnOkay.bind(this)}/>
        </Modal>

        <Modal animationType="fade" transparent={true} visible={this.state.isPremiumOpen} onRequestClose={() => this.setState({isPremiumOpen: false})}>
          <Warning title='Conteúdo premium!' desc='Acesso disponível apenas para usuários premium.' warnState={this.premiumState.bind(this)}/>
        </Modal>

        <Modal animationType="fade" transparent={true} visible={this.state.isDisconnectOpen} onRequestClose={() => this.setState({isDisconnectOpen: false})}>
          <Warning title='Deseja desconectar?' leave={true} desc={userData.email} warnState={this.discState.bind(this)} userData={userData} warnOkay={this.discOkay.bind(this)}/>
        </Modal>

        <Modal animationType="fade" transparent={true} visible={this.state.isVoucherOpen} onRequestClose={() => this.setState({isVoucherOpen: false})}>
          <Voucher voucherState={this.voucherState.bind(this)} title={voucherData && voucherData.title ? voucherData.title : title} voucherData={this.state.voucherData} userData={userData}/>
        </Modal>

        <HeaderTop changePage={this.changePage.bind(this)} goToLand={this.goToLand.bind(this)} toggleMenu={this.toggleMenu.bind(this)} isMenuOpen={isMenuOpen}/>

        { page === 1 &&
          <View style={Build.container}>
            { sector === 0 ?
              <View style={Build.container}>
                { subPage === 1 &&
                  <Difficulty changePage={this.changePage.bind(this)}/>
                }
                { subPage === 2 &&
                  <Classes changePage={this.changePage.bind(this)}/>
                }
                { subPage === 3 &&
                  <SubClasses changePage={this.changePage.bind(this)} premiumState={this.premiumState.bind(this)} warnState={this.warnState.bind(this)} userData={userData}/>
                }
                { subPage === 4 &&
                  <DisplayClass changePage={this.changePage.bind(this)}/>
                }
              </View>
              :
              <View style={Build.container}>
                { subPage === 1 &&
                  <Categories changePage={this.changePage.bind(this)}/>
                }
                { subPage === 2 &&
                  <Promos changePage={this.changePage.bind(this)}/>
                }
                { subPage === 3 &&
                  <SubPromos changePage={this.changePage.bind(this)} premiumState={this.premiumState.bind(this)} warnState={this.warnState.bind(this)} userData={userData}/>
                }
                { subPage === 4 &&
                  <DisplayPromos changePage={this.changePage.bind(this)} loginState={this.loginState.bind(this)} voucherState={this.voucherState.bind(this)} warnState={this.warnState.bind(this)} userData={userData}/>
                }
              </View>
            }
          </View>
        }
        { page === 2 &&
          <About/>
        }
        { page === 3 &&
          <View style={Build.container}>
            { subPage === 1 &&
              <Events changePage={this.changePage.bind(this)}/>
            }
            { subPage === 2 &&
              <DisplayEvents changePage={this.changePage.bind(this)}/>
            }
          </View>
        }
        { page === 4 &&
          <View style={Build.container}>
            { subPage === 1 &&
              <News changePage={this.changePage.bind(this)}/>
            }
            { subPage === 2 &&
              <DisplayNews changePage={this.changePage.bind(this)}/>
            }
          </View>
        }
        { page === 5 &&
          <Notif/>
        }
        { page === 6 &&
          <MyVouchers changePage={this.changePage.bind(this)} userData={userData} changeSector={this.changeSector.bind(this)} voucherState={this.voucherState.bind(this)}/>
        }
        { isMenuOpen &&
          <Animated.View style={[Menu.closeContainer, {opacity: this.changeOpacity}]}>
            <TouchableOpacity style={{flex: 1}} activeOpacity={1} onPress={() => {this.toggleMenu(false)}}/>
          </Animated.View>
        }
        <Animated.View style={[Menu.menuContainer, {opacity: this.opacityMenu, transform: [{translateX: this.translateMenu}]}]}>
          <View style={Menu.topRow}>
            <Image source={require('../assets/images/black-logo-only/black-logo-only.png')} style={Menu.logo}/>
          </View>
          <ScrollView style={Menu.wrap}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('LandSc', {skip: true})} style={Menu.item}>
              <View style={Menu.icon}>
                <AntDesign
                  color={page === 1 ? Colors.blue : Colors.g666}
                  name='home'
                  size={moderateScale(26)}
                />
              </View>
              <RobotoMedium style={[Menu.title, {color: page === 1 ? Colors.blue : Colors.g666}]}>Home</RobotoMedium>
            </TouchableOpacity>
            <View style={Menu.innerWrap}>
              <TouchableOpacity onPress={() => this.changeSector(0)} style={Menu.item}>
                <View style={Menu.icon}>
                  <Feather
                    color={sector === 0 && page === 1 ? Colors.blue : Colors.g666}
                    name='corner-down-right'
                    size={moderateScale(22)}
                  />
                </View>
                <RobotoMedium style={[Menu.subTitle, {color: sector === 0 && page === 1 ? Colors.blue : Colors.g666}]}>Aulas de Dança</RobotoMedium>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.changeSector(1)} style={Menu.item}>
                <View style={Menu.icon}>
                  <Feather
                    color={sector === 1 && page === 1 ? Colors.blue : Colors.g666}
                    name='corner-down-right'
                    size={moderateScale(22)}
                  />
                </View>
                <RobotoMedium style={[Menu.subTitle, {color: sector === 1 && page === 1 ? Colors.blue : Colors.g666}]}>Clube de Vantagens</RobotoMedium>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => userData.ok ? this.changePage('MEUS VOUCHERS',6,1,{}) : this.warnState(true)} style={Menu.item}>
              <View style={Menu.icon}>
                <MaterialCommunityIcons
                  color={userData.ok && page === 6 ? Colors.blue : Colors.g666}
                  name='ticket-outline'
                  size={moderateScale(22)}
                />
              </View>
              <RobotoMedium style={[Menu.title, {color: userData.ok && page === 6 ? Colors.blue : Colors.g666}]}>Meus Vouchers</RobotoMedium>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.changePage('SOBRE',2,1,{})} style={Menu.item}>
              <View style={Menu.icon}>
                <MaterialCommunityIcons
                  color={page === 2 ? Colors.blue : Colors.g666}
                  name='text-subject'
                  size={moderateScale(26)}
                />
              </View>
              <RobotoMedium style={[Menu.title, {color: page === 2 ? Colors.blue : Colors.g666}]}>Sobre</RobotoMedium>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.changePage('EVENTOS',3,1,{})} style={Menu.item}>
              <View style={Menu.icon}>
                <AntDesign
                  color={page === 3 ? Colors.blue : Colors.g666}
                  name='calendar'
                  size={moderateScale(24)}
                />
              </View>
              <RobotoMedium style={[Menu.title, {color: page === 3 ? Colors.blue : Colors.g666}]}>Eventos</RobotoMedium>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.changePage('NOTÍCIAS',4,1,{})} style={Menu.item}>
              <View style={Menu.icon}>
                <FontAwesome
                  color={page === 4 ? Colors.blue : Colors.g666}
                  name='newspaper-o'
                  size={moderateScale(22)}
                />
              </View>
              <RobotoMedium style={[Menu.title, {color: page === 4 ? Colors.blue : Colors.g666}]}>Notícias</RobotoMedium>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.changePage('NOTIFICAÇÕES',5,1,{})} style={Menu.item}>
              <View style={Menu.icon}>
                <Feather
                  color={page === 5 ? Colors.blue : Colors.g666}
                  name='bell'
                  size={moderateScale(23)}
                />
              </View>
              <RobotoMedium style={[Menu.title, {color: page === 5 ? Colors.blue : Colors.g666}]}>Notificações</RobotoMedium>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.loginState(true)} style={Menu.item}>
              <View style={Menu.icon}>
                <Feather
                  color={Colors.g666}
                  name={userData.ok ? 'log-out' : 'log-in'}
                  size={moderateScale(23)}
                />
              </View>
              <RobotoMedium style={[Menu.title, {color: Colors.g666}]}>{userData.ok ? 'Desconectar' : 'Login'}</RobotoMedium>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      </View>
    )
  }
}


const mapStateToProps = store => ({
  initialData: store.initialDataState.initialData,
  notifData: store.notifDataState.notifData,
  newsData: store.newsDataState.newsData,
  sector: store.sectorState.sector,
  title: store.headerState.title,
  page: store.headerState.page,
  subPage: store.headerState.subPage,
  data: store.headerState.data,
  userData: store.userDataState.userData
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ saveHeader, saveSector, saveUserData, saveVouchersList }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BaseSc);
