import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ImageBackground, TouchableOpacity, Animated, Easing, FlatList, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RobotoRegular, RobotoBold } from './Text.js'
import { scale, verticalScale, moderateScale } from '../styles/Scaling.js'
import { Build } from '../styles/Build'
import { Header } from '../styles/Header'
import { Colors } from '../styles/Colors'
import { saveHeader } from '../actions'
import { Feather, AntDesign, Entypo } from '@expo/vector-icons';

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

class HeaderTop extends React.Component {

  constructor() {
    super();

    this.state = {
      showMenu: true,
    }
  }

  componentDidUpdate(prevProps){
    if (this.props.page !== prevProps.page || this.props.subPage !== prevProps.subPage) {
      if(this.props.page === 1 && this.props.subPage === 1){
        if (this.props.sector === 0) {
          this.props.saveHeader('AULAS DE DANÇA', this.props.page, this.props.subPage, {})
        } else {
          this.props.saveHeader('CLUBE DE VANTAGENS', this.props.page, this.props.subPage, {})
        }
        this.setState({showMenu: true})
      } else {
        if(this.state.showMenu === true){
          this.setState({showMenu: false})
        }
      }
    }
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.goBackAction()
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  goBack() {
    const { title, page, subPage, data } = this.props
    if(subPage > 1){
      this.props.changePage(title, page, subPage - 1, data)
      return
    } else {
      this.props.toggleMenu(true)
      // if(page === 1){
      //   this.props.goToLand()
      // } else {
      //   this.props.changePage('', 1, subPage, {})
      // }
    }
  }

  goBackAction() {
    const { title, page, subPage, data } = this.props
    if(subPage > 1){
      this.props.changePage(title, page, subPage - 1, data)
      return
    } else {
      if(this.props.isMenuOpen) {
        this.props.toggleMenu(false)
      } else {
        this.props.goToLand()
      }
    }
  }

  render() {

    const { page, subPage, title, changePage, sector } = this.props

    return (
      <View>
        <ImageBackground source={require('../assets/images/plano-de-fundo/plano-de-fundo.png')} style={Header.imgBg}>
          <View style={Header.topRow}>
            <TouchableOpacity onPress={() => this.goBack() } style={Header.topIcon}>
              { subPage === 1 ?
                <Feather
                  color={Colors.white}
                  name='menu'
                  size={moderateScale(26)}
                />
                :
                <Feather
                  color={Colors.white}
                  name='chevron-left'
                  size={moderateScale(30)}
                />
              }
            </TouchableOpacity>
            <RobotoRegular numberOfLines={1} style={Header.topTitle}>{Entities.decode(title).toUpperCase()}</RobotoRegular>
            <TouchableOpacity onPress={() => changePage('NOTIFICAÇÕES',5,1,{})} style={Header.topIcon}>
              <Feather
                color={Colors.white}
                name='bell'
                size={moderateScale(26)}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={Header.divider}/>

      </View>
    )
  }
}

// <View style={Header.bottonRow}>
//   <TouchableOpacity onPress={() => changePage('',1,1,{})} style={page === 1 ? Header.iconContainerS : Header.iconContainer}>
//     <AntDesign
//       style={page === 1 ? Header.iconS : {}}
//       color={page === 1 ? Colors.blue : Colors.g999}
//       name='home'
//       size={moderateScale(30)}
//     />
//   </TouchableOpacity>
//   <TouchableOpacity onPress={() => changePage('SOBRE',2,1,{})} style={page === 2 ? Header.buttonContainerS : Header.buttonContainer}>
//     <RobotoBold style={page === 2 ? Header.buttonTxtS : Header.buttonTxt}>Sobre</RobotoBold>
//   </TouchableOpacity>
//   <TouchableOpacity onPress={() => changePage('EVENTOS',3,1,{})} style={page === 3 ? Header.buttonContainerS : Header.buttonContainer}>
//     <RobotoBold style={page === 3 ? Header.buttonTxtS : Header.buttonTxt}>Eventos</RobotoBold>
//   </TouchableOpacity>
//   <TouchableOpacity onPress={() => changePage('NOTÍCIAS',4,1,{})} style={page === 4 ? Header.buttonContainerS : Header.buttonContainer}>
//     <RobotoBold style={page === 4 ? Header.buttonTxtS : Header.buttonTxt}>Notícias</RobotoBold>
//   </TouchableOpacity>
//   <TouchableOpacity onPress={() => changePage('ENDEREÇO',5,1,{})} style={page === 5 ? Header.iconContainerS : Header.iconContainer}>
//     <Entypo
//       style={page === 5 ? Header.iconS : {}}
//       color={page === 5 ? Colors.blue : Colors.g999}
//       name='location'
//       size={moderateScale(26)}
//     />
//   </TouchableOpacity>
// </View>


const mapStateToProps = store => ({
  title: store.headerState.title,
  page: store.headerState.page,
  subPage: store.headerState.subPage,
  data: store.headerState.data,
  sector: store.sectorState.sector
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ saveHeader }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(HeaderTop);
