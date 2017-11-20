/**
 * Created by FBegiello on 01.11.2017.
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Button,
    ScrollView
} from 'react-native';
import PlayerCard from './playerCard/PlayerCard1x1';

import Modal from 'react-native-modal';
import PlayerList from '../playerList/DuelPlayerList'

import MainStyles from 'battleCraftMobile/App/Styles/UniversalStyles/MainStyles';
import BattleInspectorStyle from 'battleCraftMobile/App/Styles/BattlePanelStyles/BattleInspectorStyle';

import BaseColours from "battleCraftMobile/App/main/consts/BaseColours"
import ListColours from "battleCraftMobile/App/main/consts/ListColours"

import { ActionCreators } from '../../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class BattleInspector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            battleData:{
                tableNumber: 0,
                firstPlayer: {
                    name: "",
                    points: 0
                },
                secondPlayer: {
                    name: "",
                    points: 0
                },
                finished: false
            },
            playersWithoutBattles:[],
            usersListVisible:false,
            numberOfPlayerToChange:-1,
            componentReady:false
        };
    }

    componentDidMount() {
        this.setState({battleData:JSON.parse(JSON.stringify(this.props.battleData))});
        this.setState({playersWithoutBattles:JSON.parse(JSON.stringify(this.props.playersWithoutBattles[this.props.battleData.tourNumber]))});
        this.setState({componentReady:true});
    }

    showUsersList(numberOfPlayerToChange)
    {
        this.setState({numberOfPlayerToChange:numberOfPlayerToChange});
        this.setState({usersListVisible:true})
    }

    changePlayerData(changedPlayerName){
        let battleData = this.state.battleData;
        if(this.state.numberOfPlayerToChange === 0){
            this.changePlayersWithoutBattles(battleData.firstPlayer.name,changedPlayerName);
            battleData.firstPlayer = {
                name:changedPlayerName,
                points:0
            }
        }
        else if(this.state.numberOfPlayerToChange === 1){
            this.changePlayersWithoutBattles(battleData.secondPlayer.name,changedPlayerName);
            battleData.secondPlayer = {
                name:changedPlayerName,
                points:0
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
        this.state.battleData.firstPlayer.name = "";
        this.state.battleData.secondPlayer.name = "";
        this.state.battleData.firstPlayer.points = 0;
        this.state.battleData.secondPlayer.points = 0;
        this.props.sendBattleData(this.state.battleData);
        this.props.hidePopup();
    }

    changePlayersWithoutBattles(playerNameToPush,playerNameToPop){
        let playersWithoutBattles = this.state.playersWithoutBattles;
        if(playerNameToPush!==""){
            playersWithoutBattles.unshift(playerNameToPush);
        }
        if(playerNameToPop!==""){
            playersWithoutBattles.splice(playersWithoutBattles.indexOf(playerNameToPop),1);
        }
        this.setState({playersWithoutBattles:playersWithoutBattles});
    }

    changePointsOfFirstPlayer(points){
        let battleData = this.state.battleData;
        battleData.firstPlayer.points = isNaN(points)?"":points;
        this.setState({battleData:battleData});
    }

    changePointsOfSecondPlayer(points){
        let battleData = this.state.battleData;
        battleData.secondPlayer.points = isNaN(points)?"":points;
        this.setState({battleData:battleData});
    }

    getVSIcon(){
        return this.props.battleData.finished?require("battleCraftMobile/img/vsIconFinished.png"):require("battleCraftMobile/img/vsIcon.png");
    }

    sendBattleData(){
        if(isNaN(this.state.battleData.firstPlayer.points) || this.state.battleData.firstPlayer.points === undefined){
            this.props.showFailureMessage("First player points cannot be empty");
        }
        else if(isNaN(this.state.battleData.secondPlayer.points) || this.state.battleData.secondPlayer.points === undefined){
            this.props.showFailureMessage("Second player points cannot be empty");
        }
        else if(this.state.battleData.firstPlayer.points + this.state.battleData.secondPlayer.points>20 ||
            this.state.battleData.firstPlayer.points<0 || this.state.battleData.secondPlayer.points<0){
            this.props.showFailureMessage("Points number should be between 0 to 20 and summary of points should not be greater than 20");
        }
        else if(this.state.battleData.firstPlayer.name === ""){
            this.props.showFailureMessage("First player slot cannot be empty");
        }
        else if(this.state.battleData.secondPlayer.name === ""){
            this.props.showFailureMessage("Second player slot cannot be empty");
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

    hideUsersList(){
        this.setState({usersListVisible:false})
    }

    calculatePanelHeight(){
        return this.props.dimension.orientation === 'portrait'?
            this.props.dimension.height*0.70:this.props.dimension.height*0.75;
    }

    render() {
        let scoreBackground;
        if(this.state.battleData.firstPlayer.points===this.state.battleData.secondPlayer.points){
            scoreBackground={P1: ListColours.battle.DRAW, P2: ListColours.battle.DRAW};
        }
        else if(this.state.battleData.firstPlayer.points>this.state.battleData.secondPlayer.points){
            scoreBackground={P1: ListColours.battle.WIN, P2: ListColours.battle.LOSE};
        }
        else scoreBackground={P1: ListColours.battle.LOSE, P2: ListColours.battle.WIN};

        let totalBackground;
        if(this.props.playersNamesWithPoints[this.state.battleData.firstPlayer.name]===
            this.props.playersNamesWithPoints[this.state.battleData.secondPlayer.name]){
            totalBackground={P1: ListColours.battle.DRAW, P2: ListColours.battle.DRAW};
        }
        else if(this.props.playersNamesWithPoints[this.state.battleData.firstPlayer.name]>
            this.props.playersNamesWithPoints[this.state.battleData.secondPlayer.name]){
            totalBackground={P1: ListColours.battle.WIN, P2: ListColours.battle.LOSE};
        }
        else totalBackground={P1: ListColours.battle.LOSE, P2: ListColours.battle.WIN};

        let panelHeight = this.calculatePanelHeight();

        return (
            <View>
                <Modal isVisible={true} backdropOpacity={0.3}>
                    <View style={[BattleInspectorStyle.modal, {width:this.props.dimension.width*0.9, height: panelHeight}]}>
                        <ScrollView>
                            <View style={[BattleInspectorStyle.battleHeader, MainStyles.borderStyle]}><Text style={[MainStyles.textStyle, {fontSize: 24}]}>Battle</Text></View>
                            <PlayerCard playerName={this.state.battleData.firstPlayer.name}
                                        playerPoints={this.state.battleData.firstPlayer.points}
                                        changeData={this.changePointsOfFirstPlayer.bind(this)}
                                        colour={BaseColours.misc.greyBlue}
                                        totalPoints={this.props.playersNamesWithPoints[this.props.battleData.firstPlayer.name]}
                                        showUsersList={() => this.showUsersList(0)}
                                        scoreBackground={scoreBackground.P1}
                                        totalBackground={totalBackground.P1}/>

                            <View style={[BattleInspectorStyle.vsCard, MainStyles.borderStyle]}>
                                <Image style={{alignSelf:'center', width:60, height:60}} source={this.getVSIcon()}/>
                                <View>
                                    <View style={BattleInspectorStyle.dataRow}><Text numberOfLines={1}  style={MainStyles.bigWhiteStyle}>Table number:</Text></View>
                                    <View style={[BattleInspectorStyle.dataRow,{borderBottomWidth:0}]}>
                                        <Text numberOfLines={1}  style={MainStyles.bigWhiteStyle}>{this.state.battleData.tableNumber}</Text>
                                    </View>
                                </View>
                            </View>
                            <PlayerCard playerName={this.state.battleData.secondPlayer.name}
                                        playerPoints={this.state.battleData.secondPlayer.points}
                                        changeData={this.changePointsOfSecondPlayer.bind(this)}
                                        colour={BaseColours.misc.deepRed}
                                        totalPoints={this.props.playersNamesWithPoints[this.props.battleData.secondPlayer.name]}
                                        showUsersList={() => this.showUsersList(1)}
                                        scoreBackground={scoreBackground.P2}
                                        totalBackground={totalBackground.P2}/>
                        </ScrollView>
                        <View style={MainStyles.buttonsPanelStyle}>
                            <View style={{flex:1, marginRight: 3}}>
                                <Button title={"Close"} color='#4b371b' onPress={this.props.hidePopup.bind(this)}/>
                            </View>
                            <View style={{flex:1, marginRight: 3}}>
                                <Button title={"Clear"} color='#4b371b' onPress={this.clearBattleData.bind(this)}/>
                            </View>
                            <View style={{flex:1}}>
                                <Button title={"Save"} color='#4b371b' onPress={this.sendBattleData.bind(this)}/>
                            </View>
                        </View>
                    </View>
                </Modal>
                {this.state.usersListVisible &&
                <PlayerList hideList={() => this.hideUsersList()}
                            changePlayerData={this.changePlayerData.bind(this)}
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