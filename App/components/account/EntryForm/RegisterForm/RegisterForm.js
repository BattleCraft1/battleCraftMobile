/**
 * Created by FBegiello on 23.11.2017.
 */


import React, { Component } from 'react';
import {
    Text,
    View,
    Button
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';

import {serverName} from "../../../../main/consts/serverName";
import axios from 'axios';

import Panel from "battleCraftMobile/App/components/entityPanel/user/Panel"

class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <View style={{flex:1, justifyContent:'center'}}>
                <Text>Register</Text>
            </View>
        );
    }
}

export default connect()( RegisterForm );
