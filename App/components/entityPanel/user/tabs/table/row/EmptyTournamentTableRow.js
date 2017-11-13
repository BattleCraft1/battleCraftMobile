import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight
} from 'react-native';

import TableStyles from '../../../../../../Styles/TableStyles'
import MainStyles from '../../../../../../Styles/MainStyles'

import ListColours from '../../../../../../main/consts/ListColours'

export default class DuelTournamentTableRow extends Component{

    backgroundColourCheck(accepted){
        return accepted? ListColours.users.ACCEPTED:ListColours.users.NEW;
    }

    render(){

        let backgroundColour = this.backgroundColourCheck(this.props.accepted);

        return (<View key={this.props.name} style={[TableStyles.row, {flexDirection: 'row'}]}>
            <View style={{backgroundColor: backgroundColour, flex: 1, justifyContent:'center'}}>
                <Text numberOfLines={1} style={[MainStyles.verySmallWhiteStyle, {padding:3}]}>Empty</Text>
            </View>
        </View>)
    }
}