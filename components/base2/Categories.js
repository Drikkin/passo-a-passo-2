import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ImageBackground, TouchableOpacity, Linking, TouchableWithoutFeedback, Animated, Easing, FlatList, TextInput, Modal } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MaterialCommunityIcons, FontAwesome, AntDesign, Feather, Entypo } from '@expo/vector-icons';
import { RobotoRegular, RobotoBold, RobotoMedium, RobotoBlack } from '../Text.js'
import { saveUserData, saveSearch } from '../../actions'
import { scale, verticalScale, moderateScale, width, height } from '../../styles/Scaling.js'
import { Build } from '../../styles/Build'
import { Mod } from '../../styles/Mod'
import { Log } from '../../styles/Log'
import { Item } from '../../styles/Item'
import { Desc } from '../../styles/Desc'
import { Land, Slider } from '../../styles/Land'
import Loading from '../Loading'
import Carousel from 'react-native-snap-carousel';
import { Colors } from '../../styles/Colors'
import IconVal from '../IconVal.js'
import HTML from 'react-native-render-html';
import removeAccents from 'remove-accents'

const ROOT_LINK = 'http://agenciaprospecta.com.br/clientes/passoapassov2/wsapp/'


const ICONS = [
  {type: 'MaterialCommunityIcons', color: '#ffffff', name: 'food', size: '50'},
  {type: 'MaterialCommunityIcons', color: '#ffffff', name: 'car-hatchback', size: '50'},
  {type: 'MaterialCommunityIcons', color: '#ffffff', name: 'medical-bag', size: '50'},
  {type: 'MaterialCommunityIcons', color: '#ffffff', name: 'airplane', size: '50'},
  {type: 'FontAwesome', color: '#ffffff', name: 'home', size: '50'},
  {type: 'MaterialCommunityIcons', color: '#ffffff', name: 'office-building', size: '50'},
  {type: 'MaterialCommunityIcons', color: '#ffffff', name: 'ring', size: '50'},
]
const width015 = width*0.15
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

class SubClasses extends React.Component {

  constructor() {
    super();

    this.error = 0
    this.state = {
      query: '',
      showList: false,
      parceiros: [],
      loading: false,
      filtering: true,
      filteredPartners: [],
    }
  }

  componentDidMount() {
    this.timer = null
    if(this.props.data && this.props.data.id){
      this.storeSearch(this.props.data)
    } else if (this.props.data && this.props.data.reset === true){
      this.setState({query: '', loading: false})
      this.props.saveSearch(false, {}, 0, '', [])
    }
    const { parceiros } = this.props.initialData
    var temp = parceiros.sort((a,b) => (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0));
    this.setState({parceiros: temp})

    let wait = new Promise((resolve) => setTimeout(resolve, 250));
    wait.then(() => {
      if(this._flatList){
        this._flatList.scrollToIndex({index: 0, animated: true});
      }
    });
  }

  renderMedias() {
    var site = this.props.searchItem.site,
        youtube = this.props.searchItem.youtube,
        facebook = this.props.searchItem.facebook,
        instagram = this.props.searchItem.instagram,
        list = []
    if(site) {
      list.push(
        <TouchableOpacity style={{marginRight: moderateScale(15)}} onPress={() => Linking.openURL(site)}>
          <MaterialCommunityIcons
            color={Colors.lightBlue}
            name='web'
            size={moderateScale(36)}
          />
        </TouchableOpacity>
      )
    }
    if(facebook) {
      list.push(
        <TouchableOpacity style={{marginRight: moderateScale(15)}} onPress={() => Linking.openURL(facebook)}>
          <Entypo
            color={Colors.facebook}
            name='facebook'
            size={moderateScale(35)}
          />
        </TouchableOpacity>
      )
    }
    if(instagram){
      list.push(
        <TouchableOpacity style={{marginRight: moderateScale(15)}} onPress={() => Linking.openURL(instagram)}>
          <AntDesign
            color={Colors.instagram}
            name='instagram'
            size={moderateScale(36)}
          />
        </TouchableOpacity>
      )
    }
    if(youtube){
      list.push(
        <TouchableOpacity style={{marginRight: moderateScale(15)}} onPress={() => Linking.openURL(youtube)}>
          <AntDesign
            color={Colors.youtube}
            name='youtube'
            size={moderateScale(35)}
          />
        </TouchableOpacity>
      )
    }

    return list
  }

  filter(search) {

    var query = removeAccents(search).toUpperCase(),
        clonedPartners = JSON.parse(JSON.stringify(this.state.parceiros))

    query = query.split(' ')

    let filteredPartners = clonedPartners.filter((data, i) => {
      let string = []
      if(data.nome){
        let rev = removeAccents(data.nome)
        string.push(...rev.toUpperCase().split(' '))
      }
      let op = query.every(srch => string.find(str => str.includes(srch)))
      if(op === true){
        return data
      }
    })

    this.setState({filteredPartners})
  }

  clearSearch() {
    this.setState({query: '', loading: false})
    this.props.saveSearch(false, {}, 0, '', [])
  }

  storeSearch(item) {
    this.setState({query: '', showList: false, loading: true})
    if(item.id){
      fetch( ROOT_LINK + `parceiro_busca.php?bannerId=${item.id}`, {
        method: 'POST',
      })
      .then((response) => response.json())
      .then((data) => {
        if(data) {

          const aulas = data.aulas
          const result = [];
          const map = new Map();

          const count = aulas.reduce((a, b) => (
            { ...a,
              [b.categoria]: (a[b.categoria] || 0) + 1
            }
          ), {})

          aulas.forEach((data,i) => {
            if(!map.has(data.categoria)){
              map.set(data.categoria, true);
              result.push({
                count: count[data.categoria],
                categoria: data.categoria,
                categoria_id: data.categoria_id,
                categoria_imagem: data.categoria_imagem,
                titulo_detalhe: data.titulo_detalhe,
                cor: data.cor,
                id: i
              });
            }
          })

          this.props.saveSearch(true, item, item.id, item.nome, result)
          setTimeout(() => {
            this.setState({loading: false})
          }, 250)
        } else {
          this.setState({loading: false})
          this.props.saveSearch(true, item, item.id, item.nome, [])
        }
      })
      .catch((error) => {
        this.clearSearch()
        console.log(error)
      });
    } else {
      this.setState({loading: false})
      this.props.saveSearch(false, item, item.id, item.nome, [])
    }

  }

  changeQuery(query) {
    clearTimeout(this.timer);
    this.setState({query})
    this.timer = setTimeout(() => {
      this.filter(query)
    }, 400)
  }

  _renderPartner = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => {this.storeSearch(item)}} activeOpacity={0.5} key={index} style={Item.container}>
        <ImageBackground source={{ uri: item.imagem}} style={Item.left}/>
        <View style={Item.right}>
          <RobotoRegular numberOfLines={1} style={Item.titleSm}>{item.nome.trim()}</RobotoRegular>
        </View>
      </TouchableOpacity>
    )
  }

  _removeHifen(text) {
    if(text){
      return text.replace(/[-]/gi,' ')
    }
    return ''
  }

  _renderItem = ({item, index}) => {
    if(this.state.showData) {
      return (
        <TouchableOpacity onPress={() => this.props.changePage(item.titulo_detalhe.trim(),1,2,{dif: item.categoria_id, title: this._removeHifen(item.titulo_detalhe.trim()).toUpperCase()})} activeOpacity={0.5} key={index} style={Item.container}>
          { item.categoria_imagem ?
            <ImageBackground source={{ uri: item.categoria_imagem }} style={Item.left}/>
            :
            <View style={[Item.left, {backgroundColor: item.cor}]}/>
          }
          <View style={Item.right}>
            {
              // <RobotoRegular numberOfLines={3} style={Item.titleSm}>{Entities.decode(item.titulo_detalhe.trim()).toUpperCase()}</RobotoRegular>
            }
            <RobotoRegular numberOfLines={3} style={Item.titleSm}>{this._removeHifen(item.titulo_detalhe.trim()).toUpperCase()}</RobotoRegular>
            <View style={[Item.subLayout, {backgroundColor: item.cor}]}>
              <RobotoRegular style={Item.subLayoutText}>{item.count ? item.count > 1 ? item.count + ' Vantagens' : item.count + ' Vantagem' : '0 Vantagens'}</RobotoRegular>
            </View>
          </View>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity onPress={() => this.props.changePage(item.titulo_detalhe.trim(),1,2,{dif: item.categoria_id, title: this._removeHifen(item.titulo_detalhe.trim()).toUpperCase()})} activeOpacity={0.5} key={index} style={Item.container}>
          { item.categoria_imagem ?
            <ImageBackground source={{ uri: item.categoria_imagem }} style={Item.left}/>
            :
            <View style={[Item.left, {backgroundColor: item.cor}]}/>
          }
          <View style={Item.right}>
            {
              // <RobotoRegular numberOfLines={3} style={Item.titleSm}>{Entities.decode(item.titulo_detalhe.trim()).toUpperCase()}</RobotoRegular>
            }
            <RobotoRegular numberOfLines={3} style={Item.titleSm}>{this._removeHifen(item.titulo_detalhe.trim()).toUpperCase()}</RobotoRegular>
            <View style={[Item.subLayout, {backgroundColor: item.cor}]}>
              <RobotoRegular style={Item.subLayoutText}>{item.count ? item.count > 1 ? item.count + ' Vantagens' : item.count + ' Vantagem' : '0 Vantagens'}</RobotoRegular>
            </View>
          </View>
        </TouchableOpacity>
      )
    }
  }

  _renderFooter = () => (
    <View style={Item.blank}/>
  )

  _renderEmpty = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: width*0.1}}>
      <RobotoMedium style={{textAlign: 'center', color: Colors.blue, fontSize: moderateScale(19), marginVertical: moderateScale(20)}}>Ops...</RobotoMedium>
      <RobotoRegular style={{textAlign: 'center', color: Colors.g444, fontSize: moderateScale(16)}}>Não encontramos nenhuma vantagem disponível para este parceiro.</RobotoRegular>
      <TouchableOpacity onPress={() => this.clearSearch()} style={{
          backgroundColor: Colors.blue,
          marginTop: moderateScale(20),
          paddingVertical: moderateScale(8),
          paddingHorizontal: moderateScale(14),
          borderRadius: moderateScale(8),
        }}>
        <RobotoRegular style={Log.buttonTxt2}>Limpar busca</RobotoRegular>
      </TouchableOpacity>
    </View>
  )

  _renderHeader = () => (
    <View>
      <View style={Build.search}>
        <View style={Build.shadowDown}/>
        <View style={Build.row}>
          <TouchableOpacity onPress={() => {this.setState({showList: true})}} style={Build.searchRow}>
            <View style={Build.searchIcon}>
              <IconVal type='MaterialIcons' color={Colors.g333} name='search' size={30}/>
            </View>
            <RobotoRegular style={Build.searchTxt}>{this.props.current.length > 0 ? this.props.current : 'Buscar por parceiros'}</RobotoRegular>
          </TouchableOpacity>
          { this.props.current.length > 0 &&
            <TouchableOpacity onPress={() => this.clearSearch()} style={Build.searchIcon}>
              <IconVal type='AntDesign' color={Colors.g333} name='close' size={25}/>
            </TouchableOpacity>
          }
        </View>
        <View style={Build.shadowUp}/>
      </View>
    </View>
  )

  _renderCurrentHeader = () => (
    <View>
      <View style={Build.searchFree}>
        <View style={Build.shadowDown}/>
        <View style={Build.row}>
          { this.props.searchItem.imagem &&
            <Image source={{ uri: this.props.searchItem.imagem }}  style={{marginLeft: width*0.02, marginVertical: width*0.02, width: width*0.25, height: width*0.25, borderRadius: width*0.025, borderWidth: moderateScale(0.5), borderColor: Colors.gccc, zIndex: 10}}/>
          }
          <View style={{flex: 1, paddingLeft: width*0.03}}>
            <View style={{flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
              <RobotoMedium style={{fontSize: moderateScale(15), flex: 1, color: Colors.g222}} numberOfLines={2}>{this.props.current}</RobotoMedium>
              <TouchableOpacity onPress={() => this.clearSearch()} style={[Build.searchIcon, {alignSelf: 'stretch'}]}>
                <IconVal type='AntDesign' color={Colors.g333} name='close' size={25}/>
              </TouchableOpacity>
            </View>
            <View style={{backgroundColor: Colors.gccc, height: moderateScale(0.5), borderRadius: moderateScale(2), marginLeft: -width*0.15, marginRight: width*0.03, zIndex: -2}}/>
            <View style={{flex: 1, paddingVertical: moderateScale(5), flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
              {this.renderMedias()}
            </View>
          </View>
        </View>
      </View>
      <View style={Build.shadowUp}/>
    </View>
  )

  _keyExtractor = (item, index) => String(index);

  render() {
    const { catClub, showData, cats } = this.props
    const { loading, filtering, parceiros, query, filteredPartners } = this.state
    const partners = query.trim().length > 1 ? filteredPartners : parceiros

    return (
      <View style={Build.container}>
        <Modal transparent={true} onRequestClose={() => this.setState({showList: false})} animationType="slide" visible={this.state.showList}>
          <View style={Mod.container}>
            <TouchableOpacity onPress={() => this.setState({showList: false})} activeOpacity={1} style={Mod.closer}/>
            <View style={Mod.divider}/>
            <View style={Build.search}>
              <View style={Build.shadowDown}/>
              <View style={Mod.row}>
                <TouchableOpacity onPress={() => {this.setState({showList: false})}} style={[Build.searchIcon, {alignSelf: 'stretch'}]}>
                  <IconVal type='Feather' color={Colors.g333} name='chevron-left' size={30}/>
                </TouchableOpacity>

                <TextInput
                  returnKeyType={"done"}
                  autoCapitalize='none'
                  placeholder='Buscar por parceiros'
                  placeholderTextColor={Colors.g555}
                  onChangeText={text => this.changeQuery(text)}
                  maxLength={128}
                  style={Mod.input}>
                  {query}
                </TextInput>
                { this.state.query.length > 0 &&
                  <TouchableOpacity onPress={() => this.setState({query: ''})} style={Build.searchIcon}>
                    <IconVal type='AntDesign' color={Colors.g333} name='close' size={25}/>
                  </TouchableOpacity>
                }
              </View>
              <View style={Build.shadowUp}/>
            </View>
            <View style={Build.container}>
              <FlatList
                initialNumToRender={12}
                data={partners}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderPartner}
                ListFooterComponent={() => {
                  if(filtering){
                    return (
                      <View style={{height: width*0.2, justifyContent: 'center', alignItems: 'center'}}>
                        <Loading color={Colors.lightBlue} size={28}/>
                      </View>
                    )
                  }
                  return (<View/>)
                }}
                onEndReached={() => {this.setState({filtering: false})}}
              />
            </View>
          </View>
        </Modal>
        {
          loading ?
          <View style={{flex: 1, backgroundColor: "rgba(0,0,0,0.05)", justifyContent: 'center', alignItems: 'center'}}>
            <Loading color={Colors.lightBlue} size={46}/>
          </View>
          :
          <FlatList
            ref={(ref) => { this._flatList = ref; }}
            ListHeaderComponent={showData ? this._renderCurrentHeader : this._renderHeader}
            ListFooterComponent={this._renderFooter}
            ListEmptyComponent={this._renderEmpty}
            initialNumToRender={8}
            data={showData ? cats : catClub }
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        }
      </View>
    )
  }
}

const mapStateToProps = store => ({
  initialData: store.initialDataState.initialData,
  title: store.headerState.title,
  page: store.headerState.page,
  subPage: store.headerState.subPage,
  data: store.headerState.data,
  catClub: store.categoriesState.catClub,
  showData: store.searchState.showData,
  searchItem: store.searchState.searchItem,
  searchId: store.searchState.searchId,
  current: store.searchState.current,
  cats: store.searchState.cats,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ saveSearch }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SubClasses);
