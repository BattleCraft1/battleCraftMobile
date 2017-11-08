/*Created by FBegiello on 30.10.2017.*/

import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    Image,

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import MainStyles from 'battleCraftMobile/App/Styles/MainStyles'
import BattleStyle from 'battleCraftMobile/App/Styles/BattleStyle'

import BaseColours from "battleCraftMobile/App/Main/consts/BaseColours"
import ListColours from 'battleCraftMobile/App/Main/consts/ListColours'

export default class Battle extends Component {


    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(['Placeholder'])
        };
    }


    renderRow(rowData) {
        let scoreBackground;
        if(rowData.score1===rowData.score2){
            scoreBackground={P1: ListColours.battle.DRAW, P2: ListColours.battle.DRAW};
        }
        else if(rowData.score1>rowData.score2){
            scoreBackground={P1: ListColours.battle.WIN, P2: ListColours.battle.LOSE};
        }
        else scoreBackground={P1: ListColours.battle.LOSE, P2: ListColours.battle.WIN};

        return (
            <View style={BattleStyle.battleWindow}>
                <View style={[BattleStyle.playerHeader, MainStyles.borderStyle]}>
                    <Icon style={{padding:3}} name={"bookmark"} size={24} color={BaseColours.misc.greyBlue}/>
                    <Text style={[BattleStyle.player1Text, MainStyles.bigWhiteStyle]}>{rowData.player1}</Text>
                </View>
                <View style={BattleStyle.scoreRow}>
                    <View style={[BattleStyle.avatarContener, {backgroundColor:BaseColours.misc.greyBlue}]}>
                        <Image style={BattleStyle.avatarSize} source={require("battleCraftMobile/img/userLogoDef.png")}/>
                    </View>
                    <View style={BattleStyle.scoreContainer}>
                        <View style={[BattleStyle.scoreboard, MainStyles.borderStyle, {backgroundColor: scoreBackground.P1}]}>
                            <Text style={[MainStyles.textStyle,{fontSize: 32}]}>{rowData.score1}</Text>
                        </View>
                        <Image style={{width:50, height:50}} source={require("battleCraftMobile/img/vsIcon.png")}/>
                        <View style={[BattleStyle.scoreboard, MainStyles.borderStyle, {backgroundColor: scoreBackground.P2}]}>
                            <Text style={[MainStyles.textStyle,{fontSize: 32}]}>{rowData.score2}</Text>
                        </View>
                    </View>
                    <View style={[BattleStyle.avatarContener, {backgroundColor:BaseColours.misc.deepRed}]}>
                        <Image style={BattleStyle.avatarSize} source={require("battleCraftMobile/img/userLogoDef.png")}/>
                    </View>
                </View>
                <View style={[BattleStyle.playerHeader, MainStyles.borderStyle]}>
                    <Text style={[BattleStyle.player2Text, MainStyles.bigWhiteStyle]}>{rowData.player2}</Text>
                    <Icon style={{padding:3}} name={"bookmark"} size={24} color={BaseColours.misc.deepRed}/>
                </View>
            </View>);
    }


    render() {

        return (
        <ListView
                  dataSource={this.state.dataSource.cloneWithRows(this.props.content)}
                  renderHeader={(headerData) => <View style={[BattleStyle.turnHeader]}><Text style={[MainStyles.textStyle, {fontSize:22}]}>Turn {this.props.currentTab}</Text></View>}
                  renderRow={this.renderRow}/>

        );
    }
}