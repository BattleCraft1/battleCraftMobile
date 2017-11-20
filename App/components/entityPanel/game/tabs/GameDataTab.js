/**
 * Created by FBegiello on 20.10.2017.
 */

import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text
} from 'react-native';

import GameRulesInput from '../../inputs/GameRulesInput'
import TextInput from '../../inputs/TextInput'

import TextOutput from '../../outputs/TextOutput'
import NumberOutput from '../../outputs/NumberOutput'

import ValidationErrorMessage from '../../outputs/ValidationErrorMessage'


import MainStyles from "../../../../Styles/UniversalStyles/MainStyles";
import EntityPanelStyle from "../../../../Styles/CollectionPanelStyles/EntityPanelStyle";
import InputStyles from "../../../../Styles/UniversalStyles/InputStyles";

import { ActionCreators } from '../../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import setDate from './../../../../main/functions/setDateFunction'

class GameDataTab extends Component{
    constructor(props) {
        super(props);

        this.state = {
            gameNames:{}
        };
    }

    calculateHeight(){
        return this.props.orientation === 'portrait'?
            this.props.height*0.85-160:this.props.height*0.77-115;
    }

    render(){
        let height = this.calculateHeight();
        let maxPlayers = this.props.entity["tablesCount"]*this.props.entity["playersOnTableCount"];
        return(
            <ScrollView
                style={{height:height}}
                contentContainerStyle={EntityPanelStyle.scrollView}>
                <View style={InputStyles.inputCard}>
                    <View style={InputStyles.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Game name:</Text></View>
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
                    <View style={InputStyles.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Tournaments count:</Text></View>
                    <NumberOutput
                        value={this.props.entity["tournamentsNumber"]}/>
                </View>
                <View style={InputStyles.inputCard}>
                    <View style={InputStyles.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Status:</Text></View>
                    <TextOutput
                        value={this.props.entity["status"]}/>
                </View>
                <View style={InputStyles.inputCard}>
                    <View style={InputStyles.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Creator username:</Text></View>
                    <TextOutput
                        value={this.props.entity["creatorName"]}/>
                </View>
                <View style={InputStyles.inputCard}>
                    <View style={InputStyles.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Creation date:</Text></View>
                    <TextOutput
                        value={setDate(this.props.entity["dateOfCreation"])}/>
                </View>
                {!this.props.inputsDisabled &&
                <GameRulesInput
                    fieldName="gameRules"
                    changeEntity={this.props.changeEntity}
                    value={this.props.entity["gameRules"]}/>}
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["gameRules"]}/>
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

export default connect( mapStateToProps, mapDispatchToProps )( GameDataTab );