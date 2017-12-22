import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
} from 'react-native';

import MainStyles from '../../../Styles/UniversalStyles/MainStyles'
import BattleStyle from '../../../Styles/BattlePanelStyles/BattleStyle'
import BaseColours from "../../../main/consts/BaseColours"

import Battle1x1 from './turnContent/Battle1x1'
import Battle2x2 from './turnContent/Battle2x2'

class Turn extends React.Component{
    constructor(props) {
        super(props);
    }

    createBattles(){
        return this.props.turnData
            .sort(
                (battle1,battle2) => battle1.tableNumber - battle2.tableNumber
            )
            .map(
                (battle,index) => {
                    if(this.props.haveAlonePlayer && index === this.props.turnData.length-1 && this.props.tournamentStatus!=="FINISHED"){
                        if(this.props.currentTurnNumber<=this.props.turnNumber){
                            return;
                        }
                    }

                    if (this.props.playersOnTableCount === 2) {
                        return <Battle1x1
                            turnNumber={this.props.turnNumber}
                            key={battle.tableNumber}
                            battleData={battle}
                            showBattlePopup={this.props.showBattlePopup}
                            disabled={this.props.disabled}
                        />
                    }
                    else {
                        return <Battle2x2
                            turnNumber={this.props.turnNumber}
                            key={battle.tableNumber}
                            battleData={battle}
                            showBattlePopup={this.props.showBattlePopup}
                            disabled={this.props.disabled}
                        />
                    }
                }
            );
    }


    render(){
        let turnActiveColor = this.props.currentTurnNumber===this.props.turnNumber? BaseColours.misc.deepGreen : BaseColours.misc.deepRed
        return(
            <ScrollView>
                <View style={[BattleStyle.turnHeader,{backgroundColor: turnActiveColor}]}>
                    <Text style={[MainStyles.textStyle, {fontSize:22}]}>Turn {this.props.turnNumber+1}</Text></View>
                {this.createBattles()}
            </ScrollView>
        )
    }
}

export default Turn;
