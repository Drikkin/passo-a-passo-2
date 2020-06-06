import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Linking, ImageBackground, Image, Alert, TextInput, AsyncStorage, TouchableWithoutFeedback, Keyboard, BackHandler, Platform} from 'react-native';
import { Log, AwareHeight } from "../styles/Log.js"
import { Build } from "../styles/Build.js"
import { Land } from "../styles/Land.js"
import { Header } from "../styles/Header.js"
import { Colors } from '../styles/Colors'
import { RobotoRegular, RobotoBold, RobotoMedium } from './Text.js'
import { AntDesign } from '@expo/vector-icons';
import { moderateScale } from '../styles/Scaling'
import Loading from './Loading'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { saveUserData } from '../actions'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions';
import removeAccents from 'remove-accents'

import { TextInputMask } from 'react-native-masked-text'
import * as EmailValidator from 'email-validator';

const IS_IOS = Platform.OS == 'ios'
const ROOT_LINK = 'http://agenciaprospecta.com.br/clientes/passoapassov2/wsapp/'
const INVALID_DDD = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
'00', '01', '02', '03', '04', '05', '06', '07', '08', '09',
'10', '20', '23', '25', '26', '29', '30', '36', '39', '40',
'50', '52', '56', '57', '58', '59', '60', '70', '72', '76',
'78', '80', '90']

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback style={{flex: 1}} onPress={() => {Keyboard.dismiss()}}>
    {children}
  </TouchableWithoutFeedback>
)

class Register extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      phone: '',
      password: '',
      passconfirm: '',

      error: '',
      back: false,
      loading: false,
    }
  }

  changeInput(name, text) {
    this.setState({[name]: text, back: false, error: ''})
  }

  async register() {
    this.setState({error: 'Criando Conta...', loading: true, error: ' ', back: false})

    var obj = {
      nome: removeAccents(this.state.username).trim(),
      email: this.state.email.trim(),
      telefone: this.state.phone.trim(),
      senha: this.state.password.trim(),
    }

    let fcmData = await this.registerForPushNotificationsAsync(),
        fetchLink = `cadastrarApp.php?email=${obj.email}&telefone=${obj.telefone}&nome=${obj.nome}&senha=${obj.senha}`
    if(fcmData && fcmData.fcmToken){
      fetchLink = `cadastrarApp.php?email=${obj.email}&telefone=${obj.telefone}&nome=${obj.nome}&senha=${obj.senha}&fcmtoken=${fcmData.fcmToken}`
    }
    fetch( ROOT_LINK + fetchLink, {
      method: 'POST',
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.ok === true){
        this.login(obj.email, obj.senha)
      } else {
        let back = data.back === true
        this.setState({error: data.msg, back, loading: false})
      }
    })
    .catch((error) => {
      this.setState({error: 'Erro ao completar o cadastro', loading: false})
      console.log('reg error', error)
    });
  }

  async login(email, senha) {
    this.setState({error: 'Conectando...'})
    let fcmData = await this.registerForPushNotificationsAsync(),
        fetchLink = `login.php?email=${email}&senha=${senha}`
    if(fcmData && fcmData.fcmToken){
      fetchLink = `login.php?email=${email}&senha=${senha}&fcmtoken=${fcmData.fcmToken}`
    }

    fetch( ROOT_LINK + fetchLink, {
      method: 'POST',
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.ok === true){
        AsyncStorage.setItem('LoginData', JSON.stringify(data), (err,result) => {});
        this.props.saveUserData(data)
        this.fakeIt()
      } else {
        this.setState({error: data.msg, loading: false})
        this.leave()
      }
    })
    .catch((error) => {
      console.log(error)
      this.setState({error: 'Erro ao realizar o login', loading: false})
      this.leave()
    });
  }

  fakeIt() {
    this.setState({error: 'Ok!'})
    setTimeout(() => {
      this.setState({
        username: '',
        email: '',
        phone: '',
        password: '',
        passconfirm: '',
      })
      this.props.registerState(false)
      this.props.loginState(false)
    }, 500)
  }

  leave = () => {
    this.setState({
      username: '',
      email: '',
      phone: '',
      password: '',
      passconfirm: '',
    })
    this.props.registerState(false)
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.leave()
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  async registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }

    let token = await Notifications.getExpoPushTokenAsync();

    var data = {
      fcmToken: token
    }

    return data
  }

  handleRegister = () => {
    const { username, email, phone, password, passconfirm } = this.state
    const unmasked = this.phoneInput.getRawValue()

    Keyboard.dismiss()
    if ( username.trim().length > 0 &&
      email.trim().length > 0 &&
      password.trim().length > 0 &&
      passconfirm.trim().length > 0 ) {
      if(!EmailValidator.validate(email)){
        this.setState({error: 'Email Inválido.'})
        return
      }

      let ddd = unmasked.substring(0, 2), rest = ddd % 10

      if(unmasked.length > 0 && unmasked.length < 10){
        this.setState({error: 'Telefone inválido'})
        return
      }
			if (unmasked.length > 0 && (INVALID_DDD.includes(String(ddd)) || rest === 0)) {
        this.setState({error: 'DDD inválido'})
        return
			}

      if(password.trim().length < 6){
        this.setState({error: 'A senha precisa possuir 6 ou mais caracteres.'})
        return
      }
      if(password === passconfirm){
        this.register()
      } else {
        this.setState({error: 'As senhas não coincidem.'})
        return
      }
    } else {
      this.setState({error: 'Preencha os campos para continuar'})
    }
  }

  render() {

    const { loading } = this.state

    return (
      <ImageBackground source={require('../assets/images/plano-de-fundo/plano-de-fundo.png')} style={Log.containerTop}>

        <KeyboardAwareScrollView
          contentContainerStyle={Log.scrollContentContainer}
          showsVerticalScrollIndicator={false}
          enableAutomaticScroll
          enableOnAndroid>

          <View>
            <Image source={require('../assets/images/land-logo/land-logo.png')} style={Land.logoXs}/>
          </View>

          <View style={Log.inputcontainer}>
            <View style={Log.inputLeft}>
              <AntDesign
                color={Colors.white}
                name='user'
                size={moderateScale(26)}
              />
            </View>
            <TextInput
              ref={ref => this.userInput = ref}
              blurOnSubmit={false}
              returnKeyType="done"
              onSubmitEditing={() => this.emailInput.focus()}
              autoCapitalize='words'
              placeholder='Nome *'
              placeholderTextColor={Colors.white}
              editable={!loading} selectTextOnFocus={!loading}
              maxLength={128}
              onChangeText={username => this.changeInput('username', username)}
              style={Log.input}>
              {this.state.username}
            </TextInput>
          </View>

          <View style={Log.inputcontainer}>
            <View style={Log.inputLeft}>
              <AntDesign
                color={Colors.white}
                name='mail'
                size={moderateScale(26)}
              />
            </View>
            <TextInput
              ref={ref => this.emailInput = ref}
              blurOnSubmit={false}
              returnKeyType="next"
              onSubmitEditing={() => this.phoneInput.getElement().focus()}
              autoCapitalize='none'
              type="email"
              placeholder='Email *'
              keyboardType='email-address'
              editable={!loading} selectTextOnFocus={!loading}
              placeholderTextColor={Colors.white}
              maxLength={128}
              onChangeText={email => this.changeInput('email', email)}
              style={Log.input}>
              {this.state.email}
            </TextInput>
          </View>

          <View style={Log.inputcontainer}>
            <View style={Log.inputLeft}>
              <AntDesign
                color={Colors.white}
                name='phone'
                size={moderateScale(26)}
              />
            </View>
            <TextInputMask
              ref={ref => this.phoneInput = ref}
              style={Log.input}
              placeholder='Telefone'
              blurOnSubmit={false}
              editable={!loading} selectTextOnFocus={!loading}
              placeholderTextColor={Colors.white}
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) '
              }}
              returnKeyType="next"
              keyboardType='number-pad'
              onSubmitEditing={() => this.passInput.focus()}
              onChangeText={phone => this.changeInput('phone', phone)}
              maxLength={15}
              value={this.state.phone}
            />
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
              returnKeyType="next"
              placeholder='Senha *'
              blurOnSubmit={false}
              autoCapitalize='none'
              editable={!loading} selectTextOnFocus={!loading}
              placeholderTextColor={Colors.white}
              onSubmitEditing={() => this.confInput.focus()}
              maxLength={128}
              onChangeText={password => this.changeInput('password', password)}
              style={Log.input}
              textContentType='password'>
              {this.state.password}
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
              ref={ref => this.confInput = ref}
              secureTextEntry={true}
              returnKeyType="done"
              placeholder='Confirmar Senha *'
              blurOnSubmit={true}
              autoCapitalize='none'
              editable={!loading} selectTextOnFocus={!loading}
              placeholderTextColor={Colors.white}
              onSubmitEditing={() => {this.handleRegister()}}
              maxLength={128}
              onChangeText={passconfirm => this.changeInput('passconfirm', passconfirm)}
              style={Log.input}
              textContentType='password'>
              {this.state.passconfirm}
            </TextInput>
          </View>

          <Text style={Log.errorTxt}>
            {this.state.error} {' '}
            {this.state.back === true && <Text>
              Já possuir cadastro? {' '}
              <Text style={{textDecorationLine: 'underline', color: Colors.lightBlue}} onPress={() => {this.leave()}}>
                Clique aqui</Text>
            </Text> }
          </Text>

          <View style={Log.buttonRow}>
            <TouchableOpacity disabled={loading} onPress={() => {this.handleRegister()}} style={[Log.button2, {borderColor: Colors.lightBlue, backgroundColor: Colors.lightBlue}]}>
              { loading ?
                <Loading color={Colors.white} size={30}/>
                :
                <RobotoMedium style={Log.buttonTxt}>Criar Conta</RobotoMedium>
              }
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>

        {!loading &&
          <TouchableOpacity style={Log.icon} onPress={() => {this.leave()}}>
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

const mapStateToProps = store => ({
  userData: store.userDataState.userData,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ saveUserData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);
