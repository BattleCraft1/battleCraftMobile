/**
 * Created by FBegiello on 20.10.2017.
 */

import React, { Component } from 'react';
import {
    ScrollView
} from 'react-native';

import AvatarInput from '../../inputs/AvatarInput'
import TextInput from '../../inputs/TextInput'

import ValidationErrorMessage from '../../outputs/ValidationErrorMessage'

import EntityPanelStyle from "../../../../Styles/EntityPanelStyle";

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
                <AvatarInput
                    disabled = {this.props.inputsDisabled}
                    name={this.props.entity["name"]}/>

                <TextInput
                    value={this.props.entity["nameChange"]}
                    fieldName="nameChange"
                    changeEntity={this.props.changeEntity}
                    disabled = {this.props.inputsDisabled}
                    placeholder = "jarek2123"
                    name="Name:"/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["nameChange"]}/>

                <TextInput
                    value={this.props.entity["firstname"]}
                    fieldName="firstname"
                    changeEntity={this.props.changeEntity}
                    disabled = {this.props.inputsDisabled}
                    placeholder = "Jarek"
                    name="First name:"/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["firstname"]}/>

                <TextInput
                    value={this.props.entity["lastname"]}
                    fieldName="lastname"
                    changeEntity={this.props.changeEntity}
                    disabled = {this.props.inputsDisabled}
                    placeholder = "Kowalski"
                    name="Surname:"/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["lastname"]}/>

                <TextInput
                    value={this.props.entity["email"]}
                    fieldName="email"
                    changeEntity={this.props.changeEntity}
                    disabled = {this.props.inputsDisabled}
                    placeholder = "jarek2123@gmail.com"
                    name="E-mail:"/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["email"]}/>

                <TextInput
                    value={this.props.entity["phoneNumber"]}
                    fieldName="phoneNumber"
                    changeEntity={this.props.changeEntity}
                    disabled = {this.props.inputsDisabled}
                    placeholder = "123123123"
                    name="Phone number (optional):"/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["phoneNumber"]}/>
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