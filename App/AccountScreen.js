/**
 * Created by FBegiello on 18.07.2017.
 */

import React, { Component } from 'react';
import {
    Text,
    View,
} from 'react-native';
import FadeView from './Components/FadeView'
import MainStyles from './Styles/MainStyles'

export default class AccountScreen extends Component {

    constructor() {
        super()
    }

    render() {
        return (
            <FadeView style={{flex:1}}>
                <View style={[MainStyles.contentStyle]}>
                    <Text style={MainStyles.smallWhiteStyle}>Account</Text>
                </View>
            </FadeView>
        );
    }
}

module.export = AccountScreen;
