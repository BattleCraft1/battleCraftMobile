/**
 * Created by FBegiello on 17.10.2017.
 */
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
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("basicData")}]}
                                        onPress={() => {this.props.setActiveTab("basicData")}}>
                        <Text style={EntityPanelStyle.buttonText}>BASE DATA</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("address")}]}
                                        onPress={() => {this.props.setActiveTab("address")}}>
                        <Text style={EntityPanelStyle.buttonText}>ADDRESS</Text>
                    </TouchableHighlight>
                </View>
                <View style={EntityPanelStyle.buttonRow}>
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("organizers")}]}
                                        onPress={() => {this.props.setActiveTab("organizers")}}>
                        <Text style={EntityPanelStyle.buttonText}>ORGANIZERS</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("participants")}]}
                                        onPress={() => {this.props.setActiveTab("participants")}}>
                        <Text style={EntityPanelStyle.buttonText}>PARTICIPANTS</Text>
                    </TouchableHighlight>
                </View>
            </View>;
        else
            return <View style={EntityPanelStyle.navigation}>
                <View style={EntityPanelStyle.buttonRow}>
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("basicData")}]}
                                        onPress={() => {this.props.setActiveTab("basicData")}}>
                        <Text style={EntityPanelStyle.buttonText}>BASE DATA</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("address")}]}
                                        onPress={() => {this.props.setActiveTab("address")}}>
                        <Text style={EntityPanelStyle.buttonText}>ADDRESS</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("organizers")}]}
                                        onPress={() => {this.props.setActiveTab("organizers")}}>
                        <Text style={EntityPanelStyle.buttonText}>ORGANIZERS</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("participants")}]}
                                        onPress={() => {this.props.setActiveTab("participants")}}>
                        <Text style={EntityPanelStyle.buttonText}>PARTICIPANTS</Text>
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