import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
	TouchableHighlight,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

export default class Navbar extends Component {

    constructor() {
        super()
        this.state = {
			menuIndex: -1,
            menuText: 'BattleCraft'
        }
    }

    updateText = (id,val) => {
        this.setState({menuIndex: id});
        this.setState({menuText: val});
        this.props.onChangeScreen(id);
    }

    onPressLogo = () => {
		this.updateText(-1,'BattleCraft')
	}

	render() {

		return (
			<View style={[styles.navbarStyle, styles.borderStyle]}>
				<View>
					<TouchableHighlight onPress={this.onPressLogo}>
						<Image
							style={styles.logoStyle}
							source={require('../../img/logoSmall.png')} />
					</TouchableHighlight>
				</View>

				<View>
					<Text style={[styles.textStyle,styles.navbarTextStyle]}>{this.state.menuText}</Text>
				</View>

				<View>
					<ModalDropdown options={['Turnieje', 'Gry', 'Rankingi', 'Moje konto']}
								   dropdownStyle={[styles.menuStyle, {width: Dimensions.get('window').width}, styles.borderStyle]}
								   dropdownTextStyle={[styles.textStyle, styles.menuTextStyle, styles.borderStyle]}
								   dropdownTextHighlightStyle={[styles.textStyle, styles.menuTextStyle, styles.borderStyle, {fontWeight:'bold'}]}
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
    textStyle:{
        fontFamily:'arial, helvetica, sans-serif',
        textShadowColor: '#000000',
        textShadowOffset: {width: -1, height: -1},
        color: '#fff',
    },

    borderStyle:{
        borderTopColor: '#e3ca86',
        borderRightColor: '#4b371b',
        borderBottomColor: '#E0BA51',
        borderLeftColor: '#ecdbac',
	},

    navbarStyle: {
	    height: 60,
		flexDirection: 'row',
		justifyContent: 'space-between',
        alignItems: 'center',
		paddingRight: 5,
	    borderWidth: 5,
	    backgroundColor: '#805D2C',
    },
    navbarTextStyle: {
	    fontWeight: 'bold',
	    fontSize: 26,
    },
	menuStyle: {
    	position: 'absolute',
		left:0,
        borderWidth: 0,
        backgroundColor: '#805D2C',

	},
    menuTextStyle: {
        textAlign: 'center',
        borderWidth: 3,
        backgroundColor: '#805D2C',

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
