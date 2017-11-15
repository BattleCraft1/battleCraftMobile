/**
 * Created by FBegiello on 20.10.2017.
 */

import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text
} from 'react-native';

import AvatarInput from '../../inputs/AvatarInput'
import TextInput from '../../inputs/TextInput'

import ValidationErrorMessage from '../../outputs/ValidationErrorMessage'

import EntityPanelStyle from "../../../../Styles/EntityPanelStyle";
import MainStyles from "../../../../Styles/MainStyles";

import { ActionCreators } from '../../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class PersonalDataTab extends Component{
    constructor(props) {
        super(props);

        this.state = {
            gameNames:{}
        };
    }

    calculateHeight(){
        return this.props.orientation === 'portrait'?
            this.props.height*0.8-145:this.props.height*0.7-115;
    }

    render(){
        let height = this.calculateHeight();
        let maxPlayers = this.props.entity["tablesCount"]*this.props.entity["playersOnTableCount"];
        return(
            <ScrollView
                style={{height:height}}
                contentContainerStyle={EntityPanelStyle.scrollView}>
                <View style={{margin:5}}>
                    <AvatarInput
                        disabled = {this.props.inputsDisabled}
                        name={this.props.entity["name"]}/>
                </View>

                <View style={EntityPanelStyle.inputCard}>
                    <View style={EntityPanelStyle.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Name:</Text></View>
                    <TextInput
                        value={this.props.entity["nameChange"]}
                        fieldName="nameChange"
                        changeEntity={this.props.changeEntity}
                        disabled = {this.props.inputsDisabled}
                        placeholder = "jarek2123"/>
                    <ValidationErrorMessage
                        validationErrorMessage={this.props.validationErrors["nameChange"]}/>
                </View>

                <View style={EntityPanelStyle.inputCard}>
                    <View style={EntityPanelStyle.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>First name:</Text></View>
                    <TextInput
                        value={this.props.entity["firstname"]}
                        fieldName="firstname"
                        changeEntity={this.props.changeEntity}
                        disabled = {this.props.inputsDisabled}
                        placeholder = "Jarek"/>
                    <ValidationErrorMessage
                        validationErrorMessage={this.props.validationErrors["firstname"]}/>
                </View>

                <View style={EntityPanelStyle.inputCard}>
                    <View style={EntityPanelStyle.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Surname:</Text></View>
                    <TextInput
                        value={this.props.entity["lastname"]}
                        fieldName="lastname"
                        changeEntity={this.props.changeEntity}
                        disabled = {this.props.inputsDisabled}
                        placeholder = "Kowalski"/>
                    <ValidationErrorMessage
                        validationErrorMessage={this.props.validationErrors["lastname"]}/>
                </View>

                <View style={EntityPanelStyle.inputCard}>
                    <View style={EntityPanelStyle.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>E-mail:</Text></View>
                    <TextInput
                        value={this.props.entity["email"]}
                        fieldName="email"
                        changeEntity={this.props.changeEntity}
                        disabled = {this.props.inputsDisabled}
                        placeholder = "jarek2123@gmail.com"/>
                    <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["email"]}/>
                </View>

                <View style={EntityPanelStyle.inputCard}>
                    <View style={EntityPanelStyle.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Phone number (optional):</Text></View>
                    <TextInput
                        value={this.props.entity["phoneNumber"]}
                        fieldName="phoneNumber"
                        changeEntity={this.props.changeEntity}
                        disabled = {this.props.inputsDisabled}
                        placeholder = "123123123"/>
                    <ValidationErrorMessage
                        validationErrorMessage={this.props.validationErrors["phoneNumber"]}/>
                </View>
            </ScrollView>
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {};
}

export default connect( mapStateToProps, mapDispatchToProps )( PersonalDataTab );