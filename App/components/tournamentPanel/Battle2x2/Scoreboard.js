/**
 * Created by FBegiello on 15.11.2017.
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Button
} from 'react-native';

import Modal from 'react-native-modal';

import MainStyles from 'battleCraftMobile/App/Styles/MainStyles';
import ScoreboardStyles from 'battleCraftMobile/App/Styles/ScoreboardStyles';

import BaseColours from "battleCraftMobile/App/main/consts/BaseColours"
import ListColours from "battleCraftMobile/App/main/consts/ListColours"

export default class Scoreboard extends Component {

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

    renderRow(rowData){
        let backgroundColour = this.checkPosition(rowData.position);

        return(
            <View style={ScoreboardStyles.scoreboardRow}>
                <View style={[ScoreboardStyles.positionNumber2x2]}>
                    <Text style={MainStyles.bigWhiteStyle}>{rowData.position}.</Text>
                </View>
                <View>
                    <View style={[ScoreboardStyles.dataCard ,{backgroundColor: backgroundColour}]}>
                        <View style={ScoreboardStyles.avatarContainer}>
                            {rowData.avatar}
                        </View>
                        <View style={ScoreboardStyles.textContainer}>
                            <Text style={[MainStyles.smallWhiteStyle, {fontSize: 20}]}>{rowData.name}</Text>
                        </View>
                    </View>
                    <View style={[ScoreboardStyles.dataCard ,{backgroundColor: backgroundColour}]}>
                        <View style={ScoreboardStyles.avatarContainer}>
                            {rowData.avatar}
                        </View>
                        <View style={ScoreboardStyles.textContainer}>
                            <Text style={[MainStyles.smallWhiteStyle, {fontSize: 20}]}>{rowData.name}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    render() {

        let panelHeight = 600;


        return (
            <Modal isVisible={this.props.isVisible} backdropOpacity={0.3}>
                <View style={[ScoreboardStyles.modal, {height: panelHeight}]}>
                    <View style={ScoreboardStyles.scoreboardHeader}>
                        <Text style={MainStyles.bigWhiteStyle}>Scoreboard</Text>
                    </View>

                    <ScrollView style={{flex:1, marginTop:10}}>
                        {this.renderRow({name: 'temp', position: 1,})}
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