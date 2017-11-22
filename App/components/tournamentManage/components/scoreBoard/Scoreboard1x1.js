/**
 * Created by FBegiello on 15.11.2017.
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Button,
    Image,
} from 'react-native';

import Modal from 'react-native-modal';

import MainStyles from 'battleCraftMobile/App/Styles/UniversalStyles/MainStyles';
import ScoreboardStyles from 'battleCraftMobile/App/Styles/BattlePanelStyles/ScoreboardStyles';

import BaseColours from "battleCraftMobile/App/main/consts/BaseColours"
import ListColours from "battleCraftMobile/App/main/consts/ListColours"

import { connect } from 'react-redux';
import {serverName} from "../../../../main/consts/serverName";

class Scoreboard extends Component {

    constructor(props) {
        super(props);
    }

    calculatePanelHeight(){
        return this.props.dimension.orientation === 'portrait'?
            this.props.dimension.height*0.85:this.props.dimension.height*0.75;
    }

    checkPosition(position){
        if(position===1){
            return(ListColours.battle.WIN)
        }
        else if(position===2||position===3)
        {
            return(ListColours.battle.DRAW)
        }
        else{
            return(BaseColours.background.lightBrown)
        }
    }

    renderRow(name,points,index){
        let backgroundColour = this.checkPosition(index+1);

        return(
            <View key={index} style={ScoreboardStyles.scoreboardRow}>
                <View style={[ScoreboardStyles.positionNumber, ScoreboardStyles.numberSize1]}>
                    <Text style={MainStyles.smallWhiteStyle}>{index+1}.</Text>
                </View>
                <View style={[ScoreboardStyles.dataCard ,{backgroundColor: backgroundColour}]}>
                    <View style={ScoreboardStyles.avatarContainer}>
                        <Image style={{flex:1}} source={{uri:`${serverName}/get/user/avatar?username=${name}`}}/>
                    </View>
                    <View style={ScoreboardStyles.textContainer}>
                        <Text style={MainStyles.smallWhiteStyle}>{name}</Text>
                    </View>
                </View>
                <View style={[ScoreboardStyles.positionNumber, ScoreboardStyles.numberSize1]}>
                    <Text style={MainStyles.smallWhiteStyle}>{points}</Text>
                </View>
            </View>
        )
    }

    render() {

        let panelHeight = this.calculatePanelHeight();
        let playersNamesWithPoints = this.props.playersNamesWithPoints;

        return (
            <Modal isVisible={true} backdropOpacity={0.3}>
                <View style={[ScoreboardStyles.modal, {width:this.props.dimension.width*0.9, height: panelHeight}]}>
                    <View style={ScoreboardStyles.scoreboardHeader}>
                        <Text numberOfLines={1}  style={MainStyles.bigWhiteStyle}>Scoreboard</Text>
                    </View>

                    <ScrollView style={{flex:1, marginTop:10}}>
                        {
                            Object.keys(playersNamesWithPoints)
                            .sort((playerName1,playerName2) => playersNamesWithPoints[playerName2] - playersNamesWithPoints[playerName1])
                            .map((playerName,index) => this.renderRow(playerName,playersNamesWithPoints[playerName],index))
                        }
                    </ScrollView>

                    <View><Button title={"Close"} color={BaseColours.background.darkBrown}  onPress={() => this.props.hidePopup()}/></View>
                </View>
            </Modal>
        );
    }
}

function mapStateToProps( state ) {
    return {
        dimension: state.dimension
    };
}

export default connect( mapStateToProps)( Scoreboard );