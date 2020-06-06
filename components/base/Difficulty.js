import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ImageBackground, TouchableOpacity, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import { Feather, AntDesign, Entypo, FontAwesome, MaterialCommunityIcons, Foundation,
  Ionicons, MaterialIcons, SimpleLineIcons, Octicons, Zocial } from '@expo/vector-icons';

import { RobotoRegular, RobotoBold } from '../Text.js'
import { saveUserData } from '../../actions'
import { scale, verticalScale, moderateScale } from '../../styles/Scaling.js'
import { Build } from '../../styles/Build'
import { Item } from '../../styles/Item'
import { Colors } from '../../styles/Colors'
import IconVal from '../IconVal.js'

export default class Difficulty extends React.Component {

  render() {

    const { changePage } = this.props

    return (
      <ScrollView style={Build.containerTop}>
        <TouchableOpacity onPress={() => changePage('INICIANTE',1,2,{dif: 1})} activeOpacity={0.5} style={Item.container}>
          <View style={[Item.left, {backgroundColor: Colors.green}]}>
            <IconVal type='Entypo' color='#ffffff' name='progress-one' size='50'/>
          </View>
          <View style={Item.right}>
            <RobotoRegular style={Item.subTitle}>Nível</RobotoRegular>
            <RobotoBold style={Item.title}>INICIANTE</RobotoBold>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changePage('INTERMEDIÁRIO',1,2,{dif: 2})} activeOpacity={0.5} style={Item.container}>
          <View style={[Item.left, {backgroundColor: Colors.yellow}]}>
            <IconVal type='Entypo' color='#ffffff' name='progress-two' size={50}/>
          </View>
          <View style={Item.right}>
            <RobotoRegular style={Item.subTitle}>Nível</RobotoRegular>
            <RobotoBold style={Item.title}>INTERMEDIÁRIO</RobotoBold>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changePage('AVANÇADO',1,2,{dif: 3})} activeOpacity={0.5} style={Item.container}>
          <View style={[Item.left, {backgroundColor: Colors.red}]}>
            <IconVal type='Entypo' color='#ffffff' name='progress-full' size={50}/>
          </View>
          <View style={Item.right}>
            <RobotoRegular style={Item.subTitle}>Nível</RobotoRegular>
            <RobotoBold style={Item.title}>AVANÇADO</RobotoBold>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changePage('BÔNUS',1,2,{dif: 4})} activeOpacity={0.5} style={Item.container}>
          <View style={[Item.left, {backgroundColor: Colors.pink}]}>
            <IconVal type='FontAwesome' color='#ffffff' name='star' size={40}/>
          </View>
          <View style={Item.right}>
            <RobotoRegular style={Item.subTitle}>Nível</RobotoRegular>
            <RobotoBold style={Item.title}>BÔNUS</RobotoBold>
          </View>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}
