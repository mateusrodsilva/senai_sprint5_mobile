import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './login';
import Consultas from './consultas';
import Profile from './profile';

const bottomTab = createBottomTabNavigator();

export default class Main extends Component {

  render(){
    return (
      <View style={styles.main}>
        <bottomTab.Navigator
        initialRouteName= 'Consultas'
        
        tabBarOptions={{
            showLabel: false,
            showIcon: true,
            activeBackgroundColor: '#559CD9',
            inactiveBackgroundColor: '#55D9D7',
            activeTintColor: '#FFF',
            inactiveTintColor: '#000',
            style: { height : 50 }
        }}
        screenOptions={({ route }) => ({
            tabBarIcon: () => {
            if (route.name === 'Consultas') {
                return(
                <Image
                    source={require('../../assets/img/27bc965b6aa4487db8d202e18494eebc.png')}
                    style={styles.tabBarIcon}
                />
                )
            }

            if (route.name === 'Profile') {
                return(
                <Image 
                    source={require('../../assets/img/16363.png')}
                    style={styles.tabBarIcon}
                />
                )
            }
            }
        }) }
        >
            <bottomTab.Screen name="Consultas" component={Consultas} />
            <bottomTab.Screen name="Perfil" component={Profile} />
        </bottomTab.Navigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  main: {
    flex: 1,
    backgroundColor: '#F1F1F1'
  },

  tabBarIcon: {
    width: 22,
    height: 22
  }

});