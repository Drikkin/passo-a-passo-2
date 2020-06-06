import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ImageBackground, TouchableOpacity, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RobotoRegular, RobotoBold, RobotoMedium   } from '../Text.js'
import { saveUserData } from '../../actions'
import { scale, verticalScale, moderateScale } from '../../styles/Scaling.js'
import { Build } from '../../styles/Build'
import { Desc } from '../../styles/Desc'
import { Colors } from '../../styles/Colors'
import { Feather, AntDesign, Entypo } from '@expo/vector-icons';
import HTML from 'react-native-render-html';

import { Popup } from 'react-native-map-link';

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

class About extends React.Component {

  constructor() {
    super()

    this.state = {
      desc: '',
      debug: false,
      isVisible: false,
    }
  }

  componentDidMount() {
    const sobre = this.props.initialData.sobre
    var temp = Entities.decode(sobre.descricao)
    var idk = temp.replace(/font-family[^>]*;/g,'')
        idk = idk.replace(/font-family[^>]*"/g,'"')
        idk = idk.replace(/<div/g,"<p")
        idk = idk.replace(/<\/div/g,"</p")
    if(idk){
      this.setState({desc: idk})
    } else {
      this.setState({desc: ' '})
    }
    setTimeout(() => {this.setState({debug: true})}, 0)
  }

  openMapLink() {
    this.setState({isVisible: true})
  }

  render() {

    const { isVisible } = this.state
    const { initialData } = this.props

    return (
      <ScrollView style={Build.container}>
        <Popup
          isVisible={isVisible}
          onCancelPressed={() => this.setState({ isVisible: false })}
          onAppPressed={() => this.setState({ isVisible: false })}
          onBackButtonPressed={() => this.setState({ isVisible: false })}
          modalProps={{
            animationIn: 'slideInUp'
          }}
          options={{
            dialogTitle: 'Abrir em Maps',
            dialogMessage: 'Qual aplicativo você gostaria de usar?',
            cancelText: 'Cancelar',
            title: initialData.sobre.endereco ? initialData.sobre.endereco : null,
            latitude: -20.802594,
            longitude: -49.386365,
          }}
        />
        <Image source={{uri: initialData.sobre.imagem}} style={Desc.img}/>
        <View style={Desc.container}>
          <RobotoBold style={Desc.title}>Endereço</RobotoBold>
          <View style={Build.addContainer}>
            <TouchableOpacity activeOpacity={0.6} onPress={() => {this.openMapLink()}} style={Build.rowLeft}>
              <RobotoRegular style={Build.addTxt}> {initialData.sobre.endereco} </RobotoRegular>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} onPress={() => {this.openMapLink()}} style={Build.rightCircle}>
              <Feather
                color={Colors.blue}
                name='map-pin'
                size={moderateScale(22)}
              />
              <RobotoMedium style={Build.buttonTxt}>Clique para traçar rota</RobotoMedium>
            </TouchableOpacity>
          </View>
          <RobotoBold style={Desc.title}>{initialData.sobre.titulo}</RobotoBold>
          <HTML
            html={Entities.decode(this.state.desc)}
            tagsStyles={{ p: Desc.txt, strong: Desc.strong, span: Desc.txt}}
          />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = store => ({
  initialData: store.initialDataState.initialData,
});

export default connect(mapStateToProps)(About);
