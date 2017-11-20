/**
 * Created by FBegiello on 01.11.2017.
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableHighlight
} from 'react-native';


import Icon from 'react-native-vector-icons/FontAwesome';

import MainStyles from 'battleCraftMobile/App/Styles/UniversalStyles/MainStyles';
import BattleInspectorStyle from 'battleCraftMobile/App/Styles/BattlePanelStyles/BattleInspectorStyle';
import {serverName} from "../../../../../main/consts/serverName";

export default class PlayerCard extends Component {

    constructor(props) {
        super(props);
    }

    generateURL(){
        return this.props.playerName !== ""? {uri:`${serverName}get/user/avatar?username=${this.props.playerName}`}:
            require("battleCraftMobile/img/questionAvatar.png")
    }

    render() {
        return (
            <View style={BattleInspectorStyle.playerCard}>
                <View style={[BattleInspectorStyle.playerHeader, MainStyles.borderStyle]}>
                    <Icon style={{padding:3}} name={"bookmark"} size={24} color={this.props.colour}/>
                    <Text numberOfLines={1} style={MainStyles.bigWhiteStyle}>{this.props.playerName}</Text>
                </View>
                <View style={BattleInspectorStyle.infoCard}>
                    <TouchableHighlight onPress={this.props.showUsersList.bind(this)}>
                        <Image style={BattleInspectorStyle.avatar} source={this.generateURL()}/>
                    </TouchableHighlight>
                    <View style={BattleInspectorStyle.dataColumn}>
                        <View style={BattleInspectorStyle.dataRow}><Text style={MainStyles.smallWhiteStyle}>Points:</Text></View>
                        <View style={[BattleInspectorStyle.dataRow, {backgroundColor: this.props.scoreBackground}]}>
                            <TextInput
                                style={[MainStyles.smallWhiteStyle]}
                                onChangeText={(value)=>{this.props.changeData(parseInt(value))}}
                                value = {this.props.playerPoints.toString()}
                                keyboardType = 'numeric'
                                maxLength={2}
                            />
                        </View>
                        <View style={BattleInspectorStyle.dataRow}><Text style={MainStyles.smallWhiteStyle}>Total points:</Text></View>
                        <View style={[BattleInspectorStyle.dataRow, {backgroundColor: this.props.totalBackground}]}>
                            <Text numberOfLines={1} style={MainStyles.smallWhiteStyle}>{this.props.totalPoints===undefined?0:this.props.totalPoints}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}