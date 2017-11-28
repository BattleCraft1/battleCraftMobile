import React, { Component } from 'react';
import {
    Text,
    View,
    Button
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/actions';

import {serverName} from "../../main/consts/serverName";
import axios from 'axios';

import EntryPage from "./EntryForm/EntryPage"
import AccountDetails from "./AccountDetails/AccountDetails"

import MainStyles from '../../Styles/UniversalStyles/MainStyles'
import InputStyles from 'battleCraftMobile/App/Styles/UniversalStyles/InputStyles'


class AccountPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
        }
    }

    makeContent(){
        if(this.state.isLogged===false){
            return (<EntryPage/>);
        }
        else{
            return (<AccountDetails/>);
        }
    }

    render() {
        let content = this.makeContent();
        return (
                <View style={[MainStyles.contentStyle]}>
                    {content}
                </View>
        );
    }
}

export default connect()( AccountPanel );
