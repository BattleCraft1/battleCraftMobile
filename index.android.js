/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Navbar from './App/Components/Navbar';

export default class battleCraft extends Component {

  render() {
    return (
		<View style={styles.mainStyle}>

            <Navbar/>

			<View style={styles.contentStyle}>
				<Text style={styles.smallWhiteStyle}>Main</Text>
			</View>			
		</View>
    );
  }
}

const styles = StyleSheet.create({
  mainStyle: {
      flex: 1,
      backgroundColor: '#000',
  },
  contentStyle: {
      flex: 0.9,
	  padding: 5,
      marginTop: 1,
	  justifyContent: 'center',
	  borderColor: '#c1af6e',
	  borderWidth: 5,
      backgroundColor: '#7f5136',
  },
  bigWhiteStyle: {
	  color: '#fff',
	  fontWeight: 'bold',
	  fontSize: 26,
  },
  smallWhiteStyle: {
	  color: '#fff',
	  fontSize: 20,
  },
});

AppRegistry.registerComponent('battleCraft', () => battleCraft);
