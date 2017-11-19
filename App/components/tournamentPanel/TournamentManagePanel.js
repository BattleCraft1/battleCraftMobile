import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';


import Battle from './Battle1x1/BattleRow'
import BattleInspector from './Battle1x1/BattleInspector'
import Battle2x2 from './Battle2x2/BattleRow'
import BattleInspector2x2 from './Battle2x2/BattleInspector'
import Scoreboard from './Battle1x1/Scoreboard'
import Scoreboard2x2 from './Battle2x2/Scoreboard'

import MainStyles from '../../Styles/UniversalStyles/MainStyles'
import TournamentStyles from '../../Styles/BattlePanelStyles/TournamentStyles'

import { ActionCreators } from '../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class TournamentManagePanel extends Component {


    constructor(props) {
        super(props);
        this.state = {
            inspectVisible: false,
            inspectorBattleId: 'someID',

            scoreboardVisible: false,

            battleType: 1,

            tournamentName: "Temptemptemptemp",
            turnMax: 4,
            currentTab: 1,
        };

        this.openInspector = this.openInspector.bind(this);
    }

    battlesContent = {
        battle1:{
            player1:{
                nick:'Temp1',
                name:'Temp1',
                surname:'Temptemp1',
                score: 0,
                total: 34,
            },
            player2:{
                nick:'Temp2',
                name:'Temp2',
                surname:'Temptemp2',
                score: 20,
                total: 42,
            },
            table:1
        },
        battle2:{
            player1:{
                nick:'Temp1',
                name:'Temp1',
                surname:'Temptemp1',
                score: 16,
                total: 56,
            },
            player2:{
                nick:'Temp2',
                name:'Temp2',
                surname:'Temptemp2',
                score: 4,
                total: 42,
            },
            table:2
        },
        battle3:{
            player1:{
                nick:'Temp1',
                name:'Temp1',
                surname:'Temptemp1',
                score: 10,
                total: 42,
            },
            player2:{
                nick:'Temp2',
                name:'Temp2',
                surname:'Temptemp2',
                score: 10,
                total: 42,
            },
            table:3
        },
        battle4:{
            player1:{
                nick:'Temp1',
                name:'Temp1',
                surname:'Temptemp1',
                score: 13,
                total: 34,
            },
            player2:{
                nick:'Temp2',
                name:'Temp2',
                surname:'Temptemp2',
                score: 7,
                total: 76,
            },
            table:4
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

    makeBattle(){
        if(this.state.battleType===1) {
            return (<Battle currentTab={this.state.currentTab} content={this.battlesContent} openInspector={this.openInspector}/>)
        }
        else {
            return (<Battle2x2 currentTab={this.state.currentTab} content={this.battlesContent} inspector={this.openInspector}/>)
        }
    }
    makeBattleInspector(){
        if(this.state.battleType===1) {
            return (<BattleInspector
                    onClosePanel={(isVisible) => this.setState({inspectVisible: isVisible})}
                    isVisible={this.state.inspectVisible}
                    battleData={this.battlesContent.battle1}/>)
        }
        else {
            return (<BattleInspector2x2
                    onClosePanel={(isVisible) => this.setState({inspectVisible: isVisible})}
                    isVisible={this.state.inspectVisible}
                    battleData={this.battlesContent.battle1}/>)
        }
    }
    makeScoreboard(){
        if(this.state.battleType===1) {
            return (<Scoreboard
                onClosePanel={(isVisible) => this.setState({scoreboardVisible: isVisible})}
                isVisible={this.state.scoreboardVisible}/>)
        }
        else {
            return (<Scoreboard2x2
                onClosePanel={(isVisible) => this.setState({scoreboardVisible: isVisible})}
                isVisible={this.state.scoreboardVisible}/>)
        }
    }

    render() {

        const config = {
            velocityThreshold: 0.1,
            directionalOffsetThreshold: 30
        };

        let flexStyle;
        let buttonStyle;

        if(this.props.dimension.orientation==='portrait'){
            flexStyle={flexDirection:'column'};
            buttonStyle={}
        }else{
            flexStyle={flexDirection:'row'};
            buttonStyle={flex:1, marginRight:3};
        }

        return (
            <View style={MainStyles.contentStyle}>
                <View style={{marginBottom:3, flexDirection:'row'}}>
                    <View style={{flex:1, marginRight: 3}}>
                        <Button title="Next" color='#4b371b'
                                onPress={()=>{}}/>
                    </View>
                    <View style={{flex:1}}>
                        <Button title="Previous" color='#4b371b'
                                onPress={()=>{}}/>
                    </View>
                </View>
                <View style={{flex:1}}>
                    <View style={[TournamentStyles.pageWindow, MainStyles.borderStyle]}>
                        <Text style={MainStyles.smallWhiteStyle}>{this.state.currentTab}/{this.state.turnMax}</Text>
                    </View>
                    <GestureRecognizer
                        onSwipeLeft={(event) => this.onSwipeLeft(event)}
                        onSwipeRight={(event) => this.onSwipeRight(event)}
                        config={config}
                        style={{flex: 1}}>
                        <View style={{flexDirection:'column',alignSelf: "stretch"}}>
                            {this.makeBattle()}
                        </View>
                    </GestureRecognizer>
                </View>
                <View><Button title={"Finish"} color='#4b371b' onPress={()=>{}}/></View>
                {this.makeBattleInspector()}
                {this.makeScoreboard()}
            </View>
        );
    }
}

function mapStateToProps( state ) {
    return {
        dimension: state.dimension
    };
}

export default connect( mapStateToProps)( TournamentManagePanel );