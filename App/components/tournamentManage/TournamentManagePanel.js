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
            tourNumber:0,
            tournamentData:{
                tours:[],
                playersNamesWithPoints:{},
                playersWithoutBattles:{},
                currentTourNumber:0,
                tournamentStatus:"",
                playersOnTableCount:0,
                playersCount:0
            },
            canCurrentUserMenageTournament:false
        };
    }

    async componentDidMount() {
        await this.fetchTournamentProgressData(this.props.tournamentName);
        this.setState({tournamentName:this.props.tournamentName});
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
                await this.prepareToursData(res.data);
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
                    this.prepareToursData(res.data);
                })
                .catch(error => {
                    this.props.stopLoading();
                    this.props.showNetworkErrorMessage(error, sendBattleDataOperation);
                });
        };
        sendBattleDataOperation();
    }

    async prepareToursData(tournamentData){
        this.setState({playersOnTableCount:tournamentData.playersOnTableCount});
        if(tournamentData.playersOnTableCount === 4){
            for (let tourNumber in tournamentData.playersWithoutBattles) {
                if (tournamentData.playersWithoutBattles.hasOwnProperty(tourNumber)) {
                    tournamentData.playersWithoutBattles[tourNumber].push(["", ""]);
                }
            }
        }
        else{
            for (let tourNumber in tournamentData.playersWithoutBattles) {
                if (tournamentData.playersWithoutBattles.hasOwnProperty(tourNumber)) {
                    tournamentData.playersWithoutBattles[tourNumber].push("");
                }
            }
        }
        this.setState({tournamentData:tournamentData});
    }

    createTour(){
        let tour = this.state.tournamentData.tours[this.state.tourNumber];
        return <Turn
            key={this.state.tourNumber}
            tourData={tour}
            tourNumber={this.state.tourNumber}
            haveAlonePlayer={this.state.tournamentData.playersCount%2!==0}
            showBattlePopup={this.showBattlePopup.bind(this)}
            playersOnTableCount={this.state.playersOnTableCount}
            tournamentStatus={this.state.tournamentData.tournamentStatus}
            disabled={this.state.tourNumber>this.state.tournamentData.currentTourNumber || !this.state.tournamentData.canCurrentUserMenageTournament}
            currentTourNumber={this.state.tournamentData.currentTourNumber}
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

    nextTour(){
        if(this.state.tournamentData.currentTourNumber === this.state.tournamentData.tours.length-1){
            this.props.showFailureMessage("This tournament is finished");
            return;
        }

        let notHaveAlonePlayer = this.state.tournamentData.playersCount%2===0;
        for(let i=0;i<=this.state.tournamentData.currentTourNumber;i++){
            for(let j=0; j<this.state.tournamentData.tours[i].length;j++){
                if(!((notHaveAlonePlayer && this.state.tournamentData.tours[i][j].finished === true) ||
                        (!notHaveAlonePlayer && (this.state.tournamentData.tours[i][j].tableNumber === this.state.tournamentData.tours[i].length-1 ||
                            this.state.tournamentData.tours[i][j].finished === true)))){
                    this.props.showFailureMessage("Battle on table with number: "+(j+1)+" in tour: "+(i+1)+" is not finished yet");
                    return;
                }
            }
        }

        this.props.showConfirmationDialog(
            {
                header:"Start next tour",
                message:"Are you sure?",
                onConfirmFunction: () =>{this.props.playSound('battle'); this.nextTourRequest()}
            });
    }


    nextTourRequest(){
        let tournamentTypeString = this.state.playersOnTableCount === 4?"group":"duel";
        let nextTourOperation = () => {
            this.props.startLoading("Confirming tour...");
        axios.get(`${serverName}next/tour/${tournamentTypeString}/tournament?name=${this.state.tournamentName}`,
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
                this.prepareToursData(res.data);
                this.setState({tournamentData:res.data});
            })
            .catch(error => {
                this.props.stopLoading();
                this.props.showNetworkErrorMessage(error,nextTourOperation);
            });
        };
        nextTourOperation();
    }

    previousTour(){
        if(this.state.tournamentData.currentTourNumber === 0)
            this.props.showFailureMessage("This is first tour of tournament");
        else{

            this.props.showConfirmationDialog(
                {
                    header:"Come back to previous tour",
                    message:"Are you sure? If you come back to previous tour all data from this tour will be lost!",
                    onConfirmFunction: () =>{this.props.playSound('battle'); this.previousTourRequest()}
                });
        }
    }

    previousTourRequest(){
        let tournamentTypeString = this.state.playersOnTableCount === 4?"group":"duel";
        let previousTourOperation = () => {
            this.props.startLoading("Coming back to previous tour...");
            axios.get(`${serverName}previous/tour/${tournamentTypeString}/tournament?name=${this.state.tournamentName}`,
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
                    this.prepareToursData(res.data);
                    this.setState({tournamentData: res.data});
                })
                .catch(error => {
                    this.props.stopLoading();
                    this.props.showNetworkErrorMessage(error,previousTourOperation);
                });
        };

        previousTourOperation()
    }


    finishTournament(){
        let haveAlonePlayer = this.state.tournamentData.playersCount%2===0;

        for(let i=0;i<this.state.tournamentData.tours.length;i++){
            for(let j=0; j<this.state.tournamentData.tours[i].length;j++){
                if(haveAlonePlayer && this.state.tournamentData.tours[i].tableNumber !== this.state.tournamentData.tours[i].length-1 &&
                    this.state.tournamentData.tours[i][j].finished === false){
                    this.props.showFailureMessage("Battle on table with number: "+(j+1)+" in tour: "+(i+1)+" is not finished yet");
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
                    this.prepareToursData(res.data);
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

    showNextTour(){
        let tourNumber = this.state.tourNumber+1;
        if(tourNumber<this.state.tournamentData.tours.length){
            this.props.playSound('flip');
            this.setState({tourNumber:tourNumber});
        }
    }

    showPreviousTour(){
        let tourNumber = this.state.tourNumber-1;
        if(tourNumber>=0){
            this.props.playSound('flip');
            this.setState({tourNumber:tourNumber});
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
                        <Button title="Previous" color='#4b371b' onPress={()=>{this.props.playSound('toggle'); this.previousTour.bind(this)}}/>
                    </View>
                    <View style={{flex:1}}>
                        <Button title="Next" color='#4b371b' onPress={()=>{this.props.playSound('toggle'); this.nextTour.bind(this)}}/>
                    </View>
                </View>}
                <GestureRecognizer
                    onSwipeLeft={this.showPreviousTour.bind(this)}
                    onSwipeRight={this.showNextTour.bind(this)}
                    config={config}
                    style={{flex: 1, alignItems:'center'}}>
                    <View style={{flex: 1}}>
                        <View style={[TournamentStyles.staticWindow, TournamentStyles.pageWindow, MainStyles.borderStyle]}>
                            <Text style={MainStyles.smallWhiteStyle}>{this.state.tourNumber+1}/{this.state.tournamentData.tours.length}</Text>
                        </View>
                        {
                            this.state.tournamentName!==""?this.createTour():<View/>
                        }
                    </View>
                </GestureRecognizer>
                <View style={MainStyles.buttonsPanelStyle}>
                    <View style={{flex:1, marginRight: 3}}>
                        <Button title={"Score"} color='#4b371b' onPress={()=>{this.showScoreBoard.bind(this)}}/>
                    </View>
                    {!buttonsDisabled && <View style={{flex:1}}>
                        <Button title={"Finish"} color='#4b371b' onPress={()=>{this.props.playSound('toggle'); this.finishTournament.bind(this)}}/>
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