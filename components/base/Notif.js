import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ImageBackground, TouchableOpacity, Animated, Easing, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RobotoRegular, RobotoBold } from '../Text.js'
import { saveUserData } from '../../actions'
import { scale, verticalScale, moderateScale } from '../../styles/Scaling.js'
import { Build } from '../../styles/Build'
import { Item } from '../../styles/Item'
import { Colors } from '../../styles/Colors'
import HTML from 'react-native-render-html';

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

class News extends React.Component {

  _renderItem = ({item, index}) => (
    <View key={index} style={Item.notifContainer}>
      <View style={Item.notifRight}>
        <RobotoBold numberOfLines={2} style={Item.notifTitle}>{item.titulo}</RobotoBold>
        <RobotoRegular style={Item.notifDesc}>{item.msg}</RobotoRegular>
      </View>
      <RobotoRegular numberOfLines={1} style={Item.offDate}>{item.datahora}</RobotoRegular>
    </View>
  )

  _keyExtractor = (item, index) => String(index);


  render() {

    const { notifData } = this.props

    return (
      <ScrollView style={Build.containerTop}>
        <FlatList
          data={notifData}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
        <View style={Item.blank}/>
      </ScrollView>
    )
  }
}

const mapStateToProps = store => ({
  notifData: store.notifDataState.notifData,
});

export default connect(mapStateToProps)(News);
