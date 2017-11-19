import React, { Component } from 'react';
import {
    View,
    TouchableHighlight,
    Text
} from 'react-native';

import MainStyles from '../../../../Styles/UniversalStyles/MainStyles'
import EntityPanelStyle from '../../../../Styles/CollectionPanelStyles/EntityPanelStyle'

export default class Navigation extends Component {

    createNavElements(){
        if(this.props.orientation==='portrait')
            return <View style={EntityPanelStyle.navigation}>
                <View style={EntityPanelStyle.buttonRow}>
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("personalData")}]}
                                        onPress={() => {this.props.setActiveTab("personalData")}}>
                        <Text style={[MainStyles.smallWhiteStyle, {fontWeight: 'bold'}]}>Personal</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("address")}]}
                                        onPress={() => {this.props.setActiveTab("address")}}>
                        <Text style={[MainStyles.smallWhiteStyle, {fontWeight: 'bold'}]}>Address</Text>
                    </TouchableHighlight>
                </View>
                <View style={EntityPanelStyle.buttonRow}>
                    {this.props.tabsNamesMap.hasOwnProperty("organizer") &&
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("organizer")}]}
                                        onPress={() => {this.props.setActiveTab("organizer")}}>
                        <Text style={[MainStyles.smallWhiteStyle, {fontWeight: 'bold'}]}>Organizer</Text>
                    </TouchableHighlight>}
                    {this.props.tabsNamesMap.hasOwnProperty("player") &&
                     <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("player")}]}
                                        onPress={() => {this.props.setActiveTab("player")}}>
                         <Text style={[MainStyles.smallWhiteStyle, {fontWeight: 'bold'}]}>Player</Text>
                    </TouchableHighlight>}
                </View>
            </View>;
        else
            return <View style={EntityPanelStyle.navigation}>
                <View style={EntityPanelStyle.buttonRow}>
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("personalData")}]}
                                        onPress={() => {this.props.setActiveTab("personalData")}}>
                        <Text style={[MainStyles.smallWhiteStyle, {fontWeight: 'bold'}]}>Personal</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("address")}]}
                                        onPress={() => {this.props.setActiveTab("address")}}>
                        <Text style={[MainStyles.smallWhiteStyle, {fontWeight: 'bold'}]}>Address</Text>
                    </TouchableHighlight>
                    {this.props.tabsNamesMap.hasOwnProperty("organizer") &&
                     <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("organizer")}]}
                                        onPress={() => {this.props.setActiveTab("organizer")}}>
                         <Text style={[MainStyles.smallWhiteStyle, {fontWeight: 'bold'}]}>Organizer</Text>
                    </TouchableHighlight>}
                    {this.props.tabsNamesMap.hasOwnProperty("player") &&
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("player")}]}
                                        onPress={() => {this.props.setActiveTab("player")}}>
                        <Text style={[MainStyles.smallWhiteStyle, {fontWeight: 'bold'}]}>Player</Text>
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
