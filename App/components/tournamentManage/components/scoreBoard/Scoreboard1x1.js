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

import { ActionCreators } from '../../../../redux/actions/index';
import { bindActionCreators } from 'redux';
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
            return(BaseColours.battle.lightBrown)
        }
    }

    renderRow(name,points,index){
        let backgroundColour = this.checkPosition(index+1);

        return(
            <View style={ScoreboardStyles.scoreboardRow}>
                <View style={[ScoreboardStyles.positionNumber, ScoreboardStyles.numberSize1]}>
                    <Text style={MainStyles.bigWhiteStyle}>{index+1}.</Text>
                </View>
                <View style={[ScoreboardStyles.dataCard ,{backgroundColor: backgroundColour}]}>
                    <View style={ScoreboardStyles.avatarContainer}>
                        <Image style={{}} source={require(`${serverName}get/user/avatar?username=${name}`)}/>
                    </View>
                    <View style={ScoreboardStyles.textContainer}>
                        <Text style={[MainStyles.smallWhiteStyle, {fontSize: 20}]}>{name}</Text>
                    </View>
                </View>
                <View style={[ScoreboardStyles.positionNumber, ScoreboardStyles.numberSize1]}>
                    <Text style={MainStyles.bigWhiteStyle}>{points}.</Text>
                </View>
            </View>
        )
    }

    render() {

        let panelHeight = this.calculatePanelHeight();


        return (
            <Modal isVisible={this.props.isVisible} backdropOpacity={0.3}>
                <View style={[ScoreboardStyles.modal, {width:this.props.dimension.width*0.9, height: panelHeight}]}>
                    <View style={ScoreboardStyles.scoreboardHeader}>
                        <Text numberOfLines={1}  style={MainStyles.bigWhiteStyle}>Scoreboard</Text>
                    </View>

                    <ScrollView style={{flex:1, marginTop:10}}>
                        {this.props.playersNamesWithPoints
                            .sort(
                            (playerWithPoints1,playerWithPoints2) => playerWithPoints1[0] - playerWithPoints2[0])
                            .map((key,index) => this.renderRow(key,this.props.playersNamesWithPoints[key],index))
                        }
                    </ScrollView>

                    <View><Button title={"Close"} color={BaseColours.background.darkBrown}  onPress={() => this.props.onClosePanel()}/></View>
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