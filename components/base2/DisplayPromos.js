import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { Text, View, ScrollView, Image, ImageBackground, TouchableOpacity, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RobotoRegular, RobotoBold, RobotoMedium } from '../Text.js'
import { saveUserData } from '../../actions'
import { scale, verticalScale, moderateScale } from '../../styles/Scaling.js'
import { Build } from '../../styles/Build'
import { Item } from '../../styles/Item'
import { Colors } from '../../styles/Colors'
import { Desc } from '../../styles/Desc'
import Loading from '../Loading'

import HTML from 'react-native-render-html';

const ROOT_LINK = 'http://agenciaprospecta.com.br/clientes/passoapassov2/wsapp/'
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

class DisplayPromos extends React.Component {

  constructor() {
    super()

    this.state = {
      desc: '',
      debug: false,
      msg: '',
      hasOne: false,
      displayVoucher: false,
    }

    this.hasVideo = false
  }

  handleVideo() {
    const aula = this.props.data.aula
    if(aula.video){
      if(aula.video.includes('youtu')){
        this.hasVideo = true
        let temp = aula.video.split('/'),
            code = temp[temp.length - 1]
        return (
          <WebView
            style={ Desc.img }
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{uri: 'https://www.youtube.com/embed/' + code }}
          />
        )
      } else {
        this.hasVideo = true
        return (
          <WebView
            style={ Desc.img }
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{uri: 'https://www.youtube.com/embed/' + aula.video }}
          />
        )
      }
    } else if (aula.imagem){
      this.hasVideo = false
      return (
        <Image source={{uri: aula.imagem}} style={Desc.imgSq}/>
      )
    }
    this.hasVideo = false
    return <View/>
  }

  willDisplay = () => {
    const { userData, data: {aula}} = this.props

    if(aula && aula.id && aula.info && aula.info.length > 1){
      if(userData && userData.usuario && userData.nome){
        return true
      }
    }
    return false
  }

  componentDidMount() {
    const aula = this.props.data.aula

    // console.log(aula);
    // console.log('_____');
    // console.log(Entities.decode(aula.descricao));
    // console.log(' ');

    // console.log('_-_-_-_-_-_-_-_-_DISPLAYPROMOS-_-_-_-_-_-_-_-_-_');
    // console.log('data');
    // Object.keys(aula).forEach(key => {
    //   if(key === 'id'){
    //     console.log(key, aula[key])
    //   }
    // })

    var displayVoucher = this.willDisplay()
    var temp = Entities.decode(aula.descricao)
    var idk = temp.replace(/font-family[^>]*;/g,'')
        idk = idk.replace(/font-family[^>]*"/g,'"')
        idk = idk.replace(/<div/g,"<p")
        idk = idk.replace(/<\/div/g,"</p")
    if(idk){
      this.setState({desc: idk, displayVoucher})
    } else {
      this.setState({desc: ' ', displayVoucher})
    }
    setTimeout(() => {this.setState({debug: true})}, 0)
  }

  createCoupon = () => {
    const { userData, title, data: { aula }} = this.props

    var code = '', temp = ''
    for (var i = 0; i < 8; i++) {
      code += [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)]
    }
    temp = code.substring(0,4) + " " + code.substring(4,8)
    code = String(temp).toUpperCase()

    let td = new Date(),
        day = td.getDate(),
        month = td.getMonth() + 1,
        year = td.getFullYear(),
        date = ''

    if (day < 10) day = '0' + day
    if (month < 10) month = '0' + month

    date = day + '/' + month + '/' + year

    // console.log('-=-=-=-=-=-=-=');
    // console.log(aula);
    // console.log('aluno_id: ', userData.usuario);
    // console.log('titulo: ', title);
    // console.log('aluno_nome: ', userData.nome);
    // console.log('codigo: ', code);

    let obj = {
      banner_id: aula.id,
      aluno_id: userData.usuario,
      aluno_nome: userData.nome,
      codigo: code,
      titulo: title,
      descricao: aula.info,
      usado: false,
      data: date,
    }

    // console.log(obj);

    this.setState({msg: '', loading: true})
    fetch( ROOT_LINK + `createVoucher.php?aluno_id=${obj.aluno_id}&aluno_nome=${obj.aluno_nome}&codigo=${obj.codigo}&titulo=${obj.titulo}&descricao=${obj.descricao}&banner_id=${obj.banner_id}`, {
      method: 'POST',
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.ok === true){
        this.setState({msg: '', loading: false, hasOne: true})
        this.props.voucherState(true, obj)
      } else {
        this.setState({msg: data.msg, loading: false})
      }
    })
    .catch((error) => {
      this.setState({msg: 'Erro ao gerar voucher', loading: false})
      console.log('reg error', error)
    });

  }

  render() {
    const { userData, title, warnState, data: { aula } } = this.props
    const { hasOne, loading, msg, displayVoucher } = this.state

    return (
      <ScrollView style={Build.container}>
        {this.handleVideo()}
        <View style={Desc.container}>
          <View style={Build.rowFlexedAligned}>
            <RobotoBold style={[Desc.titleDesc, Build.container]}>{aula.titulo}</RobotoBold>
          </View>
          <RobotoMedium style={{color: Colors.red, textAlign: 'center'}}>{msg}</RobotoMedium>
          { displayVoucher === true &&
            <TouchableOpacity style={hasOne ? [Desc.vButton, {backgroundColor: Colors.g666}] : Desc.vButton} disabled={ hasOne || loading } onPress={() => {userData && userData.ok === true ? this.createCoupon() : warnState(true) }}>
              { loading ?
                <Loading color={Colors.white} size={30}/>
                :
                <RobotoMedium style={Desc.vText}>{hasOne ? 'Voucher gerado': 'Gerar voucher'}</RobotoMedium>
              }
            </TouchableOpacity>
          }
          <HTML
            html={Entities.decode(this.state.desc)}
            tagsStyles={{ p: Desc.txt, strong: Desc.strong, span: Desc.txt}}
          />
        </View>
        <View style={Desc.container}>
          { aula.imagem && this.hasVideo &&
            <Image source={{uri: aula.imagem}} style={Desc.imgDescSq}/>
          }
        </View>
        <View style={Item.blank}/>
      </ScrollView>
    )
  }
}

// <RobotoRegular style={Desc.date}>{aula.data}</RobotoRegular>
const mapStateToProps = store => ({
  title: store.headerState.title,
  page: store.headerState.page,
  subPage: store.headerState.subPage,
  data: store.headerState.data,
});

export default connect(mapStateToProps)(DisplayPromos);
