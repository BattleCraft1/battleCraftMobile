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
import BaseColours from "../../../../../main/consts/BaseColours";
import {serverName} from "../../../../../main/consts/serverName";

export default class PlayerCard extends Component {

    constructor(props) {
        super(props);
    }


    generateURL(username){
        return username !== ""? {uri:`${serverName}get/user/avatar?username=${username}`}:
            require("battleCraftMobile/img/questionAvatar.png")
    }


    render() {
        return (
            <View style={BattleInspectorStyle.playerCard}>
                <View style={[BattleInspectorStyle.playerHeader, MainStyles.borderStyle, {justifyContent: 'flex-start',}]}>
                    <Icon style={{padding:3}} name={"bookmark"} size={24} color={this.props.colour}/>
                    <Text  numberOfLines={1} style={MainStyles.smallWhiteStyle}>{this.props.playersNames[0]}</Text>
                </View>
                <View style={BattleInspectorStyle.infoCard}>
                    <TouchableHighlight onPress={this.props.showUsersList.bind(this)}>
                        <Image style={BattleInspectorStyle.avatar2x2} source={this.generateURL(this.props.playersNames[0])}/>
                    </TouchableHighlight>
                    <View style={[BattleInspectorStyle.dataColumn, {flex:1}]}>
                        <View style={[BattleInspectorStyle.dataRow, {backgroundColor: BaseColours.background.lightBrown}]}>
                            <Text numberOfLines={1} style={MainStyles.smallWhiteStyle}>Points:</Text>
                        </View>
                        <View style={[BattleInspectorStyle.dataRow, {backgroundColor: this.props.scoreBackground}]}>
                            <TextInput
                                style={[MainStyles.smallWhiteStyle]}
                                onChangeText={(value)=>{this.props.changeData(parseInt(value))}}
                                value = {this.props.playersPoints.toString()}
                                keyboardType = 'numeric'
                                maxLength={2}
                            />
                        </View>
                        <View style={[BattleInspectorStyle.dataRow, {backgroundColor: BaseColours.background.lightBrown}]}>
                            <Text numberOfLines={1} style={MainStyles.smallWhiteStyle}>Total points:</Text>
                        </View>
                        <View style={[BattleInspectorStyle.dataRow, {backgroundColor: this.props.scoreBackground}]}>
                            <Text numberOfLines={1} style={MainStyles.smallWhiteStyle}>{this.props.totalPoints===undefined?0:this.props.totalPoints}</Text>
                        </View>
                    </View>
                    <TouchableHighlight onPress={this.props.showUsersList.bind(this)}>
                        <Image style={BattleInspectorStyle.avatar2x2} source={this.generateURL(this.props.playersNames[1])}/>
                    </TouchableHighlight>
                </View>
                <View style={[BattleInspectorStyle.playerHeader, MainStyles.borderStyle, {justifyContent: 'flex-end',}]}>
                    <Icon style={{padding:3}} name={"bookmark"} size={24} color={this.props.colour}/>
                    <Text numberOfLines={1} style={MainStyles.smallWhiteStyle}>{this.props.playersNames[1]}</Text>
                </View>
            </View>
        );
    }
}