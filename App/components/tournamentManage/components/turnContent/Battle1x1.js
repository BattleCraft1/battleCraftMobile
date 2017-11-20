/*Created by FBegiello on 30.10.2017.*/

import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    Image,
    TouchableHighlight

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import MainStyles from '../../../../Styles/UniversalStyles/MainStyles'
import BattleStyle from '../../../../Styles/BattlePanelStyles/BattleStyle'

import BaseColours from "../../../../main/consts/BaseColours"
import ListColours from "../../../../main/consts/ListColours"

import { ActionCreators } from '../../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {serverName} from "../../../../main/consts/serverName";

class Battle extends Component {

    showBattlePopup(){
        if(!this.props.disabled){
            this.props.showBattlePopup(Object.assign({tourNumber: this.props.tourNumber,tableNumber: this.props.battleData.tableNumber},
                this.props.battleData))
        }
    }

    generateURL(username){
        return username !== ""? {uri:`${serverName}/get/user/avatar?username=${username}`}:
            require("battleCraftMobile/img/questionAvatar.png")
    }

    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(['Placeholder']),
        };
    }

    getVSIcon(){
        return this.props.battleData.finished?require("battleCraftMobile/img/vsIconFinished.png"):require("battleCraftMobile/img/vsIcon.png");
    }

    renderBattle() {

        let scoreBackground;
        if(this.props.battleData.firstPlayer.points===this.props.battleData.secondPlayer.points){
            scoreBackground={P1: ListColours.battle.DRAW, P2: ListColours.battle.DRAW};
        }
        else if(this.props.battleData.firstPlayer.points>this.props.battleData.secondPlayer.points){
            scoreBackground={P1: ListColours.battle.WIN, P2: ListColours.battle.LOSE};
        }
        else scoreBackground={P1: ListColours.battle.LOSE, P2: ListColours.battle.WIN};

        return (
            <View style={[BattleStyle.battleWindow,{width:this.props.dimension.width*0.9}]}>
                <View style={[BattleStyle.playerHeader, MainStyles.borderStyle]}>
                    <Icon style={{padding:3}} name={"bookmark"} size={24} color={BaseColours.misc.greyBlue}/>
                    <Text numberOfLines={1}  style={[BattleStyle.player1Text, MainStyles.smallWhiteStyle]}>{this.props.battleData.firstPlayer.name} </Text>
                </View>
                <View style={BattleStyle.scoreRow}>
                    <View style={[BattleStyle.avatarContainer, {backgroundColor:BaseColours.misc.greyBlue}]}>
                        <Image style={BattleStyle.avatarSize} source={this.generateURL(this.props.battleData.firstPlayer.name)}/>
                    </View>
                    <TouchableHighlight style={{flex:3, height:130}} onPress={()=>{this.showBattlePopup()}}>
                        <View style={[BattleStyle.scoreContainer]}>
                            <View style={[BattleStyle.scoreboard, MainStyles.borderStyle, {backgroundColor: scoreBackground.P1}]}>
                                <Text numberOfLines={1}  style={[MainStyles.textStyle,{fontSize: 32}]}>{this.props.battleData.firstPlayer.points}</Text>
                            </View>
                            <Image style={{flex:1, padding:5, resizeMode:'contain'}} source={this.getVSIcon()}/>
                            <View style={[BattleStyle.scoreboard, MainStyles.borderStyle, {backgroundColor: scoreBackground.P2}]}>
                                <Text numberOfLines={1}  style={[MainStyles.textStyle,{fontSize: 32}]}>{this.props.battleData.secondPlayer.points}</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                    <View style={[BattleStyle.avatarContainer, {backgroundColor:BaseColours.misc.deepRed}]}>
                        <Image style={BattleStyle.avatarSize} source={this.generateURL(this.props.battleData.secondPlayer.name)}/>
                    </View>
                </View>
                <View style={[BattleStyle.playerHeader, MainStyles.borderStyle]}>
                    <Text numberOfLines={1}  style={[BattleStyle.player2Text, MainStyles.smallWhiteStyle]}>{this.props.battleData.secondPlayer.name}</Text>
                    <Icon style={{padding:3}} name={"bookmark"} size={24} color={BaseColours.misc.deepRed}/>
                </View>
            </View>);
    }


    render() {
        return (
            <View>{this.renderBattle()}</View>
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        dimension: state.dimension
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( Battle );