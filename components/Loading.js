import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Animated, Easing } from 'react-native'
import { scale, verticalScale, moderateScale, width, height } from '../styles/Scaling.js'
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

export default class Loading extends Component {

  constructor(props){
    super(props)

    this._isMounted = true
    this.rotate = new Animated.Value(0)
  }

  componentDidMount() {
    this._handleSpin()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  _handleSpin() {
    Animated.timing(
      this.rotate,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start(() => {
      Animated.timing(
        this.rotate,
        {
          toValue: 0,
          duration: 0,
          useNativeDriver: true
        }
      ).start(() => {
        if(this._isMounted){
          this._handleSpin()
        }
      })
    })
  }

  render() {

    const { type, color, name, size } = this.props

    const Icon = ICONLIST[type];

    const spin = this.rotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

    if(color && size){
      if(type && name){
        return (
          <Animated.View style={{transform: [{rotate: spin}]}}>
            <Icon
              {...this.props}
              style={this.props.style}
              color={color}
              name={name}
              size={moderateScale(Number(size))}
            />
          </Animated.View>
        )
      }
      return (
        <Animated.View style={{
          transform: [{rotate: spin}],
          height: size,
          width: size,
          borderBottomLeftRadius: size/2,
          borderBottomRightRadius: size/2,
          borderTopLeftRadius: size/2,
          borderTopRightRadius: size/2,
          borderBottomWidth: 3,
          borderRightWidth: 3,
          borderLeftWidth: 3,
          borderTopWidth: 3,
          borderBottomColor: color,
          borderRightColor: color,
          borderLeftColor: color,
          borderTopColor: 'rgba(0,0,0,0)',
          }}
        />
      )
    } else {
      return (
        <View/>
      )
    }
  }
}
