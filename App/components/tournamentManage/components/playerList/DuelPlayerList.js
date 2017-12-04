import React, { Component } from "react";
import { ListView, Text, TouchableHighlight, Image, View, Button } from "react-native";
import Modal from 'react-native-modal';
import BattleInspectorStyle from 'battleCraftMobile/App/Styles/BattlePanelStyles/BattleInspectorStyle';
import {serverName} from "../../../../main/consts/serverName";
import MainStyles from 'battleCraftMobile/App/Styles/UniversalStyles/MainStyles';
import BaseColours from 'battleCraftMobile/App/main/consts/BaseColours';

export default class DuelPlayerList extends Component {
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
                    renderRow={(item) => <TouchableHighlight onPress={()=>{this.props.playSound('toggle');this.props.changePlayerData(item)}}>
                        <View style={{alignItems:'center',justifyContent:'center',margin:3}}>
                            <View style={BattleInspectorStyle.avatarContainerStyle}>
                                <Image style={BattleInspectorStyle.avatarInList} source={this.generateURL(item)}/>
                                <Text numberOfLines={1} style={MainStyles.smallWhiteStyle}>
                                    {item===""?"NO NAME":item}
                                </Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                    }
                    keyExtractor={(item, index) => index}
                />
                    <View style={[BattleInspectorStyle.buttonStyle, MainStyles.borderStyle]}>
                        <View style={{flex:1}}>
                            <Button title={"Close"} color={BaseColours.misc.deepRed} onPress={()=>{this.props.playSound('toggle'); this.props.hideList.bind(this)}}/>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}