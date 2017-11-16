import React, { Component } from 'react';
import {
    Text,
    View,
} from 'react-native';
import MainStyles from '../../Styles/UniversalStyles/MainStyles'

export default class AccountPanel extends Component {

    constructor() {
        super()
    }

    render() {
        return (
                <View style={[MainStyles.contentStyle]}>
                    <Text style={MainStyles.smallWhiteStyle}>Account</Text>
                </View>
        );
    }
}

module.export = AccountPanel;
