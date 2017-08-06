/**
 * Created by FBegiello on 17.07.2017.
 */

import React, { Component } from 'react';
import {
    Image,
    View,
    Dimensions,
} from 'react-native';
import FadeView from './Components/FadeView'
import MainStyles from './Styles/MainStyles'

export default class SplashScreen extends Component {

    constructor() {
        super()
    }

    render() {
        return (
            <FadeView style={{flex:1}}>
                <View style={[MainStyles.contentStyle]}>
                    <Image
                        style={{width: Dimensions.get('window').width}}
                        source={require('../img/logoBig.png')} />
                </View>
            </FadeView>
        );
    }
}

module.export = SplashScreen;
