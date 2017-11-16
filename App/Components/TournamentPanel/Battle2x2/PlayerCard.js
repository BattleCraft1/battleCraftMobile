/**
 * Created by FBegiello on 01.11.2017.
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import MainStyles from 'battleCraftMobile/App/Styles/UniversalStyles/MainStyles';
import BattleInspectorStyle from 'battleCraftMobile/App/Styles/BattlePanelStyles/BattleInspectorStyle';

export default class PlayerCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={BattleInspectorStyle.playerCard}>
                <View style={[BattleInspectorStyle.playerHeader, MainStyles.borderStyle, {justifyContent: 'flex-start',}]}>
                    <Icon style={{padding:3}} name={"bookmark"} size={24} color={this.props.colour}/>
                    <Text style={MainStyles.bigWhiteStyle}>{this.props.playerData.nick}</Text>
                </View>
                <View style={BattleInspectorStyle.infoCard}>
                    <Image style={BattleInspectorStyle.avatar2x2} source={require("battleCraftMobile/img/userLogoDef.png")}/>
                    <View style={[BattleInspectorStyle.dataColumn, {flex:1}]}>
                        <View style={[BattleInspectorStyle.dataRow, {backgroundColor: this.props.scoreBackground}]}>
                            <Text style={MainStyles.smallWhiteStyle}>Battle points: {this.props.playerData.score}</Text>
                        </View>
                        <View style={[BattleInspectorStyle.dataRow, {backgroundColor: this.props.totalBackground}]}>
                            <Text style={MainStyles.smallWhiteStyle}>Total points: {this.props.playerData.total}</Text>
                        </View>
                    </View>
                    <Image style={BattleInspectorStyle.avatar2x2} source={require("battleCraftMobile/img/userLogoDef.png")}/>
                </View>
                <View style={[BattleInspectorStyle.playerHeader, MainStyles.borderStyle, {justifyContent: 'flex-end',}]}>
                    <Icon style={{padding:3}} name={"bookmark"} size={24} color={this.props.colour}/>
                    <Text style={MainStyles.bigWhiteStyle}>{this.props.playerData.nick}</Text>
                </View>
            </View>
        );
    }
}