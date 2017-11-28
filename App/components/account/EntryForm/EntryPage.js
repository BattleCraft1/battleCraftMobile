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
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../redux/actions';

import {serverName} from "../../../main/consts/serverName";
import axios from 'axios';

import LoginForm from "./LoginForm/LoginForm"
import RegisterForm from "./RegisterForm/RegisterForm"

import MainStyles from '../../../Styles/UniversalStyles/MainStyles'
import EntryFormStyles from '../../../Styles/AccountStyles/EntryFormStyles'
import BaseColours from 'battleCraftMobile/App/main/consts/BaseColours'

class EntryPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formType: 'Log in'
        }
    }

    makeForm(){
        if(this.state.formType==='Log in'){
            return (<LoginForm/>);
        }
        else{
            return (<RegisterForm/>);
        }
    }

    render() {
        let form = this.makeForm();
        let activeButton = this.state.formType==='Log in'?{B2:BaseColours.background.darkBrown,B1:BaseColours.border.bottom}:{B1:BaseColours.background.darkBrown,B2:BaseColours.border.bottom};

        return (
            <View style={{flex:1}}>
                <View style={[EntryFormStyles.header, MainStyles.borderStyle]}>
                    <Text style={MainStyles.bigWhiteStyle}>{this.state.formType}</Text>
                </View>
                <View style={EntryFormStyles.buttonsRow}>
                    <View style={{flex:1, marginRight:3}}>
                        <TouchableHighlight style={[EntryFormStyles.button,{backgroundColor:activeButton.B1}]} onPress={()=>this.setState({formType: 'Log in'})}>
                            <Text style={MainStyles.bigWhiteStyle}>Log in</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{flex:1}}>
                        <TouchableHighlight style={[EntryFormStyles.button,{backgroundColor:activeButton.B2}]} onPress={()=>this.setState({formType: 'Register'})}>
                            <Text style={MainStyles.bigWhiteStyle}>Register</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={[{flex:1, alignSelf: 'center', width:this.props.dimension.width*0.8}]}>
                {form}
                </View>
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
