import React, { Component } from 'react'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Warn } from "../../styles/Warn.js"
import { Colors } from '../../styles/Colors'
import { RobotoRegular, RobotoBold, RobotoMedium } from '../Text.js'
export default class Warning extends Component {

  render() {
    const { title, desc, leave, warnState, warnOkay, userData } = this.props
    return (
      <View style={Warn.container}>
        <View style={Warn.overlay}>
          <View style={Warn.txtContainer}>
            <RobotoMedium style={Warn.title}>{title}</RobotoMedium>
            <RobotoRegular style={Warn.desc}>{desc ? desc : ''}</RobotoRegular>
          </View>
          <View style={Warn.buttonContainer}>
            <TouchableOpacity onPress={() => {warnState(false)}} style={[Warn.button, {backgroundColor: Colors.white}]}>
              <RobotoRegular style={[Warn.buttonTxt, {color: Colors.g333}]}>{warnOkay == undefined ? 'Voltar' : leave ? 'Não' : 'Cancelar'}</RobotoRegular>
            </TouchableOpacity>
            {warnOkay !== undefined &&
              <TouchableOpacity onPress={() => {warnOkay()}} style={[Warn.button, {backgroundColor: Colors.lightBlue}]}>
                <RobotoBold style={[Warn.buttonTxt, {color: Colors.white}]}>{leave ? 'Sim' : 'Entrar'}</RobotoBold>
              </TouchableOpacity>
            }
          </View>
        </View>
      </View>
    )
  }
}
