/**
 * Created by FBegiello on 01.11.2017.
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Button,
    ScrollView,
    TouchableHighlight
} from 'react-native';
import PlayerCard from './playerCard/PlayerCard2x2';

import Modal from 'react-native-modal';
import PlayerList from '../playerList/GroupPlayerList'

import MainStyles from 'battleCraftMobile/App/Styles/UniversalStyles/MainStyles';
import BattleInspectorStyle from 'battleCraftMobile/App/Styles/BattlePanelStyles/BattleInspectorStyle';
import TournamentStyles from 'battleCraftMobile/App/Styles/BattlePanelStyles/TournamentStyles';

import BaseColours from "battleCraftMobile/App/main/consts/BaseColours"
import ListColours from "battleCraftMobile/App/main/consts/ListColours"

import { ActionCreators } from '../../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import compareArrays from "../../../../main/functions/compareArrays";

class BattleInspector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            battleData:{
                tableNumber: 0,
                firstPlayersGroup: {
                    playersNames: [
                        "",
                        ""
                    ],
                    playersPoints: 0
                },
                secondPlayersGroup: {
                    playersNames: [
                        "",
                        ""
                    ],
                    playersPoints: 0
                },
                finished: false

            },
            playersWithoutBattles:[],
            usersListVisible:false,
            numberOfPlayersToChange:-1,
            componentReady:false
        };
    }

    componentDidMount() {
        this.setState({battleData:JSON.parse(JSON.stringify(this.props.battleData))});
        this.setState({playersWithoutBattles:JSON.parse(JSON.stringify(this.props.playersWithoutBattles[this.props.battleData.tourNumber]))});
        this.setState({componentReady:true});
    }

    showUsersList(numberOfPlayersToChange)
    {
        this.setState({numberOfPlayersToChange:numberOfPlayersToChange});
        this.setState({usersListVisible:true})
    }

    hideUsersList(){
        this.setState({usersListVisible:false})
    }

    calculatePanelHeight(){
        return this.props.dimension.orientation === 'portrait'?
            this.props.dimension.height*0.70:this.props.dimension.height*0.75;
    }

    chooseRandomPlayers(){
        this.props.playSound('dice');
        let playersNames = this.state.playersWithoutBattles;

        playersNames.splice(playersNames.indexOf(["",""]),1);
        let battleData = this.state.battleData;

        if(!compareArrays(battleData.firstPlayersGroup.playersNames,["",""]) &&
            playersNames.indexOf(battleData.firstPlayersGroup.playersNames) === -1){
            playersNames.unshift(battleData.firstPlayersGroup.playersNames);
        }
        if(!compareArrays(battleData.secondPlayersGroup.playersNames,["",""]) &&
            playersNames.indexOf(battleData.secondPlayersGroup.playersNames) === -1) {
            playersNames.unshift(battleData.secondPlayersGroup.playersNames);
        }

        let firstRandomNames = playersNames[Math.floor(Math.random()*playersNames.length)];
        let secondRandomNames = playersNames[Math.floor(Math.random()*playersNames.length)];
        if(compareArrays(firstRandomNames,secondRandomNames)){
            let indexOfFirstNames = playersNames.indexOf(firstRandomNames);
            if(indexOfFirstNames > 0){
                secondRandomNames = playersNames[indexOfFirstNames-1];
            }
            else{
                secondRandomNames = playersNames[indexOfFirstNames+1];
            }
        }

        playersNames.splice(playersNames.indexOf(firstRandomNames),1);
        battleData.firstPlayersGroup = {
            playersNames:firstRandomNames,
            playersPoints:0
        };

        playersNames.splice(playersNames.indexOf(secondRandomNames),1);
        battleData.secondPlayersGroup = {
            playersNames:secondRandomNames,
            playersPoints:0
        };

        playersNames.push(["",""]);
        this.setState({battleData:battleData,playersWithoutBattles:playersNames});
    }

    changePlayersData(changedPlayersNames){
        let battleData = this.state.battleData;
        if(this.state.numberOfPlayersToChange === 0){
            this.changePlayersWithoutBattles(battleData.firstPlayersGroup.playersNames,changedPlayersNames);
            battleData.firstPlayersGroup = {
                playersNames:changedPlayersNames,
                playersPoints:0
            }
        }
        else if(this.state.numberOfPlayersToChange === 1){
            this.changePlayersWithoutBattles(battleData.secondPlayersGroup.playersNames,changedPlayersNames);
            battleData.secondPlayersGroup = {
                playersNames:changedPlayersNames,
                playersPoints:0
            }
        }

        this.setState({usersListVisible:false,battleData:battleData})
    }

    clearBattleData(){
        this.props.showConfirmationDialog(
            {
                header:"Clear data for battle",
                message:"Are you sure?",
                onConfirmFunction: () => this.clearBattleDataFunction()
            }
        )

    }


    clearBattleDataFunction(){
        this.state.battleData.firstPlayersGroup.playersNames = ["",""];
        this.state.battleData.secondPlayersGroup.playersNames = ["",""];
        this.state.battleData.firstPlayersGroup.playersPoints = 0;
        this.state.battleData.secondPlayersGroup.playersPoints = 0;
        this.props.sendBattleData(this.state.battleData);
        this.props.hidePopup();
    }

    changePlayersWithoutBattles(playerNamesToPush,playerNamesToPop){
        let playersWithoutBattles = this.state.playersWithoutBattles;
        if(!compareArrays(playerNamesToPush,["",""])){
            playersWithoutBattles.unshift(playerNamesToPush);
        }
        if(!compareArrays(playerNamesToPop,["",""])){
            playersWithoutBattles.splice(playersWithoutBattles.indexOf(playerNamesToPop),1);
        }
        this.setState({playersWithoutBattles:playersWithoutBattles});
    }

    changePointsOfFirstPlayersGroup(points){
        let battleData = this.state.battleData;
        battleData.firstPlayersGroup.playersPoints = isNaN(points)?"":points;
        this.setState({battleData:battleData});
    }

    changePointsOfSecondPlayersGroup(points){
        let battleData = this.state.battleData;
        battleData.secondPlayersGroup.playersPoints = isNaN(points)?"":points;
        this.setState({battleData:battleData});
    }

    sendBattleData(){
        if(isNaN(this.state.battleData.firstPlayersGroup.playersPoints) || this.state.battleData.firstPlayersGroup.playersPoints === undefined){
            this.props.showFailureMessage("First player points cannot be empty");
        }
        else if(isNaN(this.state.battleData.secondPlayersGroup.playersPoints) || this.state.battleData.secondPlayersGroup.playersPoints === undefined){
            this.props.showFailureMessage("Second player points cannot be empty");
        }
        else if(this.state.battleData.firstPlayersGroup.playersPoints + this.state.battleData.secondPlayersGroup.playersPoints>20 ||
            this.state.battleData.firstPlayersGroup.playersPoints<0 || this.state.battleData.secondPlayersGroup.playersPoints<0){
            this.props.showFailureMessage("Points number should be between 0 to 20 and summary of points should not be greater than 20");
        }
        else if(this.state.battleData.firstPlayersGroup.playersNames[0] === ""){
            this.props.showFailureMessage("First player in first group slot cannot be empty");
        }
        else if(this.state.battleData.firstPlayersGroup.playersNames[1] === ""){
            this.props.showFailureMessage("Second player in first group slot cannot be empty");
        }
        else if(this.state.battleData.secondPlayersGroup.playersNames[0] === ""){
            this.props.showFailureMessage("First player in first group slot cannot be empty");
        }
        else if(this.state.battleData.secondPlayersGroup.playersNames[1] === ""){
            this.props.showFailureMessage("Second player in first group slot cannot be empty");
        }
        else{
            let sendBattleData = this.props.sendBattleData;
            let hidePopup = this.props.hidePopup;
            let battleData = this.state.battleData;

            this.props.showConfirmationDialog(
                {
                    header:"Save data for battle",
                    message:"Are you sure?",
                    onConfirmFunction: () => {
                        sendBattleData(battleData);
                        hidePopup();
                    }
                }
            )
        }
    }

    getVSIcon(){
        return this.props.battleData.finished?require("battleCraftMobile/img/vsIconFinished.png"):require("battleCraftMobile/img/vsIcon.png");
    }

    render() {
        let scoreBackground;
        if(this.state.battleData.firstPlayersGroup.playersPoints===this.state.battleData.secondPlayersGroup.playersPoints){
            scoreBackground={P1: ListColours.battle.DRAW, P2: ListColours.battle.DRAW};
        }
        else if(this.state.battleData.firstPlayersGroup.playersPoints>this.state.battleData.secondPlayersGroup.playersPoints){
            scoreBackground={P1: ListColours.battle.WIN, P2: ListColours.battle.LOSE};
        }
        else scoreBackground={P1: ListColours.battle.LOSE, P2: ListColours.battle.WIN};

        let totalBackground;
        if(this.props.playersNamesWithPoints[this.state.battleData.firstPlayersGroup.playersNames[0]]===
            this.props.playersNamesWithPoints[this.state.battleData.secondPlayersGroup.playersNames[0]]){
            totalBackground={P1: ListColours.battle.DRAW, P2: ListColours.battle.DRAW};
        }
        else if(this.props.playersNamesWithPoints[this.state.battleData.firstPlayersGroup.playersNames[0]]>
            this.props.playersNamesWithPoints[this.state.battleData.secondPlayersGroup.playersNames[0]]){
            totalBackground={P1: ListColours.battle.WIN, P2: ListColours.battle.LOSE};
        }
        else totalBackground={P1: ListColours.battle.LOSE, P2: ListColours.battle.WIN};

        let panelHeight = this.calculatePanelHeight();

        let firstPlayersNamesGroupWithPoints = this.props.playersNamesWithPoints.find(
            playersGroupNamesWithPoints => compareArrays(playersGroupNamesWithPoints.playersInGroupNames,
                              this.props.battleData.firstPlayersGroup.playersNames));
        let firstPlayersGroupTotalPoints = firstPlayersNamesGroupWithPoints?firstPlayersNamesGroupWithPoints.points:0;

        let secondPlayersNamesGroupWithPoints = this.props.playersNamesWithPoints.find(
            playersGroupNamesWithPoints => compareArrays(playersGroupNamesWithPoints.playersInGroupNames,
                              this.props.battleData.secondPlayersGroup.playersNames));
        let secondPlayersGroupTotalPoints = secondPlayersNamesGroupWithPoints?secondPlayersNamesGroupWithPoints.points:0;

        return (
            <View>
                <Modal isVisible={true} backdropOpacity={0.3}>
                    <View style={[BattleInspectorStyle.modal, {width:this.props.dimension.width*0.9, height: panelHeight}]}>
                        <ScrollView>
                            <View style={[BattleInspectorStyle.battleHeader, MainStyles.borderStyle]}><Text style={[MainStyles.textStyle, {fontSize: 24}]}>Battle</Text></View>
                            <TouchableHighlight
                                onPress={this.chooseRandomPlayers.bind(this)}
                                style={[TournamentStyles.staticWindow, TournamentStyles.randomizeWindow, MainStyles.borderStyle]}>
                                <Image style={TournamentStyles.diceIcon} source={require('battleCraftMobile/img/diceIcon.png')}/>
                            </TouchableHighlight>
                            <PlayerCard playersNames={this.state.battleData.firstPlayersGroup.playersNames}
                                        playersPoints={this.state.battleData.firstPlayersGroup.playersPoints}
                                        changeData={this.changePointsOfFirstPlayersGroup.bind(this)}
                                        totalPoints={firstPlayersGroupTotalPoints}
                                        colour={BaseColours.misc.greyBlue}
                                        showUsersList={() => this.showUsersList(0)}
                                        scoreBackground={scoreBackground.P1}
                                        totalBackground={totalBackground.P1}/>

                            <View style={[BattleInspectorStyle.vsCard, MainStyles.borderStyle]}>
                                <Image style={{alignSelf:'center', width:60, height:60}} source={this.getVSIcon()}/>
                                <View>
                                    <View style={BattleInspectorStyle.dataRow}><Text style={MainStyles.bigWhiteStyle}>Table number:</Text></View>
                                    <View style={[BattleInspectorStyle.dataRow,{borderBottomWidth:0}]}><Text numberOfLines={1}  style={MainStyles.bigWhiteStyle}>{this.state.battleData.tableNumber+1}</Text></View>
                                </View>
                            </View>
                            <PlayerCard playersNames={this.state.battleData.secondPlayersGroup.playersNames}
                                        playersPoints={this.state.battleData.secondPlayersGroup.playersPoints}
                                        changeData={this.changePointsOfSecondPlayersGroup.bind(this)}
                                        totalPoints={secondPlayersGroupTotalPoints}
                                        colour={BaseColours.misc.deepRed}
                                        showUsersList={() => this.showUsersList(1)}
                                        scoreBackground={scoreBackground.P2}
                                        totalBackground={totalBackground.P2}/>
                        </ScrollView>
                        <View style={MainStyles.buttonsPanelStyle}>
                            <View style={{flex:1, marginRight: 3}}>
                                <Button title={"Close"} color='#4b371b' onPress={()=>{this.props.hidePopup();this.props.playSound('toggle')}}/>
                            </View>
                            <View style={{flex:1, marginRight: 3}}>
                                <Button title={"Clear"} color='#4b371b' onPress={()=>{this.clearBattleData();this.props.playSound('toggle');}}/>
                            </View>
                            <View style={{flex:1}}>
                                <Button title={"Save"} color='#4b371b' onPress={()=>{this.sendBattleData();this.props.playSound('toggle');}}/>
                            </View>
                        </View>
                    </View>
                </Modal>
                {this.state.usersListVisible &&
                <PlayerList hideList={() => this.hideUsersList()}
                            changePlayersData={this.changePlayersData.bind(this)}
                            playersWithoutBattles={this.state.playersWithoutBattles}/>}
            </View>
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        dimension:state.dimension
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( BattleInspector );