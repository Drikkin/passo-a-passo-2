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

  constructor(props) {
    super(props)

    this.state = {
      debug: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({debug: !this.state.debug})
    }, 250)
  }

  _renderItem = ({item, index}) => {
    let test = item.titulo.replace('#',''),
        temp = test.split(/(?=[A-Z])/),
        title = temp.join(' ')
    return (
      <TouchableOpacity key={index} onPress={() => this.props.changePage(title ? title : item.titulo,4,2,{...item, "titulo_formatado": title})} activeOpacity={0.5} style={Item.container}>
        <ImageBackground source={{ uri: item.imagem}} style={Item.left}/>
        <View style={Item.right}>
          <RobotoBold  numberOfLines={2} style={Item.titleSm}>{title}</RobotoBold>
          <RobotoRegular  numberOfLines={1} style={Item.titleCount}>{item.data}</RobotoRegular>
        </View>
      </TouchableOpacity>
    )
  }

  _keyExtractor = (item, index) => String(index);


  render() {
    const { newsData } = this.props

    return (
      <ScrollView style={Build.containerTop}>
        <FlatList
          inverted={true}
          data={newsData}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
        <View style={Item.blank}/>
      </ScrollView>
    )
  }
}

const mapStateToProps = store => ({
  newsData: store.newsDataState.newsData,
});

export default connect(mapStateToProps)(News);
