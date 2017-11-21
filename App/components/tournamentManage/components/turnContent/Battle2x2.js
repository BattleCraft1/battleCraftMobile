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
            dataSource: dataSource.cloneWithRows(['Placeholder'])
        };
    }

    getVSIcon(){
        return this.props.battleData.finished?require("battleCraftMobile/img/vsIconFinished.png"):require("battleCraftMobile/img/vsIcon.png");
    }

    renderBattle(dimensions) {
        let scoreBackground;
        if(this.props.battleData.firstPlayersGroup.playersPoints===this.props.battleData.secondPlayersGroup.playersPoints){
            scoreBackground={P1: ListColours.battle.DRAW, P2: ListColours.battle.DRAW};
        }
        else if(this.props.battleData.firstPlayersGroup.playersPoints>this.props.battleData.secondPlayersGroup.playersPoints){
            scoreBackground={P1: ListColours.battle.WIN, P2: ListColours.battle.LOSE};
        }
        else scoreBackground={P1: ListColours.battle.LOSE, P2: ListColours.battle.WIN};

        return (
            <View style={[BattleStyle.battleWindow,{width:this.props.dimension.width*0.95,  maxWidth:600}]}>
                <View style={{flexDirection:'row'}}>
                    <View style={[BattleStyle.playerHeader, MainStyles.borderStyle]}>
                        <Icon style={{padding:3}} name={"bookmark"} size={24} color={BaseColours.misc.greyBlue}/>
                        <Text numberOfLines={1}  style={[BattleStyle.player1Text, MainStyles.smallWhiteStyle]}>
                            {this.props.battleData.firstPlayersGroup.playersNames[0]}</Text>
                    </View>
                    <View style={[BattleStyle.playerHeader, MainStyles.borderStyle]}>
                        <Text numberOfLines={1}  style={[BattleStyle.player2Text, MainStyles.smallWhiteStyle]}>
                            {this.props.battleData.firstPlayersGroup.playersNames[1]}</Text>
                        <Icon style={{padding:3}} name={"bookmark"} size={24} color={BaseColours.misc.greyBlue}/>
                    </View>
                </View>
                <View style={BattleStyle.scoreRow}>
                    <View>
                        <View style={[BattleStyle.avatarContainer, {backgroundColor:BaseColours.misc.greyBlue, height: dimensions.window, width: dimensions.window}]}>
                            <Image style={[BattleStyle.avatarSize, {height: dimensions.avatar, width: dimensions.avatar}]} source={this.generateURL(this.props.battleData.firstPlayersGroup.playersNames[0])}/>
                        </View>
                        <View style={[BattleStyle.avatarContainer, {backgroundColor:BaseColours.misc.deepRed, height: dimensions.window, width: dimensions.window}]}>
                            <Image style={[BattleStyle.avatarSize, {height: dimensions.avatar, width: dimensions.avatar}]} source={this.generateURL(this.props.battleData.secondPlayersGroup.playersNames[0])}/>
                        </View>
                    </View>
                    <TouchableHighlight style={{flex:1, height:240}} onPress={()=>{this.showBattlePopup()}}>
                        <View style={BattleStyle.scoreContainer2x2}>
                            <View style={[BattleStyle.scoreboard, MainStyles.borderStyle, {width: dimensions.scoreSize, height: dimensions.scoreSize, backgroundColor: scoreBackground.P1}]}>
                                <Text numberOfLines={1}  style={[MainStyles.textStyle,{fontSize: dimensions.fontSize}]}>{this.props.battleData.firstPlayersGroup.playersPoints}</Text>
                            </View>
                            <Image style={BattleStyle.iconVS} source={this.getVSIcon()}/>
                            <View style={[BattleStyle.scoreboard, MainStyles.borderStyle, {width: dimensions.scoreSize, height: dimensions.scoreSize, backgroundColor: scoreBackground.P2}]}>
                                <Text numberOfLines={1}  style={[MainStyles.textStyle,{fontSize: dimensions.fontSize}]}>{this.props.battleData.secondPlayersGroup.playersPoints}</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                    <View>
                        <View style={[BattleStyle.avatarContainer, {backgroundColor:BaseColours.misc.greyBlue, height: dimensions.window, width: dimensions.window}]}>
                            <Image style={[BattleStyle.avatarSize, {height: dimensions.avatar, width: dimensions.avatar}]} source={this.generateURL(this.props.battleData.firstPlayersGroup.playersNames[1])}/>
                        </View>
                        <View style={[BattleStyle.avatarContainer, {backgroundColor:BaseColours.misc.deepRed, height: dimensions.window, width: dimensions.window}]}>
                            <Image style={[BattleStyle.avatarSize, {height: dimensions.avatar, width: dimensions.avatar}]} source={this.generateURL(this.props.battleData.secondPlayersGroup.playersNames[1])}/>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection:'row'}}>
                    <View style={[BattleStyle.playerHeader, MainStyles.borderStyle]}>
                        <Icon style={{padding:3}} name={"bookmark"} size={24} color={BaseColours.misc.deepRed}/>
                        <Text numberOfLines={1}  style={[BattleStyle.player1Text, MainStyles.smallWhiteStyle]}>{this.props.battleData.secondPlayersGroup.playersNames[0]}</Text>
                    </View>
                    <View style={[BattleStyle.playerHeader, MainStyles.borderStyle]}>
                        <Text numberOfLines={1}  style={[BattleStyle.player2Text, MainStyles.smallWhiteStyle]}>{this.props.battleData.secondPlayersGroup.playersNames[1]}</Text>
                        <Icon style={{padding:3}} name={"bookmark"} size={24} color={BaseColours.misc.deepRed}/>
                    </View>
                </View>
            </View>);
    }


    render() {
        let dimensions;
        if(this.props.dimension.width>=450) {
            dimensions = {scoreSize: 60, fontSize: 32, window:120, avatar:110};
        }
        else {
            dimensions={scoreSize: 40, fontSize: 26, window:80, avatar:70};
        }
        return (
            <View>{this.renderBattle(dimensions)}</View>
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