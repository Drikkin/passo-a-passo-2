import React, { Component } from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity, Platform, Animated, Easing, Linking, BackHandler, Modal, AsyncStorage } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { saveSector, saveUserData, saveNewsData, saveNotifData, saveInitialData, saveEventsData, saveHeader, saveCategories, saveVouchersList } from '../actions'
import { SplashScreen } from 'expo'
import Loading from '../components/Loading.js'
import { RobotoRegular, RobotoBold } from '../components/Text.js'
import { scale, verticalScale, moderateScale } from '../styles/Scaling.js'
import { Build } from '../styles/Build'
import { Feather } from '@expo/vector-icons';
import { Log } from '../styles/Log'
import Login from '../components/Login.js'
import Register from '../components/Register.js'
import ResetPassword from '../components/ResetPassword.js'
import { Land, Slider } from '../styles/Land'
import Carousel from 'react-native-snap-carousel';

const MONTHS = {
  1: {id: 1, name: 'JAN'},
  2: {id: 2, name: 'FEV'},
  3: {id: 3, name: 'MAR'},
  4: {id: 4, name: 'ABR'},
  5: {id: 5, name: 'MAI'},
  6: {id: 6, name: 'JUN'},
  7: {id: 7, name: 'JUL'},
  8: {id: 8, name: 'AGO'},
  9: {id: 9, name: 'SET'},
  10: {id: 10, name: 'OUT'},
  11: {id: 11, name: 'NOV'},
  12: {id: 12, name: 'DEZ'},
}

const ROOT_LINK = 'http://agenciaprospecta.com.br/clientes/passoapassov2/wsapp/'

class LandSc extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      page: 0,
      loading: true,
      isLoginOpen: false,
      isRegisterOpen: false,
      isResetOpen: false,
    }

    this.loadedCheck = [false, false, false, false]
    this.opacity = new Animated.Value(0)
    this.compOpacity = new Animated.Value(0)
  }

  componentDidMount() {
    // AsyncStorage.removeItem('LoginData', (err,result) => {});
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.goBack)
    if(this.props.navigation.state.params && this.props.navigation.state.params.skip){
      this.fadeUp()
      this.compFadeUp()
      this.setState({page: 0, loading: false})
    } else {
      this.fetchFirst()
      this.fetchSecond()
      this.fetchThird()
      this.fetchFourth()
    }
  }

  goBack = () => {
    if(this.state.page == 1){
      this.pageState(0)
      return true
    }
    return false
  }

  componentDidUpdate(prevProps) {
    if( this.props.sector !== prevProps.sector){
      this.pageState(this.props.sector)
    }
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  async callCheck() {
    if(this.loadedCheck[0] && this.loadedCheck[1] && this.loadedCheck[2] && this.loadedCheck[3]){
      await AsyncStorage.getItem('LoginData', (err, result) => {
        if (err) {} else {
          if (result == null) {
            this.loginState(true)
            this.fadeUp()
            this.compFadeUp()
            this.setState({loading: false})
          } else {
            let parsedResult = JSON.parse(result)
            if(parsedResult.usuario){
              this.updateUserData(parsedResult)
            } else {
              this.loginState(true)
              this.fadeUp()
              this.compFadeUp()
              this.setState({loading: false})
            }
          }
        }
      });
    }
  }

  buildData(data){
    const aulas = data.aulas
    const result = [];
    const map = new Map();

    const count = aulas.reduce((a, b) => (
      { ...a,
        [b.categoria]: (a[b.categoria] || 0) + 1
      }
    ), {})

    aulas.forEach((item,i) => {
      if(!map.has(item.categoria)){
        map.set(item.categoria, true);
        result.push({
          count: count[item.categoria],
          categoria: item.categoria,
          categoria_id: item.categoria_id,
          categoria_imagem: item.categoria_imagem,
          titulo_detalhe: item.titulo_detalhe,
          cor: item.cor,
          id: i
        });
      }
    })

    var first = result.splice(0,4)

    this.props.saveCategories(first, result)
    this.loadedCheck[0] = true
    this.callCheck()
  }

  updateUserData(userData) {
      fetch(ROOT_LINK + `updateLogin.php?id=${userData.usuario}&email=${userData.email}`, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.ok === true){
        AsyncStorage.setItem('LoginData', JSON.stringify(data), (err,result) => {});
        this.props.saveUserData(data)
        if(data.usuario){
          this.fetchVouchers(data.usuario)
        }
        this.loginState(false)
      } else {
        this.loginState(true)
        AsyncStorage.removeItem('LoginData', (err,result) => {});
        this.props.saveVouchersList([])
        this.props.saveUserData({})
      }
    })
    .catch((error) => {
      this.loginState(true)
      AsyncStorage.removeItem('LoginData', (err,result) => {});
      this.props.saveVouchersList([])
      this.props.saveUserData({})
      console.log(error)
    });
  }

  fetchFirst() {
      fetch(ROOT_LINK + 'inicio-pipter.php', {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
      this.props.saveInitialData(data)
      this.buildData(data)
    })
    .catch((error) => {
      if(this.loadedCheck[0] == false){
        setTimeout(() => {this.fetchFirst()}, 500)
      }
      console.log(error)
    });
  }

  fetchSecond() {
    fetch(ROOT_LINK + 'getnotificacoes.php', {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
      this.props.saveNotifData(data)
      this.loadedCheck[1] = true
      this.callCheck()
    })
    .catch((error) => {
      if(this.loadedCheck[1] == false){
        setTimeout(() => {this.fetchSecond()}, 500)
      }
      console.log(error)
    });
  }

  fetchThird() {
    fetch(ROOT_LINK + 'noticias.php', {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
      this.props.saveNewsData(data)
      this.loadedCheck[2] = true
      this.callCheck()
    })
    .catch((error) => {
      if(this.loadedCheck[2] == false){
        setTimeout(() => {this.fetchThird()}, 500)
      }
      console.log(error)
    });
  }

  fetchFourth() {
    fetch(ROOT_LINK + 'agenda-pipter.php', {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
      const formatedData = data.map(item => {
        let temp = item.data.split('/'),
            dataCurta = temp[0] + '/' + MONTHS[Number(temp[1])].name
        return {...item, dataCurta}
      })
      this.props.saveEventsData(formatedData)
      this.loadedCheck[3] = true
      this.callCheck()
    })
    .catch((error) => {
      if(this.loadedCheck[3] == false){
        setTimeout(() => {this.fetchFourth()}, 500)
      }
      console.log(error)
    });
  }

  fetchVouchers(aluno_id) {
    fetch(ROOT_LINK + `getVouchers.php?aluno_id=${aluno_id}`, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
      this.props.saveVouchersList(data)
      this.fadeUp()
      this.compFadeUp()
      this.setState({loading: false})
    })
    .catch((error) => {
      this.fadeUp()
      this.compFadeUp()
      this.setState({loading: false})
    });
  }

  fadeUp() {
    Animated.timing(
      this.opacity,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start()
  }

  compFadeUp() {
    Animated.timing(
      this.compOpacity,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start()
  }

  renderCaItem = ({item, index}) => (
    <TouchableOpacity key={index} onPress={() => {this.goToSelected(item)}} activeOpacity={0.6}>
      <Image source={{uri: item.imagem}} style={Land.sliderImg}/>
    </TouchableOpacity>
  )

  goTo(sector) {
    var item = {
      reset: true
    }
    this.props.saveSector(sector)
    if(sector == 0){
      this.props.saveHeader('AULAS DE DANÇA',1,1,{})
    } else {
      this.props.saveHeader('CLUBE DE VANTAGENS',1,1,item)
    }
    this.props.navigation.navigate('BaseSc')
  }

  goToSelected(item) {
    this.props.saveSector(1)
    this.props.saveHeader('CLUBE DE VANTAGENS',1,1,item)
    this.props.navigation.navigate('BaseSc')
  }

  openSite() {
    Linking.openURL('http://www.soupassoapasso.com.br/')
  }

  loginState(bool) {
    this.setState({isLoginOpen: bool, isRegisterOpen: false})
  }

  registerState(bool) {
    this.setState({isRegisterOpen: bool})
  }

  resetState(bool) {
    this.setState({isResetOpen: bool})
  }

  pageState(page) {
    this.compOpacity = new Animated.Value(0)
    this.setState({page})
    this.compFadeUp()
  }

  render() {

    const { page } = this.state

    if(this.state.isLoginOpen){
      if(this.state.isResetOpen){
        return <ResetPassword loginState={this.loginState.bind(this)} registerState={this.registerState.bind(this)} resetState={this.resetState.bind(this)}/>
      }
      if(this.state.isRegisterOpen){
        return <Register loginState={this.loginState.bind(this)} registerState={this.registerState.bind(this)} resetState={this.resetState.bind(this)} fromLand={true}/>
      }
      return <Login loginState={this.loginState.bind(this)} registerState={this.registerState.bind(this)} resetState={this.resetState.bind(this)} fromLand={true}/>
    }

    return (
      <ImageBackground
        source={require('../assets/images/plano-de-fundo/plano-de-fundo.png')}
        style={Build.container}
        onLoadEnd={() => {
          console.log('Image#onLoadEnd: hiding SplashScreen');
            SplashScreen.hide();
        }}
        fadeDuration={0}>

        <Animated.View style={[Land.containerSimple, {opacity: this.opacity}]}>
          <Image source={require('../assets/images/land-logo/land-logo.png')} style={Land.logo}/>
        </Animated.View>
        { page == 1 &&
          <Animated.View style={[Log.icon, {opacity: this.compOpacity}]}>
            <TouchableOpacity onPress={() => {this.pageState(0)}}>
              <Feather
                color='#fff'
                name='chevron-left'
                size={moderateScale(30)}
                />
            </TouchableOpacity>
          </Animated.View>
        }
        { page == 0 ?
          <Animated.View style={[Land.container, {opacity: this.compOpacity}]}>
            <View style={Land.buttonsRow}>
              <TouchableOpacity disabled={this.state.loading} activeOpacity={0.6} onPress={() => this.goTo(0)} style={Land.buttonContainer}>
                <Image source={require('../assets/images/aulas-de-danca/aulas-de-danca.png')} style={Land.buttomImgClass}/>
                <View style={Land.buttonBackground}/>
                <RobotoRegular style={Land.buttonTxt}>AULAS DE</RobotoRegular>
                <RobotoRegular style={Land.buttonTxt}>DANÇA</RobotoRegular>
              </TouchableOpacity>
              <TouchableOpacity disabled={this.state.loading} activeOpacity={0.6} onPress={() => this.pageState(1)} style={Land.buttonContainer}>
                <Image source={require('../assets/images/clube-de-vantagens/clube-de-vantagens.png')} style={Land.buttomImgClub}/>
                <View style={Land.buttonBackground}/>
                <RobotoRegular style={Land.buttonTxt}>CLUBE DE</RobotoRegular>
                <RobotoRegular style={Land.buttonTxt}>VANTAGENS</RobotoRegular>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity disabled={this.state.loading} onPress={() => this.openSite()}>
                <RobotoRegular style={Land.siteTxt}>www.soupassoapasso.com.br</RobotoRegular>
              </TouchableOpacity>
            </View>
          </Animated.View>
          :
          <Animated.View style={[Land.anotherContainer, {opacity: this.compOpacity}]}>
            <View style={Land.anotherOneRly}>
              <View style={Land.carouselContainer}>
                <Carousel
                  loop={true}
                  data={this.props.initialData.parceiros}
                  renderItem={this.renderCaItem}
                  sliderWidth={Slider.sliderWidth}
                  itemWidth={Slider.itemWidth}
                  loopClonesPerSide={6}
                  autoplay={true}
                  autoplayDelay={2000}
                  autoplayInterval={3000}
                  inactiveSlideOpacity={1}
                  inactiveSlideScale={0.8}
                  enableMomentum={true}
                  />
              </View>
            </View>
            <TouchableOpacity activeOpacity={0} onPress={() => this.goTo(1)} style={Land.preButton}>
              <RobotoRegular style={Land.preTxt}>VER TODOS</RobotoRegular>
            </TouchableOpacity>
          </Animated.View>
        }
      </ImageBackground>
    )
  }
}

const mapStateToProps = store => ({
  initialData: store.initialDataState.initialData,
  sector: store.sectorState.sector,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ saveSector, saveEventsData, saveNewsData, saveNotifData, saveInitialData, saveVouchersList, saveUserData, saveHeader, saveCategories }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LandSc);
