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

                    <View style={styles.body}>
                        <Text>{this.state.email}</Text>
                        <Text>{this.state.nome}</Text>
                    </View>



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