/**
 * Created by FBegiello on 17.10.2017.
 */
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
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("basicData")}]}
                                        onPress={() => {this.props.setActiveTab("basicData")}}>
                        <Text style={[MainStyles.smallWhiteStyle, {fontWeight: 'bold'}]}>Base data</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("address")}]}
                                        onPress={() => {this.props.setActiveTab("address")}}>
                        <Text style={[MainStyles.smallWhiteStyle, {fontWeight: 'bold'}]}>Address</Text>
                    </TouchableHighlight>
                </View>
                <View style={EntityPanelStyle.buttonRow}>
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("organizers")}]}
                                        onPress={() => {this.props.setActiveTab("organizers")}}>
                        <Text style={[MainStyles.smallWhiteStyle, {fontWeight: 'bold'}]}>Organisers</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("participants")}]}
                                        onPress={() => {this.props.setActiveTab("participants")}}>
                        <Text style={[MainStyles.smallWhiteStyle, {fontWeight: 'bold'}]}>Participants</Text>
                    </TouchableHighlight>
                </View>
            </View>;
        else
            return <View style={EntityPanelStyle.navigation}>
                <View style={EntityPanelStyle.buttonRow}>
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("basicData")}]}
                                        onPress={() => {this.props.setActiveTab("basicData")}}>
                        <Text style={[MainStyles.smallWhiteStyle, {fontWeight: 'bold'}]}>Base data</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("address")}]}
                                        onPress={() => {this.props.setActiveTab("address")}}>
                        <Text style={[MainStyles.smallWhiteStyle, {fontWeight: 'bold'}]}>Address</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("organizers")}]}
                                        onPress={() => {this.props.setActiveTab("organizers")}}>
                        <Text style={[MainStyles.smallWhiteStyle, {fontWeight: 'bold'}]}>Organisers</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("participants")}]}
                                        onPress={() => {this.props.setActiveTab("participants")}}>
                        <Text style={[MainStyles.smallWhiteStyle, {fontWeight: 'bold'}]}>Participants</Text>
                    </TouchableHighlight>
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