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

		return (
			<View style={[NavbarStyles.navbarStyle, MainStyles.borderStyle]}>
				<View>
					<TouchableHighlight onPress={this.onPressLogo}>
						<Image
                            style={NavbarStyles.logoStyle}
							source={require('../../../img/logoSmall.png')} />
					</TouchableHighlight>
				</View>

				<View>
					<Text style={[MainStyles.textStyle,NavbarStyles.navbarTextStyle]}>{this.props.menuText}</Text>
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
