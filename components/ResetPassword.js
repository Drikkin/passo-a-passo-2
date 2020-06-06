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

class ResetPassword extends Component {

  constructor(props) {
    super(props)

    this.state = {
      passCode: '',

      email: '',
      userCode: '',
      password: '',
      passconfirm: '',

      page: 0,
      error: '',
      loading: false,
    }
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if(this.state.page === 0){
        this.leave()
      } else {
        this.changePage(0)
      }
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  reset() {
    this.setState({error: 'Salvando Dados...', loading: true})

    var obj = {
      email: this.state.email.trim(),
      senha: this.state.userCode.trim(),
      novasenha: this.state.password.trim(),
    }

    fetch( ROOT_LINK + `setNewPassword.php?senha=${obj.senha}&novasenha=${obj.novasenha}&email=${obj.email}`, {
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
      }
    })
    .catch((error) => {
      this.setState({error: 'Erro ao salvar senhas', loading: false})
      console.log('reg error', error)
    });
  }

  checkEmail() {
    this.setState({error: 'Verificando Email...', loading: true})

    var obj = {
      email: this.state.email.trim()
    }

    fetch( ROOT_LINK + `recuperarsenha.php?&email=${obj.email}`, {
      method: 'POST',
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.ok === true){
        this.changePage(1)
        this.setState({passCode: data.np})
      } else {
        this.setState({error: data.msg, loading: false})
      }
    })
    .catch((error) => {
      this.setState({error: 'Erro ao verificar email', loading: false})
      console.log('reg error', error)
    });
  }

  fakeIt() {
    this.setState({error: 'Ok!'})
    setTimeout(() => {
      this.setState({
        email: '',
        userCode: '',
        password: '',
        passconfirm: '',
        passCode: ''
      })
      this.props.resetState(false)
      this.props.loginState(false)
    }, 500)
  }

  leave = () => {
    this.setState({
      email: '',
      userCode: '',
      password: '',
      passconfirm: '',
      passCode: ''
    })
    this.props.resetState(false)
  }

  changePage = (page) => {
    this.setState({page, userCode: '', password: '', passconfirm: '', error: '', loading: false})
    if(page === 0){
      this.setState({passCode: ''})
    }
  }

  sendCode = () => {
    const email = this.state.email.replace(/\s/g,'');
    this.setState({email}, () => {
      if(email.trim().length > 4 && /.+@.+\.[A-Za-z]+$/.test(email)){
        this.checkEmail()
      } else {
        this.setState({error: 'Email Inválido', loading: false})
      }
    })
  }

  handleReset = () => {
    const { userCode, password, passconfirm, passCode } = this.state

    Keyboard.dismiss()
    if ( userCode.trim().length > 0 &&
      password.trim().length > 0 &&
      passconfirm.trim().length > 0 ) {

      if(userCode.trim().length < 6){
        this.setState({error: 'A senha antiga precisa possuir 6 ou mais caracteres.'})
        return
      }
      if(password.trim().length < 6 || passconfirm.trim().length < 6){
        this.setState({error: 'A sua nova senha precisa possuir 6 ou mais caracteres.'})
        return
      }

      if(password === passconfirm ){
        if(passCode === userCode){
          this.reset()
        } else {
          this.setState({error: 'Código de segurança inválido'})
          return
        }
      } else {
        this.setState({error: 'As senhas não coincidem.'})
        return
      }
    } else {
      this.setState({error: 'Preencha os campos para continuar'})
    }
  }

  render() {

    const { loading, error, email, userCode, password, passconfirm, page } = this.state

    return (
      <ImageBackground source={require('../assets/images/plano-de-fundo/plano-de-fundo.png')} style={Log.containerTop}>
        { page === 0 &&
          <KeyboardAwareScrollView
            contentContainerStyle={Log.scrollContentContainer}
            showsVerticalScrollIndicator={false}
            enableAutomaticScroll
            enableOnAndroid>

            <View>
              <Image source={require('../assets/images/land-logo/land-logo.png')} style={Land.logoXs}/>
            </View>

            <View style={{padding: moderateScale(20)}}>
              <RobotoMedium style={{color: Colors.white, textAlign: 'center', fontSize: moderateScale(18), marginBottom: moderateScale(10)}}>
                Alterar senha
              </RobotoMedium>
              <RobotoRegular style={{color: Colors.white, textAlign: 'center', fontSize: moderateScale(14)}}>
                Para alterar sua senha, um código de segurança será enviado para o seu e-mail.
              </RobotoRegular>
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
                blurOnSubmit={true}
                returnKeyType="done"
                onSubmitEditing={() => this.sendCode()}
                autoCapitalize='none'
                type="email"
                placeholder='Email'
                keyboardType='email-address'
                editable={!loading} selectTextOnFocus={!loading}
                placeholderTextColor={Colors.white}
                maxLength={128}
                onChangeText={email => this.setState({email})}
                style={Log.input}>
                {this.state.email}
              </TextInput>
            </View>

            <Text style={Log.errorTxt}>{this.state.error}</Text>

            <View style={Log.buttonRow}>
              <TouchableOpacity disabled={loading} onPress={() => {this.sendCode()}} style={[Log.button2, {borderColor: Colors.lightBlue, backgroundColor: Colors.lightBlue}]}>
                { loading ?
                  <Loading color={Colors.white} size={30}/>
                  :
                  <RobotoMedium style={Log.buttonTxt}>Enviar código</RobotoMedium>
                }
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        }
        { page === 1 &&
          <KeyboardAwareScrollView
            contentContainerStyle={Log.scrollContentContainer}
            showsVerticalScrollIndicator={false}
            enableAutomaticScroll
            enableOnAndroid>

            <View>
              <Image source={require('../assets/images/land-logo/land-logo.png')} style={Land.logoXs}/>
            </View>

            <View style={{padding: moderateScale(20)}}>
              <RobotoRegular style={{color: Colors.white, textAlign: 'center', fontSize: moderateScale(14)}}>
                Código de segurança foi enviado para
              </RobotoRegular>
              <RobotoMedium style={{color: Colors.white, textAlign: 'center', fontSize: moderateScale(14)}}>
                {email}
              </RobotoMedium>
            </View>

            <View style={Log.inputcontainer}>
              <View style={Log.inputLeft}>
                <AntDesign
                  color={Colors.white}
                  name='unlock'
                  size={moderateScale(26)}
                />
              </View>
              <TextInput
                ref={ref => this.oldInput = ref}
                returnKeyType="next"
                placeholder='Código de Segurança'
                blurOnSubmit={false}
                autoCapitalize='none'
                editable={!loading} selectTextOnFocus={!loading}
                placeholderTextColor={Colors.white}
                onSubmitEditing={() => this.passInput.focus()}
                maxLength={128}
                onChangeText={userCode => this.setState({userCode})}
                style={Log.input}
                >
                {this.state.userCode}
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
                returnKeyType="next"
                placeholder='Nova Senha'
                blurOnSubmit={false}
                autoCapitalize='none'
                editable={!loading} selectTextOnFocus={!loading}
                placeholderTextColor={Colors.white}
                onSubmitEditing={() => this.confInput.focus()}
                maxLength={128}
                onChangeText={password => this.setState({password})}
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
                placeholder='Confirmar Senha'
                blurOnSubmit={true}
                autoCapitalize='none'
                editable={!loading} selectTextOnFocus={!loading}
                placeholderTextColor={Colors.white}
                onSubmitEditing={() => {this.handleReset()}}
                maxLength={128}
                onChangeText={passconfirm => this.setState({passconfirm})}
                style={Log.input}
                textContentType='password'>
                {this.state.passconfirm}
              </TextInput>
            </View>

            <Text style={Log.errorTxt}>{this.state.error}</Text>

            <View>
              <View style={Log.buttonRow}>
                <TouchableOpacity disabled={loading} onPress={() => {this.handleReset()}} style={[Log.button2, {borderColor: Colors.lightBlue, backgroundColor: Colors.lightBlue}]}>
                  { loading ?
                    <Loading color={Colors.white} size={30}/>
                    :
                    <RobotoMedium style={Log.buttonTxt}>Confirmar</RobotoMedium>
                  }
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
        }

        {!loading &&
          <TouchableOpacity style={Log.icon} onPress={() => {page === 0 ? this.leave() : this.changePage(0)}}>
            <AntDesign
              color={Colors.white}
              name={page === 0 ? 'close' : 'left'}
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
