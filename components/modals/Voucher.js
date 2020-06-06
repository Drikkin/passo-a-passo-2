import React, { Component } from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { View, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Vouc } from "../../styles/Vouc.js"
import { Colors } from '../../styles/Colors'
import { moderateScale } from '../../styles/Scaling'


import { RobotoRegular, RobotoBold, RobotoMedium } from '../Text.js'

export default class Voucher extends Component {

  render() {
    const { voucherState, userData, voucherData: {
      banner_id,
      aluno_id,
      aluno_nome,
      usado,
      codigo,
      titulo,
      descricao,
      data,
    }} = this.props
    const COLOR = userData.tipo == 1 ? 'user1' : userData.tipo == 2 ? 'user2' : 'user0'
    if(userData && userData.ok) {
      return (
        <View style={Vouc.container}>
          <View style={[Vouc.overlay, {backgroundColor: Colors[COLOR]}]}>
            <View style={Vouc.txtContainer}>
              <RobotoMedium style={Vouc.estab}>{descricao}</RobotoMedium>
              <View style={Vouc.divider}/>
              <View style={Vouc.promoContainer}>
                <RobotoMedium style={[Vouc.name, {textAlign: 'center', marginBottom: moderateScale(20)}]}>{titulo}</RobotoMedium>
                <RobotoRegular style={Vouc.name}>CÓD. <RobotoMedium style={Vouc.code}>{codigo ? codigo : '----'}</RobotoMedium></RobotoRegular>
                <RobotoRegular style={Vouc.date}>{data ? 'DATA ' + data : 'DATA --/--/----'}</RobotoRegular>
              </View>
              <View style={Vouc.divider}/>
              <RobotoMedium style={Vouc.name}>{aluno_nome ? aluno_nome : aluno_id}</RobotoMedium>
              <RobotoRegular style={Vouc.obs}>Apresente este voucher na hora do pagamento. Promoção nao acumulativa</RobotoRegular>
            </View>
          </View>
          <TouchableOpacity activeOpacity={1} onPress={() => {voucherState(false)}} style={Vouc.close}>
            <EvilIcons
              color={Colors.blue}
              name='close'
              size={moderateScale(40)}
            />
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View>
        {voucherState(false)}
      </View>
    )
  }
}
