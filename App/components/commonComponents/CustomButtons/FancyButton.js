/**
 * Created by FBegiello on 03.12.2017.
 */

import React, { Component } from 'react';
import {
    Image,
    TouchableHighlight,
    Text,
    View,
} from 'react-native';
import Sound from 'react-native-sound';

import MainStyles from 'battleCraftMobile/App/Styles/UniversalStyles/MainStyles'
import FancyButtonStyle from 'battleCraftMobile/App/Styles/UniversalStyles/FancyButtonStyle'

const BGred = require('battleCraftMobile/img/BGred.png');
const BGbrow = require('battleCraftMobile/img/BGbrown.png');

export default class FancyButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        const resizeMode = 'stretch';
        return (
            <View style={[{height:100, width:400},MainStyles.borderStyle, FancyButtonStyle.buttonWrapper]}>
                <View style={FancyButtonStyle.buttonBackground}>
                    <Image style={{flex: 1, resizeMode,}} source={this.props.colour==='red'?BGred:BGbrow}/>
                </View>
                <TouchableHighlight style={FancyButtonStyle.buttonStyle} onPress={() => this.props.onPress()}>
                    <Text style={{color: '#fff', fontWeight: 'bold', fontSize: this.props.fontSize,}}>{this.props.text}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
