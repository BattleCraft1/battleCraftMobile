/**
 * Created by FBegiello on 29.10.2017.
 */


import React, { Component } from 'react';
import {
    View,
    Text,
    Button,

} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import Battle from './battle/BattleRow'
import BattleInspector from './battle/BattleInspector'

import MainStyles from '../../Styles/MainStyles'
import TournamentStyles from '../../Styles/TournamentStyles'

export default class TournamentPanel extends Component {


    constructor(props) {
        super(props);
        this.state = {
            inspectVisible: false,
            inspectorBattleId: 'someID',

            tournamentName: "Temptemptemptemp",
            turnMax: 4,
            currentTab: 1,
        };
    }

    battlesContent = {
        battle1:{
            player1:'Temp1',
            player2:'Temp2',
            score1: 0,
            score2: 20,
            total1: 34,
            total2: 42
        },
        battle2:{
            player1:'Temp1',
            player2:'Temp2',
            score1: 16,
            score2: 4,
            total1: 56,
            total2: 42
        },
        battle3:{
            player1:'Temp1',
            player2:'Temp2',
            score1: 10,
            score2: 10,
            total1: 42,
            total2: 42
        },
        battle4:{
            player1:'Temp1',
            player2:'Temp2',
            score1: 13,
            score2: 7,
            total1: 34,
            total2: 76
        },
    }

    onSwipeLeft(gestureState) {
        if(this.state.currentTab>1) this.setState({currentTab: this.state.currentTab-1});
    }

    onSwipeRight(gestureState) {
        if(this.state.currentTab<this.state.turnMax) this.setState({currentTab: this.state.currentTab+1});
    }

    openInspector(battleId){
        this.setState({
            inspectVisible: true,
            inspectorBattleId: battleId})
    }

    render() {

        const config = {
            velocityThreshold: 0.1,
            directionalOffsetThreshold: 30
        };

        return (
            <View style={MainStyles.contentStyle}>
                <View style={[TournamentStyles.tournamentHeader,MainStyles.borderStyle]}>
                    <Text style={MainStyles.bigWhiteStyle}>{this.state.tournamentName}</Text>
                </View>
                <View style={{marginBottom: 3}}><Button title={"My battle"} color='#4b371b' onPress={()=>{this.openInspector("MyBattleID")}}/></View>
                <GestureRecognizer
                    onSwipeLeft={(event) => this.onSwipeLeft(event)}
                    onSwipeRight={(event) => this.onSwipeRight(event)}
                    config={config}
                    style={{flex: 1, alignItems:'center'}}>
                    <View style={{flex: 1}}>
                        <View style={[TournamentStyles.pageWindow, MainStyles.borderStyle]}>
                            <Text style={MainStyles.smallWhiteStyle}>{this.state.currentTab}/{this.state.turnMax}</Text>
                        </View>
                        <Battle currentTab={this.state.currentTab} content={this.battlesContent}/>
                    </View>
                </GestureRecognizer>
                <View><Button title={"Return"} color='#4b371b' onPress={()=>{}}/></View>
                <BattleInspector
                    onClosePanel={(isVisible) => this.setState({inspectVisible:isVisible})}
                    isVisible={this.state.inspectVisible}
                    battleData={this.battlesContent.battle1}/>
            </View>
        );
    }
}