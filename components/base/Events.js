import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ImageBackground, TouchableOpacity, Animated, Easing, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RobotoRegular, RobotoMedium, RobotoBold } from '../Text.js'
import { saveUserData, saveHeader } from '../../actions'
import { scale, verticalScale, moderateScale } from '../../styles/Scaling.js'
import { Build } from '../../styles/Build'
import { Item } from '../../styles/Item'
import { Even } from '../../styles/Even'
import { Colors } from '../../styles/Colors'

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

class Events extends React.Component {

  constructor() {
    super();

    this.category = ''
  }

  componentDidMount() {
    this.props.saveHeader('EVENTOS', this.props.page, this.props.subPage, {})
  }

  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => this.props.changePage(item.titulo,3,2,item)} activeOpacity={0.5} style={Even.container}>
        <View style={Even.left}>
          <ImageBackground style={Even.leftPic} source={{uri: item.imagem}}/>
        </View>
        <View style={Even.right}>
          <View style={Even.rightRow}>
            <RobotoBold style={Even.dateTxt}>{item.dataCurta ? item.dataCurta : item.data}</RobotoBold>
            <RobotoBold style={Even.timeTxt}>{item.hora && item.hora + 'h'}</RobotoBold>
          </View>
          <View style={Even.split}/>
          <RobotoRegular numberOfLines={3} style={Even.descTxt}><RobotoMedium style={Even.descTitle}>{item.titulo}</RobotoMedium> - {item.informacao}</RobotoRegular>
        </View>
      </TouchableOpacity>
    )
  }

  _keyExtractor = (item, index) => String(index);

  render() {

    const { eventsData } = this.props

    return (
      <View style={Build.containerTop}>
        { eventsData && eventsData.length > 0 ?
          <FlatList
            data={eventsData}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
          :
          <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, marginVertical: moderateScale(10)}}>
            <MaterialIcons
              color={Colors.gddd}
              name='event'
              size={moderateScale(50)}
            />
          <RobotoMedium style={[Item.title, {textAlign: 'center', fontSize: moderateScale(18)}]}>Nenhum evento está</RobotoMedium>
            <RobotoMedium style={[Item.title, {textAlign: 'center', fontSize: moderateScale(18)}]}>disponivel</RobotoMedium>
          </View>
        }
        <View style={Item.blank}/>
      </View>
    )
  }
}

const mapStateToProps = store => ({
  eventsData: store.eventsDataState.eventsData,
  title: store.headerState.title,
  page: store.headerState.page,
  subPage: store.headerState.subPage,
  data: store.headerState.data,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ saveHeader }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Events);
