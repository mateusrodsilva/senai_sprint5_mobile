import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { FlatList, Image, StyleSheet, Text, View,ScrollView } from 'react-native';
import api from '../services/api';


export default class Consulta extends Component{
  constructor(props){
    super(props);
    this.state = {
      listaConsultas: []
    };
  }


  buscarConsultas = async () =>{

    const token = await AsyncStorage.getItem('tokenUsuario');

    const resposta = await api.get('/consulta/minhasconsultas',{
      headers : {
        'Authorization' : 'Bearer ' + token
      }
    });

    this.setState({listaConsultas : resposta.data});
  };

  componentDidMount(){
    this.buscarConsultas();
  }

  render(){
    return(
      <View style ={styles.main}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{'Consultas'}</Text>
          </View>
          <ScrollView styles ={styles.body}>
            
              <FlatList
              contentContainerStyle={styles.mainBodyContent}
              data={this.state.listaConsultas}
              keyExtractor={ item => item.idConsulta }
              renderItem={this.renderItem}/>
          </ScrollView>
      </View>
    );
  }

  renderItem = ({ item }) => (
    <View style={styles.ItemConsulta}>
      <View style={styles.flatItemContainer}>
        <Text style={styles.flatItemInfo}>{Intl.DateTimeFormat('pt-BR').format(new Date(item.dataConsulta))}{' - '}{new Date(item.dataConsulta).toLocaleTimeString()}</Text>
        <Text style={styles.flatItemTitle}>{item.idMedicoNavigation.nomeMedico} {" - "} {item.idMedicoNavigation.idEspecialidadeNavigation.nomeEspecialidade}</Text>
        <Text style={styles.flatItemInfo}>{"Paciente: "}{item.idProntuarioNavigation.nomePaciente}</Text>
      </View>
    </View>
  )


}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#69D6F0',
    fontFamily: 'Roboto'
  },

  header:{
    marginLeft: 30,
    marginTop: 12,
  },

  headerText:{
    fontWeight: 'bold',
    fontSize: 25
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
  ItemConsulta: {
    flexDirection: 'row',
    marginTop: 30
  },
  flatItemContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 5
  },
  flatItemTitle: {
    fontSize: 20
  },

  flatItemInfo: {
    fontSize: 12,
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
