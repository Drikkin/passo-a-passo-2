import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ImageBackground, TouchableOpacity, Animated, Easing, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RobotoRegular, RobotoMedium, RobotoBold } from '../Text.js'
import { saveHeader, saveVouchersList } from '../../actions'
import { scale, verticalScale, moderateScale } from '../../styles/Scaling.js'
import { Build } from '../../styles/Build'
import { Item } from '../../styles/Item'
import { Even } from '../../styles/Even'
import { Colors } from '../../styles/Colors'
import Loading from '../Loading'

const ROOT_LINK = 'http://agenciaprospecta.com.br/clientes/passoapassov2/wsapp/'
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

class MyVouchers extends React.Component {

  constructor() {
    super();

    this.category = ''
    this.state = {
      fetching: false,
    }
  }

  fetchVouchers(aluno_id) {
    this.setState({fetching: true})
    fetch(ROOT_LINK + `getVouchers.php?aluno_id=${aluno_id}`, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
      this.props.saveVouchersList(data)
      this.setState({fetching: false})
    })
    .catch((error) => {
      this.setState({fetching: false})
      console.log(error)
    });
  }

  componentDidUpdate(prevProps) {
    const { userData, changeSector } = this.props
    if(userData !== prevProps.userData){
      if(userData.ok !== true){
        changeSector(1)
        if(userData.usuario){
          this.fetchVouchers(userData.usuario)
        }
      }
    }
  }

  componentDidMount() {
    this.props.saveHeader('MEUS VOUCHERS', this.props.page, this.props.subPage, {})

    if(this.props.userData.usuario){
      this.fetchVouchers(this.props.userData.usuario)
    } else {
      this.setState({fetching: false})
    }
    // var idk = arr.sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0));
    // var temp = idk.sort((a,b) => (a.usado > b.usado) ? 1 : ((b.usado > a.usado) ? -1 : 0));
    // this.setState({data: temp})
  }

  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => item.usado ? {} : this.props.voucherState(true, item)} activeOpacity={0.5} key={index} style={Item.containerSm}>
        <View style={Item.titleRow}>
          <View style={[Item.leftSm, {backgroundColor: item.usado ? Colors.gddd : Colors.blue}]}/>
          <View style={Item.right}>
            <View style={{marginVertical: moderateScale(5)}}>
              <RobotoMedium numberOfLines={1} style={[Item.title, {color: item.usado ? Colors.g999 : Colors.blue}]}>{item.titulo}</RobotoMedium>
              <RobotoRegular numberOfLines={2} style={Item.title, {color: item.usado ? Colors.g999 : Colors.blue}}>{item.descricao}</RobotoRegular>
            </View>
            <RobotoRegular style={Item.offDate}>{item.data}</RobotoRegular>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _keyExtractor = (item, index) => String(index);

  render() {

    const { fetching } = this.state
    const { vouchersList } = this.props

    return (
      <View style={Build.containerTop}>
        { fetching &&
          <View style={{alignItems: 'center', marginVertical: moderateScale(10)}}>
            <Loading color={Colors.blue} size={30}/>
          </View>
        }
        { vouchersList.length > 0 ?
          <FlatList
            data={vouchersList.sort((a,b) => (a.usado > b.usado) ? 1 : ((b.usado > a.usado) ? -1 : 0))}
            initialNumToRender={vouchersList.length}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
          : fetching === false &&
          <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, marginVertical: moderateScale(10)}}>
            <MaterialCommunityIcons
              color={Colors.gddd}
              name='ticket-outline'
              size={moderateScale(50)}
            />
          <RobotoMedium style={[Item.title, {textAlign: 'center', fontSize: moderateScale(18)}]}>Nenhum voucher foi</RobotoMedium>
            <RobotoMedium style={[Item.title, {textAlign: 'center', fontSize: moderateScale(18)}]}>encontrado</RobotoMedium>
          </View>
        }
        <View style={Item.blank}/>
      </View>
    )
  }
}

const mapStateToProps = store => ({
  vouchersList: store.vouchersListState.vouchersList,
  title: store.headerState.title,
  page: store.headerState.page,
  subPage: store.headerState.subPage,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ saveHeader, saveVouchersList }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MyVouchers);
