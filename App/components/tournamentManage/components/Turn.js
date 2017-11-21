import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
} from 'react-native';

import MainStyles from '../../../Styles/UniversalStyles/MainStyles'
import BattleStyle from '../../../Styles/BattlePanelStyles/BattleStyle'
import BaseColours from "../../../main/consts/BaseColours"


import EntityPanelStyle from '../../../Styles/CollectionPanelStyles/EntityPanelStyle'

import Battle1x1 from './turnContent/Battle1x1'
import Battle2x2 from './turnContent/Battle2x2'

class Turn extends React.Component{
    constructor(props) {
        super(props);
    }

    createBattles(){
        return this.props.tourData
            .sort(
                (battle1,battle2) => battle1.tableNumber - battle2.tableNumber
            )
            .map(
                (battle,index) => {
                    if(this.props.haveAlonePlayer && index === this.props.tourData.length-1 && this.props.tournamentStatus!=="FINISHED"){
                        if(this.props.currentTourNumber<=this.props.tourNumber){
                            return;
                        }
                    }

                    if (this.props.playersOnTableCount === 2) {
                        return <Battle1x1
                            tourNumber={this.props.tourNumber}
                            key={battle.tableNumber}
                            battleData={battle}
                            showBattlePopup={this.props.showBattlePopup}
                            disabled={this.props.disabled}
                        />
                    }
                    else {
                        return <Battle2x2
                            tourNumber={this.props.tourNumber}
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
        let tourActiveColor = this.props.currentTourNumber===this.props.tourNumber? BaseColours.misc.deepGreen : BaseColours.misc.deepRed
        return(
            <ScrollView>
                <View style={[BattleStyle.turnHeader,{backgroundColor: tourActiveColor}]}>
                    <Text style={[MainStyles.textStyle, {fontSize:22}]}>Turn {this.props.tourNumber+1}</Text></View>
                {this.createBattles()}
            </ScrollView>
        )
    }
}

export default Turn;
