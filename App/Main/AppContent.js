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
import FadeView from '../Components/Common/FadeView'
import ConfirmDialog from '../Components/Common/ConfirmationDialog/ConfirmDialog'
import MessageDialog from '../Components/Common/MessageDialog/MessageDialog'
import LoadingSpinner from '../Components/Common/Loading/LoadingSpinner'
import { Font } from 'expo';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../Redux/actions';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentScreen: "Main",
            appReady:false
        };
        this._setScreen = this._setScreen.bind(this);
    }

    async componentDidMount() {
        this.setState({appReady:false});
        this.props.startLoading("Starting application...");
        await Font.loadAsync({
            'arial': require('./../../assets/Fonts/arial.ttf'),
            'FontAwesome': require('./../../assets/Fonts/FontAwesome.ttf')
        });
        this.props.stopLoading();
        this.setState({appReady:true});
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

    createContent(){
        let content;
        if(this.state.appReady){
            content=
                <View style={{flex:1}}>
                    <Navbar onChangeScreen={this._setScreen}/>
                    <FadeView style={{flex:1}}>
                        {this.selectMainScreen()}
                        <ConfirmDialog/>
                        <MessageDialog/>
                        <LoadingSpinner/>
                    </FadeView>
                </View>
        }
        else{
            content=
                <View style={{flex:1}}>
                    <SplashScreen/>
                    <LoadingSpinner/>
                </View>
        }
        return content;
    }

    render(){
        return (
            <View style={MainStyles.background}>
                {this.createContent()}
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

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        loading: state.loading
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( App );
