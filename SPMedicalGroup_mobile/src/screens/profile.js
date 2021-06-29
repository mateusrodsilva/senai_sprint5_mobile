import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';


export default class Profile extends Component {
    constructor(props){
      super(props);
      this.state = {
        nome : '',
        email : ''
      };
    }


    buscarDados = async () =>{
        try {
            const tokenUsuario = await AsyncStorage.getItem('tokenUsuario');
            console.warn( jwtDecode(tokenUsuario) );
      
            if (valorToken !== null) {
              this.setState({ nome : jwtDecode(tokenUsuario).name });
              this.setState({ email : jwtDecode(tokenUsuario).email });
            }
      
          } catch (error) {
            console.warn(error);
          }
    };

    componentDidMount() {
        this.buscarDadosStorage();
    };

    realizarLogout = async () => {
        try {
          await AsyncStorage.removeItem('tokenUsuario');
          this.props.navigation.navigate('Login');
        } catch (error) {
          console.warn(error);
        }
    };


    render(){
        return(
            <View style={styles.main}>
                <View style={styles.header}>
                    <Text>{'Perfil'}</Text>
                </View>
                    <View style={styles.body}>
                        <Text>{this.state.email}</Text>
                        <Text>{this.state.nome}</Text>
                    <TouchableOpacity
                        style={styles.btnLogout}
                        onPress={this.realizarLogout}>
                        <Text style={styles.btnLogoutText}>Sair</Text>
                    </TouchableOpacity>
                    </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

  // conteúdo da main
  main: {
    flex: 1,
    backgroundColor: '#69D6F0'
  },
  // cabeçalho
  header: {
    marginLeft: 30,
    marginTop: 12,
  },

  textheader: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Open Sans'
  },

  body: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  btnLogout: {
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    width: 240,
    borderTopWidth: 1,
    borderColor: "#ccc",
    marginBottom: 50
  },

  btnLogoutText: {
    fontSize: 20,
    font_weight: 300,
    fontFamily: "Open Sans",
  }

});