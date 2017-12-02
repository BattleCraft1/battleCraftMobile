import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import { connect } from 'react-redux';

import EntryPage from "./NoAuthPanel/EntryPage"
import AccountPanel from "./AccountPanel/AccountPanel"

import MainStyles from '../../Styles/UniversalStyles/MainStyles'
import {bindActionCreators} from "redux";
import {ActionCreators} from "../../redux/actions";


class AuthPanel extends Component {

    constructor(props) {
        super(props);
    }

    makeContent(){
        if(this.props.security.token === "")
            return <EntryPage/>;
        else
            return <AccountPanel navigate={this.props.navigate}/>;
    }

    render() {
        return (
                <View style={[MainStyles.contentStyle]}>
                    {this.makeContent()}
                </View>
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        security: state.security
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( AuthPanel );

