/**
 * Created by FBegiello on 20.10.2017.
 */

import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text
} from 'react-native';

import TextInput from '../../../../entityPanel/inputs/TextInput'
import PasswordInput from '../../../../entityPanel/inputs/PasswordInput'

import ValidationErrorMessage from '../../../../entityPanel/outputs/ValidationErrorMessage'

import EntityPanelStyle from "../../../../../Styles/CollectionPanelStyles/EntityPanelStyle";
import MainStyles from "../../../../../Styles/UniversalStyles/MainStyles";
import InputStyles from "../../../../../Styles/UniversalStyles/InputStyles";

import { ActionCreators } from '../../../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class PersonalDataTab extends Component{

    calculateHeight(){
        return this.props.orientation === 'portrait'?
            this.props.height*0.85-190:this.props.height*0.77-150;
    }

    render(){
        let height = this.calculateHeight();
        let maxPlayers = this.props.entity["tablesCount"]*this.props.entity["playersOnTableCount"];
        return(
            <ScrollView
                style={{height:height}}
                contentContainerStyle={EntityPanelStyle.scrollView}>

                <View style={InputStyles.inputCard}>
                    <View style={InputStyles.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Name:</Text></View>
                    <TextInput
                        value={this.props.entity["nameChange"]}
                        fieldName="nameChange"
                        changeEntity={this.props.changeEntity}
                        disabled = {this.props.inputsDisabled}
                        placeholder = "jarek2123"/>
                    <ValidationErrorMessage
                        validationErrorMessage={this.props.validationErrors["nameChange"]}/>
                </View>

                <View style={InputStyles.inputCard}>
                    <View style={InputStyles.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Password:</Text></View>
                    <PasswordInput
                        value={this.props.entity["password"]}
                        fieldName="password"
                        changeEntity={this.props.changeEntity}
                        disabled = {this.props.inputsDisabled}
                        placeholder = ""/>
                    <ValidationErrorMessage
                        validationErrorMessage={this.props.validationErrors["password"]}/>
                </View>

                <View style={InputStyles.inputCard}>
                    <View style={InputStyles.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Confirm password:</Text></View>
                    <PasswordInput
                        value={this.props.entity["passwordConfirm"]}
                        fieldName="passwordConfirm"
                        changeEntity={this.props.changeEntity}
                        disabled = {this.props.inputsDisabled}
                        placeholder = ""/>
                    <ValidationErrorMessage
                        validationErrorMessage={this.props.validationErrors["passwordConfirm"]}/>
                </View>

                <View style={InputStyles.inputCard}>
                    <View style={InputStyles.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>First name:</Text></View>
                    <TextInput
                        value={this.props.entity["firstname"]}
                        fieldName="firstname"
                        changeEntity={this.props.changeEntity}
                        disabled = {this.props.inputsDisabled}
                        placeholder = "Jarek"/>
                    <ValidationErrorMessage
                        validationErrorMessage={this.props.validationErrors["firstname"]}/>
                </View>

                <View style={InputStyles.inputCard}>
                    <View style={InputStyles.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Surname:</Text></View>
                    <TextInput
                        value={this.props.entity["lastname"]}
                        fieldName="lastname"
                        changeEntity={this.props.changeEntity}
                        disabled = {this.props.inputsDisabled}
                        placeholder = "Kowalski"/>
                    <ValidationErrorMessage
                        validationErrorMessage={this.props.validationErrors["lastname"]}/>
                </View>

                <View style={InputStyles.inputCard}>
                    <View style={InputStyles.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>E-mail:</Text></View>
                    <TextInput
                        value={this.props.entity["email"]}
                        fieldName="email"
                        changeEntity={this.props.changeEntity}
                        disabled = {this.props.inputsDisabled}
                        placeholder = "jarek2123@gmail.com"/>
                    <ValidationErrorMessage
                        validationErrorMessage={this.props.validationErrors["email"]}/>
                </View>

                <View style={InputStyles.inputCard}>
                    <View style={InputStyles.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Phone number (optional):</Text></View>
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