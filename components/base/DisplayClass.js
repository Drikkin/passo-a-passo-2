import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ImageBackground, TouchableOpacity, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RobotoRegular, RobotoBold } from '../Text.js'
import { saveUserData } from '../../actions'
import { scale, verticalScale, moderateScale } from '../../styles/Scaling.js'
import { Build } from '../../styles/Build'
import { Item } from '../../styles/Item'
import { Colors } from '../../styles/Colors'
import { Desc } from '../../styles/Desc'
import HTML from 'react-native-render-html';
import { WebView } from 'react-native-webview';

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

class DisplayClass extends React.Component {

  constructor() {
    super()

    this.state = {
      desc: '',
      debug: false
    }
  }

  componentDidMount() {
    const aula = this.props.data.aula
    var temp = Entities.decode(aula.descricao)
    var idk = temp.replace(/font-family[^>]*;/g,'')
        idk = idk.replace(/font-family[^>]*"/g,'"')
        idk = idk.replace(/<div/g,"<p")
        idk = idk.replace(/<\/div/g,"</p")
    if(idk){
      this.setState({desc: idk})
    } else {
      this.setState({desc: ' '})
    }
    setTimeout(() => {this.setState({debug: true})}, 0)
  }

  handleVideo() {
    const aula = this.props.data.aula
    if(aula.video){
      if(aula.video.includes('youtu')){
        let temp = aula.video.split('/'),
            code = temp[temp.length - 1]
        return (
          <WebView
            style={ Desc.img }
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{uri: 'https://www.youtube.com/embed/' + code }}
          />
        )
      } else {
        return (
          <WebView
            style={ Desc.img }
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{uri: 'https://www.youtube.com/embed/' + aula.video }}
          />
        )
      }
    }
    return <View/>
  }

  render() {

    const aula = this.props.data.aula
    const video = this.handleVideo()
    return (
      <ScrollView style={Build.container}>
        {video}
        <View style={Desc.container}>
          <View style={Build.rowFlexedAligned}>
            <RobotoBold style={[Desc.titleDesc, Build.container]}>{aula.titulo}</RobotoBold>
          </View>
          <HTML
            html={Entities.decode(this.state.desc)}
            tagsStyles={{ p: Desc.txt, strong: Desc.strong, span: Desc.txt}}
          />
        </View>
        <View style={Item.blank}/>
      </ScrollView>
    )
  }
}

// <RobotoRegular style={Desc.date}>{aula.data}</RobotoRegular>

const mapStateToProps = store => ({
  title: store.headerState.title,
  page: store.headerState.page,
  subPage: store.headerState.subPage,
  data: store.headerState.data,
});

export default connect(mapStateToProps)(DisplayClass);
