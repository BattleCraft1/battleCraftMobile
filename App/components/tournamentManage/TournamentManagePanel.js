/**
 * Created by FBegiello on 29.10.2017.
 */


import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';


import BattlePopup1x1 from './components/battlePopup/BattlePopup1x1'
import BattlePopup2x2 from './components/battlePopup/BattlePopup2x2'
import Scoreboard from './components/scoreBoard/Scoreboard1x1'
import Scoreboard2x2 from './components/scoreBoard/Scoreboard2x2'
import Turn from './components/Turn'

import MainStyles from '../../Styles/UniversalStyles/MainStyles'
import TournamentStyles from '../../Styles/BattlePanelStyles/TournamentStyles'

import { ActionCreators } from '../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import axios from 'axios';
import {serverName} from "../../main/consts/serverName";

class TournamentManagePanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tournamentName:"",
            playersOnTableCount:0,
            showBattlePopup:false,
            showScoreBoard:false,
            battlePopupUpData:{},
            turnNumber:0,
            tournamentData:{
                turns:[],
                playersNamesWithPoints:{},
                playersWithoutBattles:{},
                currentTurnNumber:0,
                tournamentStatus:"",
                playersOnTableCount:0,
                playersCount:0
            },
            canCurrentUserMenageTournament:false
        };
    }

    async componentDidMount() {
        await this.fetchTournamentProgressData(this.props.tournamentName);

    }

    async fetchTournamentProgressData(tournamentName){
        let fetchTournamentProgressOperation = async () => {
            this.props.startLoading("Fetching tournament progress...");
        await axios.get(`${serverName}progress/tournament?name=${tournamentName}`,
            {
                headers: {
                    "X-Auth-Token":this.props.security.token
                }
            })
            .then(async res => {
                this.props.stopLoading();
                console.log("tournament data:");
                console.log(res.data);
                await this.prepareTurnsData(res.data);
                this.setState({tournamentName:this.props.tournamentName});
            })
            .catch(error => {
                this.props.stopLoading();
                this.props.showNetworkErrorMessage(error,fetchTournamentProgressOperation);
                this.props.navigate('Tournaments')
            });
        };

        fetchTournamentProgressOperation();
    }

    sendBattleData(battleData) {
        let battleDataToSend = JSON.parse(JSON.stringify(battleData));
        delete battleDataToSend["finished"];
        let tournamentTypeString = this.state.playersOnTableCount === 4 ? "group" : "duel";
        console.log("battle before send: ");
        console.log(battleData);
        let sendBattleDataOperation = () => {
            this.props.startLoading("Sending battle...");
            axios.post(`${serverName}set/points/${tournamentTypeString}/tournament?name=${this.state.tournamentName}`, battleDataToSend,
                {
                    headers: {
                        "X-Auth-Token": this.props.security.token
                    }
                })
                .then(res => {
                    this.props.stopLoading();
                    console.log("tournament data:");
                    console.log(res.data);
                    this.prepareTurnsData(res.data);
                })
                .catch(error => {
                    this.props.stopLoading();
                    this.props.showNetworkErrorMessage(error, sendBattleDataOperation);
                });
        };
        sendBattleDataOperation();
    }

    async prepareTurnsData(tournamentData){
        this.setState({playersOnTableCount:tournamentData.playersOnTableCount});
        if(tournamentData.playersOnTableCount === 4){
            for (let turnNumber in tournamentData.playersWithoutBattles) {
                if (tournamentData.playersWithoutBattles.hasOwnProperty(turnNumber)) {
                    tournamentData.playersWithoutBattles[turnNumber].push(["", ""]);
                }
            }
        }
        else{
            for (let turnNumber in tournamentData.playersWithoutBattles) {
                if (tournamentData.playersWithoutBattles.hasOwnProperty(turnNumber)) {
                    tournamentData.playersWithoutBattles[turnNumber].push("");
                }
            }
        }
        this.setState({tournamentData:tournamentData});
    }

    createTurn(){
        let turn = this.state.tournamentData.turns[this.state.turnNumber];
        return <Turn
            key={this.state.turnNumber}
            turnData={turn}
            turnNumber={this.state.turnNumber}
            haveAlonePlayer={this.state.tournamentData.playersCount%2!==0}
            showBattlePopup={this.showBattlePopup.bind(this)}
            playersOnTableCount={this.state.playersOnTableCount}
            tournamentStatus={this.state.tournamentData.tournamentStatus}
            disabled={this.state.turnNumber>this.state.tournamentData.currentTourNumber || !this.state.tournamentData.canCurrentUserMenageTournament}
            currentTurnNumber={this.state.tournamentData.currentTurnNumber}
        />
    }


    createPopup(){
        if(this.state.playersOnTableCount===2){
            return <BattlePopup1x1 battleData={this.state.battlePopupUpData}
                                   playersNamesWithPoints={this.state.tournamentData.playersNamesWithPoints}
                                   playersWithoutBattles={this.state.tournamentData.playersWithoutBattles}
                                   hidePopup={()=>{this.setState({showBattlePopup:false,battlePopupUpData:{}})}}
                                   sendBattleData={this.sendBattleData.bind(this)}/>
        }
        else if(this.state.playersOnTableCount===4){
            return <BattlePopup2x2 battleData={this.state.battlePopupUpData}
                                   playersNamesWithPoints={this.state.tournamentData.playersNamesWithPoints}
                                   playersWithoutBattles={this.state.tournamentData.playersWithoutBattles}
                                   hidePopup={()=>{this.setState({showBattlePopup:false,battlePopupUpData:{}})}}
                                   sendBattleData={this.sendBattleData.bind(this)}/>
        }
        else{
            return <View/>
        }
    }

    createScoreBoard(){
        if(this.state.playersOnTableCount===2){
            return <Scoreboard playersNamesWithPoints={this.state.tournamentData.playersNamesWithPoints}
                               hidePopup={()=>{this.setState({showScoreBoard:false})}}/>
        }
        else if(this.state.playersOnTableCount===4){
            return <Scoreboard2x2 playersNamesWithPoints={this.state.tournamentData.playersNamesWithPoints}
                                  hidePopup={()=>{this.setState({showScoreBoard:false})}}/>
        }
        else{
            return <View/>
        }
    }

    nextTurn(){
        if(this.state.tournamentData.currentTurnNumber === this.state.tournamentData.turns.length-1){
            this.props.showFailureMessage("This tournament is finished");
            return;
        }

        let notHaveAlonePlayer = this.state.tournamentData.playersCount%2===0;
        for(let i=0;i<=this.state.tournamentData.currentTurnNumber;i++){
            for(let j=0; j<this.state.tournamentData.tours[i].length;j++){
                if(!((notHaveAlonePlayer && this.state.tournamentData.turns[i][j].finished === true) ||
                        (!notHaveAlonePlayer && (this.state.tournamentData.turns[i][j].tableNumber === this.state.tournamentData.turns[i].length-1 ||
                            this.state.tournamentData.turns[i][j].finished === true)))){
                    this.props.showFailureMessage("Battle on table with number: "+(j+1)+" in turn: "+(i+1)+" is not finished yet");
                    return;
                }
            }
        }

        this.props.showConfirmationDialog(
            {
                header:"Start next turn",
                message:"Are you sure?",
                onConfirmFunction: () =>{this.props.playSound('battle'); this.nextTurnRequest()}
            });
    }


    nextTurnRequest(){
        let tournamentTypeString = this.state.playersOnTableCount === 4?"group":"duel";
        let nextTurnOperation = () => {
            this.props.startLoading("Confirming turn...");
        axios.get(`${serverName}next/turn/${tournamentTypeString}/tournament?name=${this.state.tournamentName}`,
            {
                headers: {
                    "X-Auth-Token":this.props.security.token
                }
            })
            .then(res => {
                this.props.stopLoading();
                console.log("tournament data:");
                console.log(res.data);
                this.setState({playersOnTableCount:res.data.playersOnTableCount});
                this.prepareTurnsData(res.data);
                this.setState({tournamentData:res.data});
            })
            .catch(error => {
                this.props.stopLoading();
                this.props.showNetworkErrorMessage(error,nextTurnOperation);
            });
        };
        nextTurnOperation();
    }

    previousTurn(){
        if(this.state.tournamentData.currentTurnNumber === 0)
            this.props.showFailureMessage("This is first turn of tournament");
        else{

            this.props.showConfirmationDialog(
                {
                    header:"Come back to previous turn",
                    message:"Are you sure? If you come back to previous turn all data from this turn will be lost!",
                    onConfirmFunction: () =>{this.props.playSound('battle'); this.previousTurnRequest()}
                });
        }
    }

    previousTurnRequest(){
        let tournamentTypeString = this.state.playersOnTableCount === 4?"group":"duel";
        let previousTurnOperation = () => {
            this.props.startLoading("Coming back to previous turn...");
            axios.get(`${serverName}previous/turn/${tournamentTypeString}/tournament?name=${this.state.tournamentName}`,
                {
                    headers: {
                        "X-Auth-Token": this.props.security.token
                    }
                })
                .then(res => {
                    this.props.stopLoading();
                    console.log("tournament data:");
                    console.log(res.data);
                    this.setState({playersOnTableCount: res.data.playersOnTableCount});
                    this.prepareTurnsData(res.data);
                    this.setState({tournamentData: res.data});
                })
                .catch(error => {
                    this.props.stopLoading();
                    this.props.showNetworkErrorMessage(error,previousTurnOperation);
                });
        };

        previousTurnOperation()
    }


    finishTournament(){
        let haveAlonePlayer = this.state.tournamentData.playersCount%2===0;

        for(let i=0;i<this.state.tournamentData.turns.length;i++){
            for(let j=0; j<this.state.tournamentData.turns[i].length;j++){
                if(haveAlonePlayer && this.state.tournamentData.turns[i].tableNumber !== this.state.tournamentData.turns[i].length-1 &&
                    this.state.tournamentData.turns[i][j].finished === false){
                    this.props.showFailureMessage("Battle on table with number: "+(j+1)+" in turn: "+(i+1)+" is not finished yet");
                    return;
                }
            }
        }

        this.props.showConfirmationDialog(
            {
                header:"Finish tournament",
                message:"Are you sure?",
                onConfirmFunction: () =>{this.props.playSound('fanfare'); this.finishTournamentRequest()}
            });
    }

    finishTournamentRequest(){
        let tournamentTypeString = this.state.playersOnTableCount === 4?"group":"duel";

        let finishTournamentOperation = () => {
            this.props.startLoading("Finishing tournament...");
            axios.get(`${serverName}finish/${tournamentTypeString}/tournament?name=${this.state.tournamentName}`,
                {
                    headers: {
                        "X-Auth-Token": this.props.security.token
                    }
                })
                .then(res => {
                    this.props.stopLoading();
                    console.log("tournament data:");
                    console.log(res.data);
                    this.setState({playersOnTableCount: res.data.playersOnTableCount});
                    this.prepareTurnsData(res.data);
                    this.setState({tournamentData: res.data});
                })
                .catch(error => {
                    this.props.stopLoading();
                    this.props.showNetworkErrorMessage(error,finishTournamentOperation);
                });
        }

        finishTournamentOperation()
    }

    showBattlePopup(battleData)
    {
        this.setState({battlePopupUpData:battleData});
        this.setState({showBattlePopup:true});
    }

    showScoreBoard(){
        this.props.playSound('toggle');
        this.setState({showScoreBoard:true})
    }

    showNextTurn(){
        let turnNumber = this.state.turnNumber+1;
        if(turnNumber<this.state.tournamentData.turns.length){
            this.props.playSound('flip');
            this.setState({turnNumber:turnNumber});
        }
    }

    showPreviousTurn(){
        let turnNumber = this.state.turnNumber-1;
        if(turnNumber>=0){
            this.props.playSound('flip');
            this.setState({turnNumber:turnNumber});
        }
    }

    render() {

        const config = {
            velocityThreshold: 0.1,
            directionalOffsetThreshold: 30
        };

        let buttonsDisabled = this.state.tournamentData.tournamentStatus === "FINISHED" ||
                              this.props.security.role==="ROLE_ADMIN" ||
                              !this.state.tournamentData.canCurrentUserMenageTournament;

        return (
            <View style={MainStyles.contentStyle}>
                {!buttonsDisabled && <View style={{marginBottom:3, flexDirection:'row'}}>
                    <View style={{flex:1, marginRight: 3}}>
                        <Button title="Previous" color='#4b371b' onPress={()=>{this.props.playSound('toggle'); this.previousTurn()}}/>
                    </View>
                    <View style={{flex:1}}>
                        <Button title="Next" color='#4b371b' onPress={()=>{this.props.playSound('toggle'); this.nextTurn()}}/>
                    </View>
                </View>}
                <GestureRecognizer
                    onSwipeLeft={this.showPreviousTurn.bind(this)}
                    onSwipeRight={this.showNextTurn.bind(this)}
                    config={config}
                    style={{flex: 1, alignItems:'center'}}>
                    <View style={{flex: 1}}>
                        <View style={[TournamentStyles.staticWindow, TournamentStyles.pageWindow, MainStyles.borderStyle]}>
                            <Text style={MainStyles.smallWhiteStyle}>{this.state.turnNumber+1}/{this.state.tournamentData.turns.length}</Text>
                        </View>
                        {
                            this.state.tournamentName!==""?this.createTurn():<View/>
                        }
                    </View>
                </GestureRecognizer>
                <View style={MainStyles.buttonsPanelStyle}>
                    <View style={{flex:1, marginRight: 3}}>
                        <Button title={"Score"} color='#4b371b' onPress={()=>{this.showScoreBoard()}}/>
                    </View>
                    {!buttonsDisabled && <View style={{flex:1}}>
                        <Button title={"Finish"} color='#4b371b' onPress={()=>{this.props.playSound('toggle'); this.finishTournament()}}/>
                    </View>}
                </View>
                {this.state.showBattlePopup && this.createPopup()}
                {this.state.showScoreBoard && this.createScoreBoard()}
            </View>
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        security: state.security
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( TournamentManagePanel );