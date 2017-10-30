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

import Battle from './Battle/Battle'

import MainStyles from '../../Styles/MainStyles'
import TournamentStyles from '../../Styles/TournamentStyles'

export default class TournamentPanel extends Component {


    constructor(props) {
        super(props);
        this.state = {
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
        },
        battle2:{
            player1:'Temp1',
            player2:'Temp2',
            score1: 0,
            score2: 20,
        },
        battle3:{
            player1:'Temp1',
            player2:'Temp2',
            score1: 0,
            score2: 20,
        },
    }

    onSwipeLeft(gestureState) {
        if(this.state.currentTab>0) this.setState({currentTab: this.state.currentTab-1});
    }

    onSwipeRight(gestureState) {
        if(this.state.currentTab<this.state.turnMax) this.setState({currentTab: this.state.currentTab+1});
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
                <GestureRecognizer
                    onSwipeLeft={(event) => this.onSwipeLeft(event)}
                    onSwipeRight={(event) => this.onSwipeRight(event)}
                    config={config}
                    style={{flex: 1}}>
                    <View style={[TournamentStyles.turnHeader]}>
                        <Text style={[MainStyles.textStyle, {fontSize:22}]}>Turn {this.state.currentTab}</Text>
                    </View>
                    <View>
                        <Battle content={this.battlesContent}/>
                    </View>
                    <View style={[TournamentStyles.pageWindow, MainStyles.borderStyle]}>
                        <Text style={MainStyles.smallWhiteStyle}>{this.state.currentTab}/{this.state.turnMax}</Text>
                    </View>
                </GestureRecognizer>
                <Button title={"Return"} color='#4b371b' onPress={()=>{}}/>
            </View>
        );
    }
}