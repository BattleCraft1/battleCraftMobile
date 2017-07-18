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
                return <ListScreen/>;
            case '1':
                return <ListScreen/>;
            case '2':
                return <ListScreen/>;
            case '3':
                return <ListScreen/>;
            default:
                return <SplashScreen/>;
        }
    }

    render() {
        return (
            <View style={styles.mainStyle}>

                <Navbar onChangeScreen={this._setScreen}/>
                {this.selectMainScreen()}

            </View>
        );
    }
}



const styles = StyleSheet.create({
  mainStyle: {
      flex: 1,
      backgroundColor: '#000',
  },
});

AppRegistry.registerComponent('battleCraft', () => battleCraft);
