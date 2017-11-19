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

import MainStyles from 'battleCraftMobile/App/Styles/UniversalStyles/MainStyles'
import BattleStyle from 'battleCraftMobile/App/Styles/BattlePanelStyles/BattleStyle'

import BaseColours from "battleCraftMobile/App/main/consts/BaseColours"
import ListColours from "battleCraftMobile/App/main/consts/ListColours"

import { ActionCreators } from '../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Battle extends Component {


    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(['Placeholder']),
        };
    }


    calculateBattleWidth(){
        return this.props.dimension.orientation === 'portrait'?
            this.props.dimension.width*0.95:this.props.dimension.width*0.70;
    }


    renderRow(rowData) {

        let scoreBackground;
        if(rowData.player1.score===rowData.player2.score){
            scoreBackground={P1: ListColours.battle.DRAW, P2: ListColours.battle.DRAW};
        }
        else if(rowData.player1.score>rowData.player2.score){
            scoreBackground={P1: ListColours.battle.WIN, P2: ListColours.battle.LOSE};
        }
        else scoreBackground={P1: ListColours.battle.LOSE, P2: ListColours.battle.WIN};

        return (
            <View key={rowData.table} style={[BattleStyle.battleWindow, {width: this.calculateBattleWidth()}]}>
                <View style={[BattleStyle.playerHeader, MainStyles.borderStyle]}>
                    <Icon style={{padding:3}} name={"bookmark"} size={24} color={BaseColours.misc.greyBlue}/>
                    <Text style={[BattleStyle.player1Text, MainStyles.bigWhiteStyle]}>{rowData.player1.nick} </Text>
                </View>
                <View style={BattleStyle.scoreRow}>
                    <View style={[BattleStyle.avatarContener, {backgroundColor:BaseColours.misc.greyBlue}]}>
                        <Image style={BattleStyle.avatarSize} source={require("battleCraftMobile/img/userLogoDef.png")}/>
                    </View>
                    <TouchableHighlight style={{flex:1}} onPress={()=>{this.props.openInspector('someID')}}>
                        <View style={[BattleStyle.scoreContainer]}>
                            <View style={[BattleStyle.scoreboard, MainStyles.borderStyle, {backgroundColor: scoreBackground.P1}]}>
                                <Text style={[MainStyles.textStyle,{fontSize: 32}]}>{rowData.player1.score}</Text>
                            </View>
                            <Image style={{width:50, height:50}} source={require("battleCraftMobile/img/vsIcon.png")}/>
                            <View style={[BattleStyle.scoreboard, MainStyles.borderStyle, {backgroundColor: scoreBackground.P2}]}>
                                <Text style={[MainStyles.textStyle,{fontSize: 32}]}>{rowData.player2.score}</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                    <View style={[BattleStyle.avatarContener, {backgroundColor:BaseColours.misc.deepRed}]}>
                        <Image style={BattleStyle.avatarSize} source={require("battleCraftMobile/img/userLogoDef.png")}/>
                    </View>
                </View>
                <View style={[BattleStyle.playerHeader, MainStyles.borderStyle]}>
                    <Text style={[BattleStyle.player2Text, MainStyles.bigWhiteStyle]}>{rowData.player2.nick}</Text>
                    <Icon style={{padding:3}} name={"bookmark"} size={24} color={BaseColours.misc.deepRed}/>
                </View>
            </View>);
    }


    render() {
        let elementWidth = this.calculateBattleWidth()
        return (
                 <ListView
                  dataSource={this.state.dataSource.cloneWithRows(this.props.content)}
                  renderHeader={(headerData) => <View style={[BattleStyle.turnHeader]}><Text style={[MainStyles.textStyle, {fontSize:22}]}>Turn {this.props.currentTab}</Text></View>}
                  renderRow={this.renderRow.bind(this)}
                  calculateBattleWidth={this.calculateBattleWidth.bind(this)}/>
        );
    }
}

function mapStateToProps( state ) {
    return {
        dimension: state.dimension
    };
}

export default connect( mapStateToProps)( Battle );