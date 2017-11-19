/*Created by FBegiello on 30.10.2017.*/

import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    Image,
    TouchableHighlight

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import MainStyles from 'battleCraftMobile/App/Styles/UniversalStyles/MainStyles'
import BattleStyle from 'battleCraftMobile/App/Styles/BattlePanelStyles/BattleStyle'

import BaseColours from "battleCraftMobile/App/main/consts/BaseColours"
import ListColours from "battleCraftMobile/App/main/consts/ListColours"

export default class Battle extends Component {


    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(['Placeholder']),
        };
    }


    renderRow(rowData) {

        let scoreBackground;
        if(rowData.player1.score===rowData.player2.score){
            scoreBackground={P1: ListColours.battle.DRAW, P2: ListColours.battle.DRAW};
        }
        else if(rowData.player1.score>rowData.player2.score){
            scoreBackground={P1: ListColours.battle.WIN, P2: ListColours.battle.LOSE};
        }
        else scoreBackground={P1: ListColours.battle.LOSE, P2: ListColours.battle.WIN};

        return (
            <TouchableHighlight key={rowData.table} style={BattleStyle.battleWindow} onPress={()=>{this.props.openInspector('someID')}}>
                <View>
                    <View style={[BattleStyle.playerHeader, MainStyles.borderStyle]}>
                        <Text style={[BattleStyle.player1Text, MainStyles.bigWhiteStyle]}>Table X</Text>
                    </View>
                    <View style={BattleStyle.scoreRow}>
                        <View style={[BattleStyle.userContainer, {backgroundColor:BaseColours.misc.greyBlue}]}>
                            <Image style={BattleStyle.avatarSize} source={require("battleCraftMobile/img/userLogoDef.png")}/>
                            <View style={[BattleStyle.scoreContainer]}>
                                <View style={[BattleStyle.playerHeaderScoreboard, MainStyles.borderStyle]}>
                                    <Text style={[BattleStyle.player1Text, MainStyles.bigWhiteStyle]}>Points</Text>
                                </View>
                                <View style={[BattleStyle.scoreboard, MainStyles.borderStyle, {backgroundColor: scoreBackground.P2}]}>
                                    <Text style={[MainStyles.textStyle,{fontSize: 20}]}>{rowData.player2.score}</Text>
                                </View>
                                <View style={[BattleStyle.playerHeaderScoreboard, MainStyles.borderStyle]}>
                                    <Text style={[BattleStyle.player1Text, MainStyles.bigWhiteStyle]}>Username</Text>
                                </View>
                                <View style={[BattleStyle.scoreboard, MainStyles.borderStyle, {backgroundColor: scoreBackground.P2}]}>
                                    <Text style={[MainStyles.textStyle,{fontSize: 20}]}>{rowData.player2.score}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[BattleStyle.userContainer, {backgroundColor:BaseColours.misc.deepRed}]}>
                            <View style={[BattleStyle.scoreContainer]}>
                                <View style={[BattleStyle.playerHeaderScoreboard, MainStyles.borderStyle]}>
                                    <Text style={[BattleStyle.player1Text, MainStyles.bigWhiteStyle]}>Points</Text>
                                </View>
                                <View style={[BattleStyle.scoreboard, MainStyles.borderStyle, {backgroundColor: scoreBackground.P2}]}>
                                    <Text style={[MainStyles.textStyle,{fontSize: 20}]}>{rowData.player2.score}</Text>
                                </View>
                                <View style={[BattleStyle.playerHeaderScoreboard, MainStyles.borderStyle]}>
                                    <Text style={[BattleStyle.player1Text, MainStyles.bigWhiteStyle]}>Username</Text>
                                </View>
                                <View style={[BattleStyle.scoreboard, MainStyles.borderStyle, {backgroundColor: scoreBackground.P2}]}>
                                    <Text style={[MainStyles.textStyle,{fontSize: 20}]}>{rowData.player2.score}</Text>
                                </View>
                            </View>
                            <Image style={BattleStyle.avatarSize} source={require("battleCraftMobile/img/userLogoDef.png")}/>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>);
    }


    render() {
        return (
            <ListView
                dataSource={this.state.dataSource.cloneWithRows(this.props.content)}
                renderHeader={(headerData) => <View style={[BattleStyle.turnHeader]}><Text style={[MainStyles.textStyle, {fontSize:22}]}>Turn {this.props.currentTab}</Text></View>}
                renderRow={this.renderRow.bind(this)}/>
        );
    }
}