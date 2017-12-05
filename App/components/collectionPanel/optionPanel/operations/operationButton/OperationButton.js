import React, { Component } from 'react';
import OptionsStyles from 'battleCraftMobile/App/Styles/CollectionPanelStyles/OptionsStyles'

import {View,TouchableHighlight,Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../../redux/actions';

class OperationButton extends React.Component {
    render() {
        return(
            <TouchableHighlight onPress={() =>{this.props.playSound('toggle'); this.props.operation();}}>
                <View style={OptionsStyles.icon} >
                    <Icon name={this.props.icon} size={40} color="#ffffff"/>
                    <Text style={OptionsStyles.iconText}>{this.props.name}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( OperationButton );