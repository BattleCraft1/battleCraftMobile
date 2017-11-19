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
import PlayerCard from './PlayerCard';

import Modal from 'react-native-modal';

import MainStyles from 'battleCraftMobile/App/Styles/UniversalStyles/MainStyles';
import BattleInspectorStyle from 'battleCraftMobile/App/Styles/BattlePanelStyles/BattleInspectorStyle';

import BaseColours from "battleCraftMobile/App/main/consts/BaseColours"
import ListColours from "battleCraftMobile/App/main/consts/ListColours"

import { ActionCreators } from '../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class BattleInspector extends Component {

    constructor(props) {
        super(props);
    }

    calculatePanelHeight(){
        return this.props.dimension.orientation === 'portrait'?
            this.props.dimension.height*0.70:this.props.dimension.height*0.75;
    }

    render() {
        let scoreBackground;
        if(this.props.battleData.player1.score===this.props.battleData.player2.score){
            scoreBackground={P1: ListColours.battle.DRAW, P2: ListColours.battle.DRAW};
        }
        else if(this.props.battleData.player1.score>this.props.battleData.player2.score){
            scoreBackground={P1: ListColours.battle.WIN, P2: ListColours.battle.LOSE};
        }
        else scoreBackground={P1: ListColours.battle.LOSE, P2: ListColours.battle.WIN};

        let totalBackground;
        if(this.props.battleData.player1.total===this.props.battleData.player2.total){
            totalBackground={P1: ListColours.battle.DRAW, P2: ListColours.battle.DRAW};
        }
        else if(this.props.battleData.player1.total>this.props.battleData.player2.total){
            totalBackground={P1: ListColours.battle.WIN, P2: ListColours.battle.LOSE};
        }
        else totalBackground={P1: ListColours.battle.LOSE, P2: ListColours.battle.WIN};

        let panelHeight = this.calculatePanelHeight();

        return (
            <Modal isVisible={this.props.isVisible} backdropOpacity={0.3}>
                <View style={[BattleInspectorStyle.modal, {width:this.props.dimension.width*0.9, height: panelHeight}]}>
                    <View style={[BattleInspectorStyle.battleHeader, MainStyles.borderStyle]}><Text style={[MainStyles.textStyle, {fontSize: 24}]}>Battle name</Text></View>
                    <ScrollView>
                    <PlayerCard playerData={this.props.battleData.player1}
                                colour={BaseColours.misc.greyBlue}
                                scoreBackground={scoreBackground.P1}
                                totalBackground={totalBackground.P1}/>

                    <View style={[BattleInspectorStyle.vsCard, MainStyles.borderStyle]}>
                        <Image style={{alignSelf:'center', width:60, height:60}} source={require("battleCraftMobile/img/vsIcon.png")}/>
                        <View>
                            <View style={BattleInspectorStyle.dataRow}><Text style={MainStyles.bigWhiteStyle}>Table number:</Text></View>
                            <View style={[BattleInspectorStyle.dataRow,{borderBottomWidth:0}]}><Text style={MainStyles.bigWhiteStyle}>{this.props.battleData.table}</Text></View>
                        </View>
                    </View>
                    <PlayerCard playerData={this.props.battleData.player2}
                                colour={BaseColours.misc.deepRed}
                                scoreBackground={scoreBackground.P2}
                                totalBackground={totalBackground.P2}/>
                    </ScrollView>
                    <View><Button title={"Close"} color='#4b371b' onPress={() => this.props.onClosePanel()}/></View>
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

export default connect( mapStateToProps)( BattleInspector );