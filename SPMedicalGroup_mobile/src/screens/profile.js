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
      
            if (tokenUsuario !== null) {
              this.setState({ nome : jwtDecode(tokenUsuario).name});
              this.setState({ email : jwtDecode(tokenUsuario).email });
            }
      
          } catch (error) {
            console.warn(error);
          }
    };

    componentDidMount() {
        this.buscarDados();
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
                    <Text style={styles.headerText}>{'Perfil'}</Text>
                </View>
                    <View style={styles.body}>
                        <Text style={styles.infoUserText}>{'Email: '} {this.state.email}</Text>
                        <Text style={styles.infoUserText}>{'Nome de Usuário: '} {this.state.nome}</Text>

                        <Image 
                            source={require('../../assets/img/logo_spmedgroup_v1.png')}
                            style={styles.mainImgLogin}/>
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
    backgroundColor: '#69D6F0',
    fontFamily: 'Roboto'
  },
  // cabeçalho
  header: {
    marginLeft: 30,
    marginTop: 12,
  },

  headerText:{
    fontWeight: 'bold',
    fontSize: 25
  },

  body: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  infoUserText:{
    fontSize: 15
  },

  btnLogout: {
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    width: 240,
    marginBottom: 50
  },

  btnLogoutText: {
    fontSize: 20,
    font_weight: 'bold',
  },

  mainImgLogin: {
    height: 83,
    width: 74,
    margin: 60,
    marginTop: 0
}

});