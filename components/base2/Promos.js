import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ImageBackground, TouchableOpacity, Animated, Easing, FlatList } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { RobotoRegular, RobotoBold } from '../Text.js'
import { saveUserData } from '../../actions'
import { scale, verticalScale, moderateScale } from '../../styles/Scaling.js'
import { Build } from '../../styles/Build'
import { Item } from '../../styles/Item'
import { Colors } from '../../styles/Colors'

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

class Promos extends React.Component {

  constructor() {
    super();

    this.category = ''
    this.state = {
      loading: true,
      filter: false
    }
  }

  componentDidMount() {
    const { data } = this.props
    this.category = data.dif
    this.props.changePage(data.title.trim(),1,2,{dif: data.dif, title: data.title})
    this.setState({loading: false, filter: this.props.searchId > 0})
  }

  _renderItem = ({item, index}) => {
    const { parceiros } = this.props.initialData
    if(item.categoria_id == this.category){
      if( this.state.filter ) {
        if( this.props.searchId == item.aulas[0].id ){
          let img = (item.aulas && item.aulas[0] && item.aulas[0].imagem) ? item.aulas[0].imagem : ''
          if ( item.aulas[0].id ){
            result = parceiros.filter(obj => {
              return obj.id === item.aulas[0].id
            })
            img = (result && result[0] && result[0].imagem) ? result[0].imagem : img
          }
          let temp = item.nome_aula
          dataTemp = {
            ...this.props.data,
            item
          }
          return (
            <TouchableOpacity onPress={() => this.props.changePage(item.nome_aula.toUpperCase(),1,3,{...this.props.data,item})} activeOpacity={0.5} key={index} style={Item.container}>
              <ImageBackground source={{ uri: img }} style={Item.left}/>
              <View style={Item.right}>
                <RobotoRegular numberOfLines={2} style={Item.titleSm}>{item.nome_aula}</RobotoRegular>
                <View style={[Item.subLayout, {backgroundColor: item.cor}]}>
                  <RobotoRegular style={Item.subLayoutText}>{item.aulas.length ? item.aulas.length > 1 ? item.aulas.length + ' vantagens' : item.aulas.length + ' vantagem' : '0 vantagens'}</RobotoRegular>
                </View>
              </View>
            </TouchableOpacity>
          )
        }
      } else {
        let img = (item.aulas && item.aulas[0] && item.aulas[0].imagem) ? item.aulas[0].imagem : ''
        if ( item.aulas[0].id ){
          result = parceiros.filter(obj => {
            return obj.id === item.aulas[0].id
          })
          img = (result && result[0] && result[0].imagem) ? result[0].imagem : img
        }
        let temp = item.nome_aula
        dataTemp = {
          ...this.props.data,
          item
        }
        return (
          <TouchableOpacity onPress={() => this.props.changePage(item.nome_aula.toUpperCase(),1,3,{...this.props.data,item})} activeOpacity={0.5} key={index} style={Item.container}>
            <ImageBackground source={{ uri: img }} style={Item.left}/>
            <View style={Item.right}>
              <RobotoRegular numberOfLines={2} style={Item.titleSm}>{item.nome_aula}</RobotoRegular>
              <View style={[Item.subLayout, {backgroundColor: item.cor}]}>
                <RobotoRegular style={Item.subLayoutText}>{item.aulas.length ? item.aulas.length > 1 ? item.aulas.length + ' vantagens' : item.aulas.length + ' vantagem' : '0 vantagens'}</RobotoRegular>
              </View>
            </View>
          </TouchableOpacity>
        )
      }
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
  searchId: store.searchState.searchId,
});

export default connect(mapStateToProps)(Promos);
