/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components'
import Navbar from './App/Components/Navbar';
import SplashScreen from './App/SplashScreen';
import ListScreen from './App/ListScreen';

export default class battleCraft extends Component {

    constructor() {
        super()
        this.state = {
            currentScreen: 'Splash',
        }
        this._setScreen = this._setScreen.bind(this);
        this._getScreen = this._getScreen.bind(this);
    }

    _setScreen(screenValue){
        switch(screenValue){
            case '0':
                this.setState({currentScreen: 'List'});
                break;
            case '1':
                this.setState({currentScreen: 'List'});
                break;
            case '2':
                this.setState({currentScreen: 'List'});
                break;
            case '3':
                this.setState({currentScreen: 'List'});
                break;
            default:
                this.setState({currentScreen: 'Splash'});
        }
    }

    _getScreen(){
        return this.state.currentScreen;
    }

    renderScene(route, navigator) {
        if(route.name == 'Splash') {
            return <SplashScreen navigator={navigator} screen={this.currentScreen}/>
        }
        if(route.name == 'List') {
            return <ListScreen navigator={navigator} screen={this.currentScreen}/>
        }
    }

    configureScene(route, routeStack){
        return Navigator.SceneConfigs.VerticalDownSwipeJump
    }

    render() {
        return (
            <View style={styles.mainStyle}>

                <Navbar onChangeScreen={this._setScreen}/>

                <Navigator
                    configureScene={ this.configureScene }
                    style={{ flex:1 }}
                    initialRoute={{ name: 'Splash' }}
                    renderScene={ this.renderScene } />

            </View>
        );
    }
}



const styles = StyleSheet.create({
  mainStyle: {
      flex: 1,
      backgroundColor: '#000',
  },
  contentStyle: {
      flex: 0.9,
	  padding: 5,
      marginTop: 1,
	  justifyContent: 'center',
	  borderColor: '#c1af6e',
	  borderWidth: 5,
      backgroundColor: '#7f5136',
  },
  bigWhiteStyle: {
	  color: '#fff',
	  fontWeight: 'bold',
	  fontSize: 26,
  },
  smallWhiteStyle: {
	  color: '#fff',
	  fontSize: 20,
  },
});

AppRegistry.registerComponent('battleCraft', () => battleCraft);
