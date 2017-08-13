import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
} from 'react-native';

import Navbar from '../Components/Navbar/Navbar';
import SplashScreen from '../Components/Common/SplashScreen';
import ListScreen from '../Components/CollectionPanel/Table/Tournament/ListScreen';
import AccountScreen from '../Components/Account/AccountScreen';
import MainStyles from '../Styles/MainStyles'

class App extends Component {

    constructor() {
        super();
        this.state = {
            currentScreen: '-1',
        };
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

    render(){
        return (
            <View style={MainStyles.background}>

                <Navbar onChangeScreen={this._setScreen}/>
                {this.selectMainScreen()}

            </View>
        );
    }
}

const resp = StyleSheet.create({
    base:{
        position:'absolute',
        width: '100%',
        height: '100%',
        backgroundColor:'rgb(0, 0, 0)',
        padding: '20px 0 0 0',
        margin: '0 0 0 0',
    }
});

export default App
