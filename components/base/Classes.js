import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ImageBackground, TouchableOpacity, Animated, Easing, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { RobotoRegular, RobotoBold } from '../Text.js'
import { saveUserData } from '../../actions'
import { scale, verticalScale, moderateScale } from '../../styles/Scaling.js'
import { Build } from '../../styles/Build'
import { Item } from '../../styles/Item'
import { Colors } from '../../styles/Colors'

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

class Classes extends React.Component {

  constructor() {
    super();

    this.category = ''
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    const { data } = this.props
    if (data.dif) {
      if(data.dif === 1){
        this.category = 'iniciante'
        this.props.changePage('INICIANTE',1,2,{dif: 1})
      } else if(data.dif === 2){
        this.category = 'basico'
        this.props.changePage('INTERMEDIÁRIO',1,2,{dif: 2})
      } else if(data.dif === 3){
        this.category = 'avancado'
        this.props.changePage('AVANÇADO',1,2,{dif: 3})
      } else {
        this.category = 'bonus'
        this.props.changePage('BÔNUS',1,2,{dif: 4})
      }
    }
    this.setState({loading: false})
  }

  _renderItem = ({item, index}) => {
    if(this.category == item.categoria){
      let temp = item.nome_aula
          dataTemp = {
            ...this.props.data,
            item
          }
      return (
        <TouchableOpacity onPress={() => this.props.changePage(item.nome_aula.toUpperCase(),1,3,{...this.props.data,item})} activeOpacity={0.5} key={index} style={Item.containerSm}>
          <View style={Item.titleRow}>
            <View style={[Item.leftSm, {backgroundColor: item.cor ? item.cor : Colors.gddd}]}/>
            <View style={Item.right}>
              <RobotoRegular numberOfLines={2} style={Item.title}>{item.nome_aula}</RobotoRegular>
              <RobotoRegular numberOfLines={1} style={Item.titleCount}>{item.aulas.length ? item.aulas.length > 1 ? item.aulas.length + ' aulas disponíveis' : item.aulas.length + ' aula disponível' : '0 aulas disponíveis'}</RobotoRegular>
            </View>
          </View>
        </TouchableOpacity>
      )
    }
  }

  _keyExtractor = (item, index) => String(index);

  render() {

    const { loading } = this.state
    const { initialData } = this.props

    return (
      <ScrollView style={Build.containerTop}>
        { !loading &&
          <FlatList
            data={initialData.aulas}
            initialNumToRender={initialData.aulas.length}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        }
        <View style={Item.blank}/>
      </ScrollView>
    )
  }
}

const mapStateToProps = store => ({
  initialData: store.initialDataState.initialData,
  title: store.headerState.title,
  page: store.headerState.page,
  subPage: store.headerState.subPage,
  data: store.headerState.data,
});

export default connect(mapStateToProps)(Classes);
