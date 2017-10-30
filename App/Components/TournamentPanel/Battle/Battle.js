/*Created by FBegiello on 30.10.2017.*/

import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    Button,
    Image,

} from 'react-native';

import MainStyles from 'battleCraftMobile/App/Styles/MainStyles'
import BattleStyle from 'battleCraftMobile/App/Styles/BattleStyle'

export default class Battle extends Component {


    constructor(props) {
        super(props);
        this.state = {
        };

        let dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(['Placeholder'])
        };
    }


    renderRow(rowData) {
        return (
            <View style={BattleStyle.battleWindow}>
                <View style={[BattleStyle.playerHeader, MainStyles.borderStyle]}>
                    <Text style={[BattleStyle.player1Text, MainStyles.bigWhiteStyle]}>Player 1</Text>
                </View>
                <View style={BattleStyle.scoreRow}>
                    <View>
                        <Image style={BattleStyle.avatarSize} source={require("battleCraftMobile/img/userLogoDef.png")}/>
                    </View>
                    <View style={BattleStyle.scoreContainer}>
                        <Text>Punkty</Text>
                        <Text>20:0</Text>
                    </View>
                    <View>
                        <Image style={BattleStyle.avatarSize} source={require("battleCraftMobile/img/userLogoDef.png")}/>
                    </View>
                </View>
                <View style={[BattleStyle.playerHeader, MainStyles.borderStyle]}>
                    <Text style={[BattleStyle.player2Text, MainStyles.bigWhiteStyle]}>Player 2</Text>
                </View>
            </View>);
    }


    render() {

        return (
        <ListView
                  dataSource={this.state.dataSource.cloneWithRows(this.props.content)}
                  renderRow={this.renderRow}/>

        );
    }
}