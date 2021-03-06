import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    Dimensions,
	TouchableHighlight,
} from 'react-native';

import MainStyles from '../../Styles/UniversalStyles/MainStyles'
import NavbarStyles from '../../Styles/NavbarStyles/NavbarStyles'

export default class Navbar extends Component {

    constructor() {
        super();
        this.state = {
            menuText: "BattleCraft",
        }
    }

    onPressLogo = () => {
        this.setState({menuText: "BattleCraft"});
        this.props.navigate("BattleCraft");
	};

	render() {
        let menuText = this.props.menuText;
        if(menuText.includes('Progress/')){
            menuText = menuText.substr(menuText.indexOf('/')+1)
		}
		return (
			<View style={[NavbarStyles.navbarStyle, MainStyles.borderStyle]}>
				<View>
					<TouchableHighlight onPress={this.onPressLogo}>
						<Image
                            style={NavbarStyles.logoStyle}
							source={require('../../../img/logoSmall.png')} />
					</TouchableHighlight>
				</View>

				<View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
					<Text  numberOfLines={1} style={[MainStyles.textStyle,NavbarStyles.navbarTextStyle]}>{menuText}</Text>
				</View>

				<View>
					<TouchableHighlight onPress={this.props.toggleMenu}>
						<Image
							style={NavbarStyles.iconStyle}
							source={require('../../../img/navbarMenuIcon.png')} />
					</TouchableHighlight>
				</View>

			</View>
		);
	}
}

module.export = Navbar;
