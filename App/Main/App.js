import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
} from 'react-native';

import Navbar from '../Components/Navbar/Navbar';
import SplashScreen from '../Components/Common/SplashScreen';
import TournamentList from '../Components/CollectionPanel/Table/Tournament/ListScreen';
import GamesList from '../Components/CollectionPanel/Table/Game/ListScreen';
import UsersList from '../Components/CollectionPanel/Table/User/ListScreen';
import Ranking from '../Components/CollectionPanel/Table/Ranking/ListScreen';
import AccountScreen from '../Components/Account/AccountScreen';
import MainStyles from '../Styles/MainStyles'

class App extends Component {

    constructor() {
        super();
        this.state = {
            currentScreen: "Main",
        };
        this._setScreen = this._setScreen.bind(this);
    }

    _setScreen(screenValue){
        this.setState({currentScreen: screenValue});
    }

    selectMainScreen() {
        switch(this.state.currentScreen) {
            case "Tournaments":
                return <TournamentList/>;
            case "Games":
                return <GamesList/>;
            case "Rankings":
                return <Ranking/>;
            case "Users":
                return <UsersList/>;
            case "My account":
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
