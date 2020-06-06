import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ImageBackground, TouchableOpacity, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { bindActionCreators } from 'redux';
import { RobotoRegular, RobotoBold, RobotoMedium } from '../Text.js'
import { saveUserData } from '../../actions'
import { scale, verticalScale, moderateScale } from '../../styles/Scaling.js'
import { Item } from '../../styles/Item'
import { Colors } from '../../styles/Colors'
import { Desc } from '../../styles/Desc'
import { Build } from '../../styles/Build'
import { Feather, AntDesign, Entypo } from '@expo/vector-icons';
import HTML from 'react-native-render-html';

import { Popup } from 'react-native-map-link';

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

export default class DisplayNews extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isVisible: false
    }
  }

  openMapLink() {
    this.setState({isVisible: true})
  }

  render() {

    const { isVisible } = this.state

    return (
      <ScrollView style={Build.containerTop}>
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
            title: 'Matriz - Rua Ipiranga, 1246, Boa Vista - São José do Rio Preto/SP',
            latitude: -20.8027200,
            longitude: -49.3864445,
          }}
        />

        <View style={Build.addContainer}>
          <ImageBackground source={{uri: 'http:\/\/soupassoapasso.com.br\/proton\/uploads\/images\/conteudo\/thumbnail_principal_quem-somos.jpg'}} style={Build.addPicture}/>
          <View style={Build.addRow}>
            <TouchableOpacity activeOpacity={0.6} onPress={() => {this.openMapLink()}} style={Build.rowLeft}>
              <RobotoRegular style={Build.addTxt}>Matriz - Rua Ipiranga, 1246, Boa Vista - São José do Rio Preto/SP  </RobotoRegular>
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
        </View>
        <View style={Item.blank}/>
      </ScrollView>
    )
  }
}


// <MapView
//   style={Build.map}
//   initialRegion={{
//     latitude: -20.8027200,
//     longitude: -49.3864445,
//     latitudeDelta: 0.01,
//     longitudeDelta: 0.01,
//     minZoomLevel: 2,
//     maxZoomLevel: 3,
//   }}>
//   <MapView.Marker
//     coordinate={{
//       latitude: -20.8027200,
//       longitude: -49.3864445
//     }}
//   />
// </MapView>
