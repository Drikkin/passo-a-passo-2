import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ImageBackground, TouchableOpacity, Animated, Easing } from 'react-native';
import { scale, verticalScale, moderateScale } from '../styles/Scaling.js'
import { Feather, AntDesign, Entypo, FontAwesome, MaterialCommunityIcons, Foundation,
  Ionicons, MaterialIcons, SimpleLineIcons, Octicons, Zocial } from '@expo/vector-icons';

const ICONLIST = {
  Feather: Feather,
  AntDesign: AntDesign,
  Entypo: Entypo,
  FontAwesome: FontAwesome,
  MaterialCommunityIcons: MaterialCommunityIcons,
  Foundation: Foundation,
  Ionicons: Ionicons,
  MaterialIcons: MaterialIcons,
  SimpleLineIcons: SimpleLineIcons,
  Octicons: Octicons,
  Zocial: Zocial,
}

export default class IconVal extends React.Component {

  render() {
    const { type, color, name, size } = this.props

    const Icon = ICONLIST[type];

    if(type && color && name && size){
      return (
        <Icon
        {...this.props}
        style={this.props.style}
        color={color}
        name={name}
        size={moderateScale(Number(size))}
        />
      )
    } else {
      return (
        <View/>
      )
    }
  }
}
