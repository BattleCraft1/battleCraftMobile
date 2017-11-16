import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableHighlight
} from 'react-native';

import TableStyles from '../../../../../../Styles/CollectionPanelStyles/TableStyles'
import MainStyles from '../../../../../../Styles/UniversalStyles/MainStyles'

import Icon from 'react-native-vector-icons/FontAwesome';

import ListColours from '../../../../../../main/consts/ListColours'
import {serverName} from "../../../../../../main/consts/serverName";

export default class DuelTournamentTableRow extends Component{

    backgroundColourCheck(accepted){
        return accepted? ListColours.users.ACCEPTED:ListColours.users.NEW;
    }

    render(){

        let backgroundColour = this.backgroundColourCheck(this.props.accepted);

        return (<View key={this.props.name} style={[TableStyles.row, {flexDirection: 'row'}]}>
            <View style={{width: 35, justifyContent: 'center', alignItems: 'center'}}>
                <Image
                    style={{width: 35, height: 35}}
                    source={{uri:`${serverName}/get/user/avatar?username=${this.props.name}&${new Date().getTime()}`}}/>
            </View>
            <View style={{backgroundColor: backgroundColour, flex: 1, justifyContent:'center'}}>
                <Text numberOfLines={1} style={[MainStyles.verySmallWhiteStyle, {padding:3}]}>{this.props.name}</Text>
            </View>
            {!this.props.disabled &&
            <TouchableHighlight onPress={() => {this.props.deleteElement(this.props.index,this.props.name);}}>
                <View style={TableStyles.icon} >
                    <Icon name='close' size={25} color="#ffffff"/>
                    <Text style={TableStyles.iconText}>delete</Text>
                </View>
            </TouchableHighlight>}
        </View>)
    }
}