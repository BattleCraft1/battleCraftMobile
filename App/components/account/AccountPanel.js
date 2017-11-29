import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import { connect } from 'react-redux';

import EntryPage from "./EntryForm/EntryPage"

import MainStyles from '../../Styles/UniversalStyles/MainStyles'


class AccountPanel extends Component {

    constructor(props) {
        super(props);
    }

    makeContent(){
            return (<EntryPage/>);
    }

    render() {
        return (
                <View style={[MainStyles.contentStyle]}>
                    {this.makeContent()}
                </View>
        );
    }
}

export default connect()( AccountPanel );
