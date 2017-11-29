import React, { Component } from 'react';
import {
    View,
    TouchableHighlight,
    Text
} from 'react-native';

import MainStyles from '../../../../../Styles/UniversalStyles/MainStyles'
import EntityPanelStyle from '../../../../../Styles/CollectionPanelStyles/EntityPanelStyle'

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
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("resendMail")}]}
                                        onPress={() => {this.props.setActiveTab("resendMail")}}>
                        <Text style={[MainStyles.smallWhiteStyle, {fontWeight: 'bold'}]}>Resend mail</Text>
                    </TouchableHighlight>
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
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("resendMail")}]}
                                        onPress={() => {this.props.setActiveTab("resendMail")}}>
                        <Text style={[MainStyles.smallWhiteStyle, {fontWeight: 'bold'}]}>Resend mail</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: this.props.isTabActive("resendMail")}]}
                                        onPress={() => {this.props.setActiveTab("resendMail")}}>
                        <Text style={[MainStyles.smallWhiteStyle, {fontWeight: 'bold'}]}>Forgot password</Text>
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
