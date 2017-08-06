/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
} from 'react-native';
import Navbar from './App/Components/Navbar';
import SplashScreen from './App/SplashScreen';
import ListScreen from './App/ListScreen';
import AccountScreen from './App/AccountScreen';
import MainStyles from './App/Styles/MainStyles'

export default class battleCraft extends Component {

    constructor() {
        super()
        this.state = {
            currentScreen: '-1',
        }
        this._setScreen = this._setScreen.bind(this);
    }

    _setScreen(screenValue){
        this.setState({currentScreen: screenValue});
    }

    selectMainScreen() {
        switch(this.state.currentScreen) {
            case '0':
                return <ListScreen listType='tournament'/>;
            case '1':
                return <ListScreen listType='game'/>;
            case '2':
                return <ListScreen listType='ranking'/>;
            case '3':
                return <AccountScreen/>;
            default:
                return <SplashScreen/>;
        }
    }

    render() {
        return (
            <View style={MainStyles.background}>

                <Navbar onChangeScreen={this._setScreen}/>
                {this.selectMainScreen()}

            </View>
        );
    }
}

AppRegistry.registerComponent('battleCraft', () => battleCraft);
