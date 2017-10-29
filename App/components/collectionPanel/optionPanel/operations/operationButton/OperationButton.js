import React, { Component } from 'react';
import OptionsStyles from '../../../../../Styles/OptionsStyles'
import {View,TouchableHighlight,Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class OperationButton extends React.Component {
    render() {
        return(
            <TouchableHighlight onPress={() => {
                this.props.operation();
            }}>
                <View style={OptionsStyles.icon} >
                    <Icon name={this.props.icon} size={40} color="#ffffff"/>
                    <Text style={OptionsStyles.iconText}>{this.props.name}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}
