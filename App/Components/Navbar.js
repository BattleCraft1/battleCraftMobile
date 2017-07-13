import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';

export default class Navbar extends Component {
  render() {
    return (
		<View style={styles.navbarStyle}>
			<Text style={styles.navbarTextStyle}>Menu</Text>
			<TouchableHighlight>
				<Text style={styles.navbarTextStyle}>Test</Text>
			</TouchableHighlight>
		</View>		
    );
  }
}

const styles = StyleSheet.create({
  navbarStyle: {
	height: 60,
	flexDirection: 'row',
	margin: 1,
    padding: 5,
	justifyContent: 'center',
	borderColor: '#c1af6e',
	borderWidth: 5,
	backgroundColor: '#513321',
  },
  navbarTextStyle: {
	color: '#fff',
	fontWeight: 'bold',
	fontSize: 26,
  },
  logoStyle: {
	width: 50, 
	height: 50,
  },

});

module.export = Navbar;
