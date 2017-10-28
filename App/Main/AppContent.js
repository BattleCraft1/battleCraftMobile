import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    TouchableWithoutFeedback,
} from 'react-native';

import Navbar from '../Components/Navbar/Navbar';
import Navigator from '../Components/Navigator/Navigator'
import Dropdown from '../Components/Common/Dropdown/Dropdown'
import SplashScreen from '../Components/Common/SplashScreen';
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
            navigValue: "BattleCraft",
            appReady: false
        };
    }

    async componentDidMount() {
        this.setState({appReady:false});
        this.props.startLoading("Starting application...");
        await Font.loadAsync({
            'arial': require('../../assets/Fonts/arial.ttf'),
            'FontAwesome': require('../../assets/Fonts/FontAwesome.ttf')
        });
        this.props.stopLoading();
        this.setState({appReady:true});
    }

    navigate(navigValue){
        this.setState({navigValue: navigValue});
    }

    toggleMenu(){
        this.refs.Menu.toggleDropdownVisibility();
    }

    setMenu(val){
        this.refs.Menu.setVisibility(val);
    }

    createContent(){
        let content;
        if(this.state.appReady){
            content=
                <View style={{flex:1}}>
                    <TouchableWithoutFeedback style={{flex:1}} onPress={()=>{this.setMenu(false)}}>
                        <View style={{flex:1}}>
                            <Navbar navigate={this.navigate.bind(this)} menuText={this.state.navigValue} toggleMenu={this.toggleMenu.bind(this)}/>
                            <FadeView style={{flex:1}}>
                                <Navigator navigValue={this.state.navigValue}/>
                                <ConfirmDialog/>
                                <MessageDialog/>
                                <LoadingSpinner/>
                            </FadeView>
                        </View>
                    </TouchableWithoutFeedback>
                    <Dropdown ref="Menu" navigate={this.navigate.bind(this)} listElements={["Tournaments", "Games", "Rankings", "Users", "My account"]}/>
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
