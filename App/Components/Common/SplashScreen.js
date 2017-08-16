import React, { Component } from 'react';
import {
    Image,
    View,
    Dimensions,
} from 'react-native';
import FadeView from './FadeView'

export default class SplashScreen extends Component {

    constructor() {
        super()
    }

    render() {
        return (
                <View style={{flex: 1}}>
                    <Image
                        style={{flex:1, width: Dimensions.get('window').width}}
                        source={require('../../../img/logoBig.png')} />
                </View>
        );
    }
}

module.export = SplashScreen;
