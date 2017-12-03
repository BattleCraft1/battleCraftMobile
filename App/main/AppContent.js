import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableWithoutFeedback,
} from 'react-native';

import Navbar from '../components/navbar/Navbar';
import Navigator from '../components/navigator/Navigator'
import Dropdown from '../components/navbar/dropdown/Dropdown'
import SplashScreen from '../components/commonComponents/SplashScreen';
import MainStyles from '../Styles/UniversalStyles/MainStyles'
import FadeView from '../components/commonComponents/FadeView'
import ConfirmDialog from '../components/commonComponents/confirmationDialog/ConfirmDialog'
import EntityPanel from '../components/entityPanel/EntityPanel'
import AdditionalEntityPanel from '../components/entityPanel/AdditionalEntityPanel'
import MessageDialog from '../components/commonComponents/messageDialog/MessageDialog'
import ReportPanel from '../components/commonComponents/reportPanel/ReportPanel'
import LoadingSpinner from '../components/commonComponents/loading/LoadingSpinner'
import DimensionChangeListener from '../components/commonComponents/dimensionChangeListener/DimensionChangeListener'
import AuthManager from '../components/commonComponents/auth/AuthManager'
import SoundManager from '../components/commonComponents/SoundManager'
import { Font } from 'expo';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../redux/actions';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navigValue: "BattleCraft",
            appReady: false,
            dropdownVisible: false
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
        this.setState({dropdownVisible:!this.state.dropdownVisible})
    }

    hideDropdown(){
        this.setState({dropdownVisible:false});
    }

    createContent(){
        let content;
        if(this.state.appReady){
            content=
                <View style={{flex:1}}>
                    <TouchableWithoutFeedback disabled={!this.state.dropdownVisible}
                                              style={{flex:1}}
                                              onPressIn={this.hideDropdown.bind(this)}>
                        <View style={{flex:1}}>
                            <Navbar navigate={this.navigate.bind(this)} menuText={this.state.navigValue} toggleMenu={this.toggleMenu.bind(this)}/>
                            <FadeView style={{flex:1}}>
                                <Navigator navigate={this.navigate.bind(this)} navigValue={this.state.navigValue}/>
                                <AuthManager/>
                                <SoundManager/>
                                <ReportPanel/>
                                <ConfirmDialog/>
                                <MessageDialog/>
                                <LoadingSpinner/>
                                <DimensionChangeListener/>
                                <EntityPanel navigate={this.navigate.bind(this)}/>
                                <AdditionalEntityPanel/>
                            </FadeView>
                        </View>
                    </TouchableWithoutFeedback>
                    {this.state.dropdownVisible && <Dropdown
                        hideDropdown={this.hideDropdown.bind(this)}
                        dropdownVisible={this.state.dropdownVisible}
                        navigate={this.navigate.bind(this)}
                        listElements={["Tournaments", "Games", "Ranking", "Users", "My account"]}/>}
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
    return {};
}

export default connect( mapStateToProps, mapDispatchToProps )( App );
