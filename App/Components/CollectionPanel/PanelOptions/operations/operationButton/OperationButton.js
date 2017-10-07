import React, { Component } from 'react';
import OptionsStyles from '../../../../../Styles/OptionsStyles'
import {View,TouchableHighlight,Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class OperationButton extends React.Component {
    render() {
        return(
            <TouchableHighlight onPress={() => {
                this.operation();
            }}>
                <View style={OptionsStyles.icon} >
                    <Icon name={this.props.icon} size={40} color="#4b371b"/>
                    <Text style={OptionsStyles.iconText}>Accept</Text>
                </View>
            </TouchableHighlight>
        );
    }
}
