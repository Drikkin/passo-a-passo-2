import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ImageBackground, TouchableOpacity, Animated, Easing } from 'react-native';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RobotoRegular, RobotoBold } from '../Text.js'
import { saveUserData } from '../../actions'
import { scale, verticalScale, moderateScale } from '../../styles/Scaling.js'
import { Build } from '../../styles/Build'
import { Item } from '../../styles/Item'
import { Colors } from '../../styles/Colors'
import { Desc } from '../../styles/Desc'
import IconVal from '../IconVal.js'

import HTML from 'react-native-render-html';

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

class DisplayEvents extends React.Component {

  constructor() {
    super()

    this.state = {
      desc: '',
      debug: false
    }
  }

  componentDidMount() {
    const { data } = this.props
    if (data.descricao) {
      var temp = Entities.decode(data.descricao)
      var idk = temp.replace(/font-family[^>]*;/g,'')
          idk = idk.replace(/font-family[^>]*"/g,'"')
          idk = idk.replace(/<div/g,"<p")
          idk = idk.replace(/<\/div/g,"</p")
      if(idk){
        this.setState({desc: idk})
      } else {
        this.setState({desc: ' '})
      }
    }
    setTimeout(() => {this.setState({debug: true})}, 500)
  }

  capitalize = (s) => {
    if (typeof s !== 'string') return ''
    if (s) return s.charAt(0).toUpperCase() + s.slice(1)
    return ''
  }

  checkField = (field) => {
    if (field) return true
    return false
  }

  render() {

    const { data } = this.props
    return (
      <ScrollView style={Build.container}>

        <Image source={{uri: data.imagem}} style={Desc.img}/>

        <View style={Desc.container}>
          <View style={Build.rowFlexedAligned}>
            <RobotoBold style={[Desc.titleDesc, Build.container]}>{this.capitalize(data.informacao)}</RobotoBold>
          </View>
          <View style={Build.rowFlexedAligned}>
            <View style={[Build.rowFlexedAligned, Desc.detailRow]}>
              <IconVal style={Desc.evenIcon} type={'AntDesign'} color={Colors.gold} name={'calendar'} size={'25'}/>
              <RobotoBold style={Desc.date1}>{data.data}</RobotoBold>
            </View>
            {
              this.checkField(data.hora) &&
              <View style={[Build.rowFlexedAligned, Desc.detailRow]}>
                <IconVal style={Desc.evenIcon} type={'AntDesign'} color={Colors.gold} name={'clockcircleo'} size={'25'}/>
                <RobotoBold style={Desc.date2}>{data.hora + 'h'}</RobotoBold>
              </View>
            }
          </View>
          <View>
            {
              this.checkField(data.endereco) &&
              <View style={[Build.rowFlexedAligned, Desc.detailRow]}>
                <IconVal style={Desc.evenIcon} type={'AntDesign'} color={Colors.gold} name={'enviromento'} size={'25'}/>
                <RobotoBold style={Desc.date3}>{data.endereco}</RobotoBold>
              </View>
            }
          </View>
          <HTML
            html={Entities.decode(this.state.desc)}
            tagsStyles={{ p: Desc.txt, strong: Desc.strong, span: Desc.txt}}
          />
          {
            (data.videos && data.videos.length > 0) &&
            data.videos.map((video, i) => (
              <WebView
                key={i}
                style={ Desc.imgDesc }
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{uri: 'https://www.youtube.com/embed/' + video }}
              />
            ))
          }
          {
            (data.imagens && data.imagens.length > 0) &&
            data.imagens.map((img, i) => (
              <Image key={i} source={{uri: img}} style={Desc.imgDesc}/>
            ))
          }
        </View>
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

export default connect(mapStateToProps)(DisplayEvents);
