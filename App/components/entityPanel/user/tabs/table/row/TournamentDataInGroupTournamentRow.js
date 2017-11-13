import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight
} from 'react-native';

import TableStyles from '../../../../../../Styles/TableStyles'
import MainStyles from '../../../../../../Styles/MainStyles'

import Icon from 'react-native-vector-icons/FontAwesome';

import ListColours from '../../../../../../main/consts/ListColours'

export default class TournamentDataInGroupTournamentRow extends Component{

    backgroundColourCheck(accepted){
        return accepted? ListColours.users.ACCEPTED:ListColours.users.NEW;
    }

    render(){

        let backgroundColour = this.backgroundColourCheck(this.props.accepted);

        return (<View key={this.props.name} style={[TableStyles.row, {flexDirection: 'row'}]}>
            <View style={{backgroundColor: backgroundColour, flex: 1, justifyContent:'center'}}>
                <Text numberOfLines={1} style={[MainStyles.verySmallWhiteStyle, {padding:3}]}> {this.props.name}</Text>
            </View>
            {!this.props.disabled &&
            <View style={{flexDirection:'row'}}>
                <TouchableHighlight onPress={() => {this.props.accept(this.props.name);}}>
                    <View style={TableStyles.icon} >
                        <Icon name='check-square-o' size={25} color="#ffffff"/>
                        <Text style={TableStyles.iconText}>{this.props.accepted ? "reject":"accept"}</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => {this.props.delete(this.props.name);}}>
                    <View style={TableStyles.icon} >
                        <Icon name='close' size={25} color="#ffffff"/>
                        <Text style={TableStyles.iconText}>delete</Text>
                    </View>
                </TouchableHighlight>
            </View>}
        </View>)
    }
}