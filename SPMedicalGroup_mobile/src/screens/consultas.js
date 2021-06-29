import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import api from '../services/api';


export default class Consulta extends Component{
  constructor(props){
    super(props);
    this.state = {
      listaConsultas: []
    };
  }


  buscarConsultas = async () =>{
    const resposta = await api.get('/consulta');
    this.setState({listaConsultas : resposta.data});
  };

  componentDidMount(){
    this.buscarConsultas();
  }

  render(){
    return(
      <View style ={styles.main}>
          <View style={styles.header}>
            <Text>{'Consultas'}</Text>
          </View>
          <View styles ={styles.body}>
            <FlatList
            contentContainerStyle={styles.mainBodyContent}
            data={this.state.listaConsultas}
            keyExtractor={ item => item.idConsulta }
            renderItem={this.renderItem}/>
          </View>
      </View>
    );
  }

  renderItem = ({ item }) => (

    <View style={styles.flatItemRow}>
      <View style={styles.flatItemContainer}>
        <Text style={styles.flatItemInfo}>{Intl.DateTimeFormat('pt-BR').format(new Date(item.dataConsulta))}</Text>
        <Text style={styles.flatItemTime}>{new Date(item.dataConsulta).toLocaleTimeString()}</Text>
        <Text style={styles.flatItemTitle}>{item.idMedicoNavigation.nomeMedico} {" - "} {item.idMedicoNavigation.idEspecialidadeNavigation.nomeEspecialidade}</Text>
        <Text style={styles.flatItemInfo}>{"Paciente: "}{item.idProntuarioNavigation.nomePaciente}</Text>
      </View>
    </View>
  )


}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#69D6F0'
  },

  header:{
    marginLeft: 30,
    marginTop: 12,
  },

  body:{
    flex: 4,
    backgroundColor: 'black'
  },

  mainBodyContent: {
    paddingTop: 30,
    paddingRight: 50,
    paddingLeft: 50
  },
  flatItemRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 30
  },
  flatItemContainer: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  flatItemTitle: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Open Sans Light'
  },
  flatItemInfo: {
    fontSize: 12,
    color: '#999',
    lineHeight: 20
  },
  flatItemImg: {
    justifyContent: 'center'
  },
  flatItemImgIcon: {
    width: 26,
    height: 26,
    tintColor: '#B727FF'
  }

  
  
});
