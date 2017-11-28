/**
 * Created by FBegiello on 23.11.2017.
 */


import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Button,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';

import {serverName} from "../../../../main/consts/serverName";
import axios from 'axios';

import MainStyles from '../../../../Styles/UniversalStyles/MainStyles'
import InputStyles from '../../../../Styles/UniversalStyles/InputStyles'
import BaseColours from 'battleCraftMobile/App/main/consts/BaseColours'


class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <ScrollView style={{flex:1}}>
                <View style={InputStyles.inputCard}>
                    <View style={InputStyles.inputText}>
                        <Text style={MainStyles.smallWhiteStyle}>Login</Text>
                    </View>
                    <View>
                        <Text style={MainStyles.smallWhiteStyle}>INPUT HERE</Text>
                    </View>
                </View>

                <View style={InputStyles.inputCard}>
                    <View style={InputStyles.inputText}>
                        <Text style={MainStyles.smallWhiteStyle}>Password</Text>
                    </View>
                    <View>
                        <Text style={MainStyles.smallWhiteStyle}>PASSWORD HERE</Text>
                    </View>
                </View>

                <View>
                    <Button title="Submit" color={BaseColours.background.darkBrown} style={{}} onPress={()=>{}}/>
                </View>

            </ScrollView>
        );
    }
}

export default connect()( LoginForm );
