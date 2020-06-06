import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ImageBackground, TouchableOpacity, Animated, Easing, FlatList, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Feather, AntDesign, Entypo } from '@expo/vector-icons';

import { RobotoRegular, RobotoBold } from '../Text.js'
import { saveUserData } from '../../actions'
import { scale, verticalScale, moderateScale } from '../../styles/Scaling.js'
import { Build } from '../../styles/Build'
import { Item } from '../../styles/Item'
import { Colors } from '../../styles/Colors'

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

class SubPromos extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      debug: false
    }
  }

  componentDidMount() {
    this.setState({debug: !this.state.debug})

    // console.log('_-_-_-_-_-_-_-_-_SUBPROMOS_-_-_-_-_-_-_-_-_-_');
    // console.log('item');
    // Object.keys(this.props.data.item).forEach(data => {
    //   if(data !== 'aulas'){
    //     console.log(data, this.props.data.item[data])
    //   }
    // })
  }

  onSelect(item) {
    //check restrictions
    // console.log(item);
    // console.log(!item.liberado ,'||', item.restricao !== '' ,'||', item.info.length > 1);
    const blocked = !item.liberado || item.restricao !== '' || item.info.length > 1
    if(!blocked){
      this.props.changePage(this.props.title,1,4,{...this.props.data, aula: item})
    } else {
      if(!item.liberado || this.props.userData.ok !== true){
        this.props.warnState(true)
      } else if (item.restricao !== '' || item.info.length > 1) {
        this.props.premiumState(true)
      } else {
        this.props.warnState(true)
      }
    }
  }

  _renderItem = ({item, index}) => {
    if(this.props.userData && this.props.userData.ok){
      // console.log(item.restricao ,'includes', this.props.userData.tipo, item.restricao.includes(this.props.userData.tipo));
      if(item.restricao.includes(this.props.userData.tipo) || item.restricao.length == 0){
        if(item.ordem == -1){
          item.ordem = 0
        }
        return (
          <TouchableOpacity onPress={() => this.props.changePage(this.props.title,1,4,{...this.props.data, aula: item})} activeOpacity={0.5} key={index} style={Item.container}>
            <ImageBackground source={{ uri: item.imagem}} style={Item.left}/>
            <View style={Item.right}>
              <RobotoRegular  numberOfLines={3} style={Item.titleSm}>{item.titulo.trim()}</RobotoRegular>
            </View>
          </TouchableOpacity>
        )
      }
      item.ordem = -1
      return (
        <TouchableOpacity onPress={() => this.props.premiumState(true)} activeOpacity={0.5} key={index} style={Item.containerTp}>
          <ImageBackground source={{ uri: item.imagem}} style={Item.left}/>
          <View style={Item.right}>
            <RobotoRegular  numberOfLines={3} style={Item.titleSmTp}>Promoção disponível apenas para usuários premium</RobotoRegular>
          </View>
        </TouchableOpacity>
      )
    }
    const blocked = !item.liberado || item.restricao !== '' || item.info.length > 1
    return (
      <TouchableOpacity onPress={() => this.onSelect(item)} activeOpacity={0.5} key={index} style={Item.container}>
        <ImageBackground source={{ uri: item.imagem}} style={Item.left}>
          { blocked &&
            <View style={Item.lockBase}>
              <AntDesign
                color={Colors.black}
                name='lock1'
                size={moderateScale(35)}
              />
            </View>
          }
        </ImageBackground>
        <View style={Item.right}>
          <RobotoRegular numberOfLines={3} style={blocked ? Item.titleSmoff : Item.titleSm}>{item.titulo.trim()}</RobotoRegular>
        </View>
      </TouchableOpacity>
    )
  }

  _keyExtractor = (item, index) => String(index);

  render() {

    const { initialData, data } = this.props
    return (

      <ScrollView style={Build.containerTop}>
        <FlatList
          data={data.item.aulas.sort((a, b) => (a.ordem > b.ordem) ? -1 : 1)}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          onEndReached={() => this.setState({debug: !this.state.debug})}
        />
        <View style={Item.blank}/>
      </ScrollView>
    )
  }
}

const mapStateToProps = store => ({
  title: store.headerState.title,
  page: store.headerState.page,
  subPage: store.headerState.subPage,
  data: store.headerState.data,
});

export default connect(mapStateToProps)(SubPromos);
