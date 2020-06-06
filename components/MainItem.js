import React, { Component } from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';

import Loading from '../components/Loading.js'
import { RobotoRegular, RobotoBold } from '../components/Text.js'
import { saveUserData } from '../actions'
import { scale, verticalScale, moderateScale } from '../styles/Scaling.js'
import { Build } from '../styles/Build'
import { Land } from '../styles/Land'

class MainItem extends React.Component {

  constructor() {
    super();
    this.state = {

    }
  }

  render() {

    const {subTitle, title, color, type} = this.props

    return (
      <View>

      </View>
    )
  }
}

const mapStateToProps = store => ({
  saveData: store.userDataState.saveData,
});

export default connect(mapStateToProps)(MainItem);
