import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

export default class Navbar extends Component {

    constructor() {
        super()
        this.state = {
			menuIndex: -1,
            menuText: 'Menu'
        }
    }

    updateText = (id,val) => {
        this.setState({menuIndex: id});
        this.setState({menuText: val});
        this.props.onChangeScreen(id);
    }


	menuWidth=Dimensions.get('window').width;


	render() {

		return (
			<View style={styles.navbarStyle}>
				<View>
					<Image
						style={styles.logoStyle}
						source={require('../../img/logoSmall.png')} />
				</View>

				<View>
					<Text style={styles.navbarTextStyle}>{this.state.menuText}</Text>
				</View>

				<View>
					<ModalDropdown options={['Turnieje', 'Gry', 'Rankingi', 'Moje konto']}
								   dropdownStyle={[styles.menuStyle, {width: this.menuWidth}]}
								   dropdownTextStyle={styles.menuTextStyle}
								   dropdownTextHighlightStyle={[styles.menuTextStyle,{fontWeight:'bold'}]}
								   onSelect = {(index,value)=>{this.updateText(index,value)}}>
						<Image
							style={styles.iconStyle}
							source={require('../../img/menuIcon.png')} />
					</ModalDropdown>
				</View>

			</View>
		);
	}
}


const styles = StyleSheet.create({
    navbarStyle: {
	    height: 60,
		flexDirection: 'row',
		justifyContent: 'space-between',
        alignItems: 'center',
		paddingRight: 5,
	    borderColor: '#c1af6e',
	    borderWidth: 5,
	    backgroundColor: '#513321',
    },
    navbarTextStyle: {
	    color: '#fff',
	    fontWeight: 'bold',
	    fontSize: 26,
    },
	menuStyle: {
    	position: 'absolute',
		left:0,
        borderColor: '#c1af6e',
        borderWidth: 2,
        backgroundColor: '#513321',

	},
    menuTextStyle: {
        textAlign: 'center',
        borderColor: '#c1af6e',
        borderWidth: 1,
        color: '#fff',
        backgroundColor: '#513321',
        fontSize: 18,
    },
    logoStyle: {
	    width: 50,
	    height: 50,
    },
	iconStyle: {
        width: 40,
        height: 40,
    },

});

module.export = Navbar;
