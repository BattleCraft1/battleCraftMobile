/**
 * Created by FBegiello on 01.11.2017.
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Button
} from 'react-native';

import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

import MainStyles from 'battleCraftMobile/App/Styles/MainStyles';
import BattleInspectorStyle from 'battleCraftMobile/App/Styles/BattleInspectorStyle';

import BaseColours from "battleCraftMobile/App/Main/consts/BaseColours"
import ListColours from "battleCraftMobile/App/Main/consts/ListColours"

export default class BattleInspector extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let scoreBackground;
        if(this.props.battleData.score1===this.props.battleData.score2){
            scoreBackground={P1: ListColours.battle.DRAW, P2: ListColours.battle.DRAW};
        }
        else if(this.props.battleData.score1>this.props.battleData.score2){
            scoreBackground={P1: ListColours.battle.WIN, P2: ListColours.battle.LOSE};
        }
        else scoreBackground={P1: ListColours.battle.LOSE, P2: ListColours.battle.WIN};

        let totalBackground;
        if(this.props.battleData.total===this.props.battleData.total2){
            totalBackground={P1: ListColours.battle.DRAW, P2: ListColours.battle.DRAW};
        }
        else if(this.props.battleData.total>this.props.battleData.total2){
            totalBackground={P1: ListColours.battle.WIN, P2: ListColours.battle.LOSE};
        }
        else totalBackground={P1: ListColours.battle.LOSE, P2: ListColours.battle.WIN};

        return (
            <Modal isVisible={this.props.isVisible} backdropOpacity={0.3}>
                <View style={BattleInspectorStyle.modal}>
                    <View style={[BattleInspectorStyle.battleHeader, MainStyles.borderStyle]}><Text style={[MainStyles.textStyle, {fontSize: 24}]}>Battle name</Text></View>
                    <View style={BattleInspectorStyle.playerCard}>
                        <View style={[BattleInspectorStyle.playerHeader, MainStyles.borderStyle]}>
                            <Icon style={{padding:3}} name={"bookmark"} size={24} color={BaseColours.misc.greyBlue}/>
                            <Text style={MainStyles.bigWhiteStyle}>{this.props.battleData.player1}</Text>
                        </View>
                        <View style={BattleInspectorStyle.infoCard}>
                            <Image style={BattleInspectorStyle.avatar} source={require("battleCraftMobile/img/userLogoDef.png")}/>
                            <View style={BattleInspectorStyle.dataColumn}>
                                <View style={BattleInspectorStyle.dataRow}><Text style={MainStyles.smallWhiteStyle}>Full name:</Text></View>
                                <View style={BattleInspectorStyle.dataRow}><Text style={MainStyles.smallWhiteStyle}>askjdhajksdhkasdhkjkj</Text></View>
                                <View style={[BattleInspectorStyle.dataRow, {backgroundColor: scoreBackground.P1}]}>
                                    <Text style={MainStyles.smallWhiteStyle}>Battle points: {this.props.battleData.score1}</Text>
                                </View>
                                <View style={[BattleInspectorStyle.dataRow, {backgroundColor: totalBackground.P1}]}>
                                    <Text style={MainStyles.smallWhiteStyle}>Total points: {this.props.battleData.total1}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={[BattleInspectorStyle.vsCard, MainStyles.borderStyle]}>
                        <Image style={{alignSelf:'center', width:60, height:60}} source={require("battleCraftMobile/img/vsIcon.png")}/>
                        <View>
                            <View style={BattleInspectorStyle.dataRow}><Text style={MainStyles.bigWhiteStyle}>Table number:</Text></View>
                            <View style={[BattleInspectorStyle.dataRow,{borderBottomWidth:0}]}><Text style={MainStyles.bigWhiteStyle}>{this.props.battleData.table}</Text></View>
                        </View>
                    </View>

                    <View style={BattleInspectorStyle.playerCard}>
                        <View style={[BattleInspectorStyle.playerHeader, MainStyles.borderStyle]}>
                            <Icon style={{padding:3}} name={"bookmark"} size={24} color={BaseColours.misc.deepRed}/>
                            <Text  style={MainStyles.bigWhiteStyle}>{this.props.battleData.player2}</Text>
                        </View>
                        <View style={BattleInspectorStyle.infoCard}>
                            <Image style={BattleInspectorStyle.avatar} source={require("battleCraftMobile/img/userLogoDef.png")}/>
                            <View style={BattleInspectorStyle.dataColumn}>
                                <View style={BattleInspectorStyle.dataRow}><Text style={MainStyles.smallWhiteStyle}>Full name:</Text></View>
                                <View style={BattleInspectorStyle.dataRow}><Text style={MainStyles.smallWhiteStyle}>askjdhajksdhkasdhkjkj</Text></View>
                                <View style={[BattleInspectorStyle.dataRow, {backgroundColor: scoreBackground.P2}]}>
                                    <Text style={MainStyles.smallWhiteStyle}>Battle points: {this.props.battleData.score2}</Text>
                                </View>
                                <View style={[BattleInspectorStyle.dataRow, {backgroundColor: totalBackground.P2}]}>
                                    <Text style={MainStyles.smallWhiteStyle}>Total points: {this.props.battleData.total2}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View><Button title={"Close"} color='#4b371b' onPress={() => this.props.onClosePanel()}/></View>
                </View>
            </Modal>
        );
    }
}