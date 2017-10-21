import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    Dimensions,
	TouchableHighlight,
} from 'react-native';

import MainStyles from '../../Styles/MainStyles'
import NavbarStyles from '../../Styles/NavbarStyles'

export default class Navbar extends Component {

    constructor() {
        super();
        this.state = {
            menuText: "BattleCraft",
			optionList: ["Tournaments", "Games", "Rankings", "Users", "My account"]
        }
    }


    updateText = (id,val) => {
            this.setState({
				menuText: val,
                optionList: ["Tournaments", "Games", "Rankings", "Users", "My account"]
            });
            this.props.navigate(val);
    };

    onPressLogo = () => {
        this.setState({menuText: "BattleCraft"});
        this.props.navigate("Main");
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
					<Text style={[MainStyles.textStyle,NavbarStyles.navbarTextStyle]}>{this.state.menuText}</Text>
				</View>

				<View>
						<Image
							style={NavbarStyles.iconStyle}
							source={require('../../../img/navbarMenuIcon.png')} />
				</View>

			</View>
		);
	}
}

module.export = Navbar;
