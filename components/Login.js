import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Linking, ImageBackground, Image, Alert, TextInput, AsyncStorage, TouchableWithoutFeedback, Keyboard, BackHandler, Platform} from 'react-native';
import { Log, AwareHeight } from "../styles/Log.js"
import { Build } from "../styles/Build.js"
import { Land } from "../styles/Land.js"
import { Colors } from '../styles/Colors'
import { RobotoRegular, RobotoBold, RobotoMedium } from './Text.js'
import { AntDesign } from '@expo/vector-icons';
import { moderateScale } from '../styles/Scaling'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { bindActionCreators } from 'redux';
import Loading from './Loading'
import { connect } from 'react-redux';
import { saveUserData, saveVouchersList } from '../actions'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions';
import Sentry from 'sentry-expo';

// import SafariView from "react-native-safari-view";
// var SafariView = require('react-native-safari-view');
const ROOT_LINK = 'http://agenciaprospecta.com.br/clientes/passoapassov2/wsapp/'

const IS_IOS = Platform.OS == 'ios'

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback style={{flex: 1}} onPress={() => {Keyboard.dismiss()}}>
    {children}
  </TouchableWithoutFeedback>
)



class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',

      loading: false,
      error: ' ',
    }
  }

  // AsyncStorage.getItem('LoginData', (err, result) => {
  // if (err) {} else {
  //   if (result == null) {
  //     this.props.navigation.navigate('Intro')
  //     AsyncStorage.setItem('LoginData', JSON.stringify({"data":"data"}), (err,result) => {});
  //   }
  // }});

  // AsyncStorage.setItem('LoginData', JSON.stringify({"data": data}), (err,result) => {});

  // AsyncStorage.removeItem('LoginData', (err,result) => {});

  async login() {
    console.log('LOGIN');
    this.setState({error: 'Conectando...', loading: true})
    var obj = {
      email: this.state.username.trim(),
      senha: this.state.password.trim()
    }
    let fcmData = await this.registerForPushNotificationsAsync(),
        fetchLink = `login.php?email=${obj.email}&senha=${obj.senha}`
    if(fcmData && fcmData.fcmToken){
      console.log(fcmData);
      fetchLink = `login.php?email=${obj.email}&senha=${obj.senha}&fcmtoken=${fcmData.fcmToken}`
      Sentry.captureMessage(`login.php?email=${obj.email}&fcmtoken=${fcmData.fcmToken}`)
    }
    console.log(fetchLink);

    fetch( ROOT_LINK + fetchLink, {
      method: 'POST',
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.ok === true){
        AsyncStorage.setItem('LoginData', JSON.stringify(data), (err,result) => {});
        this.props.saveUserData(data)
        if(data.usuario){
          this.fetchVouchers(data.usuario)
        } else {
          this.fakeIt()
        }
      } else {
        this.setState({error: data.msg, loading: false})
      }
    })
    .catch((error) => {
      this.setState({error: 'Erro ao realizar o login', loading: false})
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
      this.fakeIt()
    })
    .catch((error) => {
      this.fakeIt()
      console.log(error)
    });
  }

  fakeIt() {
    this.setState({error: 'Ok!'})
    setTimeout(() => {this.props.loginState(false)}, 500)
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if(this.props.fromLand) {
        return false;
      } else {
        this.props.loginState(false)
      }
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  async registerForPushNotificationsAsync() {
    console.log('get push');
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    console.log('finalStatus 1', finalStatus);

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }
    console.log('finalStatus 2', finalStatus);

    let token = await Notifications.getExpoPushTokenAsync();
    console.log('token', token);
    var data = {
      fcmToken: token
    }

    return data
  }

  handleLogin() {
    const { username, password } = this.state
    Keyboard.dismiss()
    if ( username.trim().length > 0 && password.trim().length > 0) {
      this.login()
    } else {
      this.setState({error: 'Preencha os campos para continuar'})
    }
  }

  handleNew() {
    this.props.registerState(true)
  }

  handleReset() {
    this.setState({error: ' '})
    this.props.resetState(true)
    // Alert.alert('senha')
  }


  render() {

    const { loginState } = this.props
    const { loading } = this.state

    return (
      <ImageBackground source={require('../assets/images/plano-de-fundo/plano-de-fundo.png')} style={Log.containerTop}>

        <KeyboardAwareScrollView
          style={Log.scrollContainer}
          contentContainerStyle={Log.scrollContentContainer}
          enableOnAndroid
          enableAutomaticScroll
          showsVerticalScrollIndicator={false}
          extraHeight={AwareHeight}>

          <Image source={require('../assets/images/land-logo/land-logo.png')} style={Land.logoSm}/>
          <Text style={Log.errorTxt}>{this.state.error}</Text>
          <View style={Log.inputcontainer}>
            <View style={Log.inputLeft}>
              <AntDesign
                color={Colors.white}
                name='mail'
                size={moderateScale(26)}
              />
            </View>
            <TextInput
              ref={ref => this.userInput = ref}
              blurOnSubmit={false}
              returnKeyType={"next"}
              onSubmitEditing={() => this.passInput.focus()}
              autoCapitalize='none'
              placeholder='Email'
              editable={!loading} selectTextOnFocus={!loading}
              keyboardType='email-address'
              placeholderTextColor={Colors.white}
              maxLength={128}
              onChangeText={text => this.setState({username: text})}
              style={Log.input}>
              {this.state.username}
            </TextInput>
          </View>
          <View style={Log.inputcontainer}>
            <View style={Log.inputLeft}>
              <AntDesign
                color={Colors.white}
                name='lock'
                size={moderateScale(26)}
              />
            </View>
            <TextInput
              ref={ref => this.passInput = ref}
              secureTextEntry={true}
              returnKeyType={"done"}
              placeholder='Senha'
              blurOnSubmit={true}
              autoCapitalize='none'
              editable={!loading} selectTextOnFocus={!loading}
              placeholderTextColor={Colors.white}
              onSubmitEditing={() => {this.handleLogin()}}
              maxLength={128}
              onChangeText={text => this.setState({password: text})}
              style={Log.input}
              textContentType='password'>
              {this.state.password}
            </TextInput>
          </View>
          { this.props.fromLand ?
            <View>
              <View style={Log.buttonRow}>
                <TouchableOpacity disabled={loading} onPress={() => {this.handleLogin()}} style={[Log.button2, {borderColor: Colors.lightBlue, backgroundColor: Colors.lightBlue}]}>
                  { loading ?
                    <Loading color={Colors.white} size={30}/>
                    :
                    <RobotoMedium style={Log.buttonTxt}>Entrar</RobotoMedium>
                  }
                </TouchableOpacity>
              </View>
              <View style={Log.buttonRow}>
                <TouchableOpacity disabled={loading} onPress={() => {loginState(false)}} style={[Log.button, {borderColor: Colors.lightBlue, backgroundColor: '#00000055'}]}>
                  <RobotoRegular style={Log.buttonTxt}>Continuar sem conta</RobotoRegular>
                </TouchableOpacity>
                <TouchableOpacity disabled={loading} onPress={() => {this.handleNew()}} style={[Log.button, {borderColor: Colors.lightBlue, backgroundColor: '#00000055'}]}>
                  <RobotoRegular style={Log.buttonTxt}>Criar conta</RobotoRegular>
                </TouchableOpacity>
              </View>
              <TouchableOpacity disabled={loading} onPress={() => {this.handleReset()}}>
                <RobotoRegular style={Log.resetTxt}>Esqueceu sua senha ?</RobotoRegular>
              </TouchableOpacity>
            </View>
            :
            <View>
              <View style={Log.buttonRow}>
                <TouchableOpacity disabled={loading} onPress={() => {this.handleNew()}} style={[Log.button, {borderColor: Colors.lightBlue, backgroundColor: '#00000055'}]}>
                  <RobotoRegular style={Log.buttonTxt}>Criar conta</RobotoRegular>
                </TouchableOpacity>
                <TouchableOpacity disabled={loading} onPress={() => {this.handleLogin()}} style={[Log.button, {borderColor: Colors.lightBlue, backgroundColor: Colors.lightBlue}]}>
                  { loading ?
                    <Loading color={Colors.white} size={30}/>
                    :
                    <RobotoMedium style={Log.buttonTxt}>Entrar</RobotoMedium>
                  }
                </TouchableOpacity>
              </View>
              <TouchableOpacity disabled={loading} onPress={() => {this.handleReset()}}>
                <RobotoRegular style={Log.resetTxt}>Esqueceu sua senha ?</RobotoRegular>
              </TouchableOpacity>
            </View>
          }
        </KeyboardAwareScrollView>
        { !this.props.fromLand &&
          <TouchableOpacity style={Log.icon} onPress={() => {loginState(false)}}>
            <AntDesign
              color={Colors.white}
              name='close'
              size={moderateScale(26)}
              />
          </TouchableOpacity>
        }
      </ImageBackground>
    )
  }
}

// <TouchableOpacity onPress={() => {this.handleReset()}}>
//   <RobotoRegular style={Log.resetTxt}>Esqueceu sua senha ?</RobotoRegular>
// </TouchableOpacity>


const mapStateToProps = store => ({
  userData: store.userDataState.userData,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ saveUserData, saveVouchersList }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
