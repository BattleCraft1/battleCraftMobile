import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    Dimensions,
	TouchableHighlight,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import MainStyles from '../../Styles/MainStyles'
import NavbarStyles from '../../Styles/NavbarStyles'

export default class Navbar extends Component {

    constructor() {
        super();
        this.state = {
            menuText: "BattleCraft",
			optionList: ["Tournaments", "Add tournament", "Games", "Add game", "Rankings", "Users", "My account"]
        }
    }


    updateText = (id,val) => {
            this.setState({
				menuText: val,
                optionList: ["Tournaments", "Add tournament", "Games", "Add game", "Rankings", "Users", "My account"]
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
					<ModalDropdown options={this.state.optionList}
								   dropdownStyle={[NavbarStyles.menuStyle, {width: Dimensions.get('window').width}, MainStyles.borderStyle]}
								   dropdownTextStyle={[MainStyles.textStyle, NavbarStyles.menuTextStyle, MainStyles.borderStyle]}
								   dropdownTextHighlightStyle={[MainStyles.textStyle, NavbarStyles.menuTextStyle, MainStyles.borderStyle, {fontWeight:'bold'}]}
								   onSelect = {(index,value)=>{this.updateText(index,value)}}>
						<Image
							style={NavbarStyles.iconStyle}
							source={require('../../../img/navbarMenuIcon.png')} />
					</ModalDropdown>
				</View>

			</View>
		);
	}
}

module.export = Navbar;
