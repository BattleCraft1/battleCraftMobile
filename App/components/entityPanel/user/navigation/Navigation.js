import React, { Component } from 'react';
import {
    View,
    TouchableHighlight,
    Text
} from 'react-native';

import EntityPanelStyle from '../../../../Styles/EntityPanelStyle'

export default class Navigation extends Component {

    createNavElements(){
        if(this.props.orientation==='portrait')
            return <View style={EntityPanelStyle.navigation}>
                <View style={EntityPanelStyle.buttonRow}>
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("personalData")}]}
                                        onPress={() => {this.props.setActiveTab("personalData")}}>
                        <Text style={EntityPanelStyle.buttonText}>PERSONAL</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("address")}]}
                                        onPress={() => {this.props.setActiveTab("address")}}>
                        <Text style={EntityPanelStyle.buttonText}>ADDRESS</Text>
                    </TouchableHighlight>
                </View>
                <View style={EntityPanelStyle.buttonRow}>
                    {this.props.tabsNamesMap.hasOwnProperty("organizer") &&
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("organizer")}]}
                                        onPress={() => {this.props.setActiveTab("organizer")}}>
                        <Text style={EntityPanelStyle.buttonText}>ORGANIZER</Text>
                    </TouchableHighlight>}
                    {this.props.tabsNamesMap.hasOwnProperty("player") &&
                     <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("player")}]}
                                        onPress={() => {this.props.setActiveTab("player")}}>
                        <Text style={EntityPanelStyle.buttonText}>PLAYER</Text>
                    </TouchableHighlight>}
                </View>
            </View>;
        else
            return <View style={EntityPanelStyle.navigation}>
                <View style={EntityPanelStyle.buttonRow}>
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("personalData")}]}
                                        onPress={() => {this.props.setActiveTab("personalData")}}>
                        <Text style={EntityPanelStyle.buttonText}>PERSONAL</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("address")}]}
                                        onPress={() => {this.props.setActiveTab("address")}}>
                        <Text style={EntityPanelStyle.buttonText}>ADDRESS</Text>
                    </TouchableHighlight>
                    {this.props.tabsNamesMap.hasOwnProperty("organizer") &&
                     <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("organizer")}]}
                                        onPress={() => {this.props.setActiveTab("organizer")}}>
                        <Text style={EntityPanelStyle.buttonText}>ORGANIZER</Text>
                    </TouchableHighlight>}
                    {this.props.tabsNamesMap.hasOwnProperty("player") &&
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("player")}]}
                                        onPress={() => {this.props.setActiveTab("player")}}>
                        <Text style={EntityPanelStyle.buttonText}>PLAYER</Text>
                    </TouchableHighlight>}
                </View>
            </View>;
    }

    render() {
        return (
            <View>
                {this.createNavElements()}
            </View>
        );
    }
}
