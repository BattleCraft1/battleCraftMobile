/**
 * Created by FBegiello on 23.11.2017.
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';

import LoginForm from "./LoginForm/LoginForm"
import RegisterPopup from "./RegisterPopup/RegisterPopup"
import ResetPasswordPopup from "./ResetPasswordForm/ResetPasswordPopup"

import MainStyles from '../../../Styles/UniversalStyles/MainStyles'
import EntryFormStyles from '../../../Styles/AccountStyles/EntryFormStyles'
import BaseColours from 'battleCraftMobile/App/main/consts/BaseColours'

class EntryPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showRegisterPopup : false,
            showResetPasswordPopup : false
        }
    }


    render() {
        return (
                <View style={{flex:1}}>
                    <View style={[EntryFormStyles.header, MainStyles.borderStyle]}>
                        <Text style={MainStyles.bigWhiteStyle}>Log in</Text>
                    </View>

                    <View style={[{flex:1, alignSelf: 'center', width:this.props.dimension.width*0.8}]}>
                        <LoginForm/>
                    </View>

                    <View style={EntryFormStyles.buttonsRow}>
                        <View style={{flex:1}}>
                            <TouchableHighlight style={[EntryFormStyles.button,{backgroundColor:BaseColours.background.darkBrown}]}
                                                onPress={() => this.setState({showRegisterPopup: true})}>
                                <Text style={MainStyles.bigWhiteStyle}>Register</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={EntryFormStyles.buttonsRow}>
                        <View style={{flex:1}}>
                            <TouchableHighlight style={[EntryFormStyles.button,{backgroundColor:BaseColours.background.darkBrown}]}
                                                onPress={() => this.setState({showResetPasswordPopup: true})}>
                                <Text style={MainStyles.bigWhiteStyle}>Forgot credentials?</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    {this.state.showRegisterPopup && <RegisterPopup userKind={"normal"} disable={() => this.setState({showRegisterPopup: false})}/>}
                    {this.state.showResetPasswordPopup && <ResetPasswordPopup disable={() => this.setState({showResetPasswordPopup: false})}/>}
                </View>
        );
    }
}


function mapStateToProps( state ) {
    return {
        dimension:state.dimension
    };
}

export default connect( mapStateToProps )( EntryPage );
