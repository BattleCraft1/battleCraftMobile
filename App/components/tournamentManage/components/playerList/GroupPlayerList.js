import React, { Component } from "react";
import { ListView, Text, TouchableHighlight, Image, View, Button } from "react-native";
import Modal from 'react-native-modal';
import BattleInspectorStyle from 'battleCraftMobile/App/Styles/BattlePanelStyles/BattleInspectorStyle';
import {serverName} from "../../../../main/consts/serverName";
import MainStyles from 'battleCraftMobile/App/Styles/UniversalStyles/MainStyles';

export default class GroupPlayerList extends Component {
    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(['Placeholder']),
        };
    }

    generateURL(username){
        return username !== ""? {uri:`${serverName}/get/user/avatar?username=${username}`}:
            require("battleCraftMobile/img/questionAvatar.png")
    }

    render() {
        console.log("playersWithoutBattles");
        console.log(this.props.playersWithoutBattles);
        return (
            <Modal isVisible={true} backdropOpacity={0.3}>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <ListView
                        horizontal={true}
                        dataSource={this.state.dataSource.cloneWithRows(this.props.playersWithoutBattles)}
                        renderRow={(players) => <TouchableHighlight onPress={()=>this.props.changePlayersData(players)}>
                            <View style={{alignItems:'center',justifyContent:'center',margin:3}}>
                                <View style={BattleInspectorStyle.avatarContainerStyle}>
                                    <Image style={BattleInspectorStyle.avatarInList} source={this.generateURL(players[0])}/>
                                    <Text numberOfLines={1} style={MainStyles.smallWhiteStyle}>
                                        {players[0]===""?"NO NAME":players[0]}
                                    </Text>
                                </View>
                                <View style={BattleInspectorStyle.avatarContainerStyle}>
                                    <Image style={BattleInspectorStyle.avatarInList} source={this.generateURL(players[1])}/>
                                    <Text numberOfLines={1} style={MainStyles.smallWhiteStyle}>
                                        {players[1]===""?"NO NAME":players[1]}
                                    </Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                        }
                        keyExtractor={(players, index) => index}
                    />
                    <View style={MainStyles.buttonsPanelStyle}>
                        <View style={{flex:1}}>
                            <Button title={"Close"} color='#4b371b' onPress={this.props.hideList.bind(this)}/>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}