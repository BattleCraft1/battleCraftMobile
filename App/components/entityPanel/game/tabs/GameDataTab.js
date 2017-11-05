/**
 * Created by FBegiello on 20.10.2017.
 */

import React, { Component } from 'react';
import {
    ScrollView
} from 'react-native';

import GameRulesInput from '../../inputs/GameRulesInput'
import TextInput from '../../inputs/TextInput'

import TextOutput from '../../outputs/TextOutput'
import NumberOutput from '../../outputs/NumberOutput'

import ValidationErrorMessage from '../../outputs/ValidationErrorMessage'

import EntityPanelStyle from "../../../../Styles/EntityPanelStyle";

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
            this.props.height*0.8-145:this.props.height*0.7-115;
    }

    render(){
        let height = this.calculateHeight();
        let maxPlayers = this.props.entity["tablesCount"]*this.props.entity["playersOnTableCount"];
        return(
            <ScrollView
                style={{height:height}}
                contentContainerStyle={EntityPanelStyle.scrollView}>

                <TextInput
                    value={this.props.entity["nameChange"]}
                    fieldName="nameChange"
                    changeEntity={this.props.changeEntity}
                    disabled = {this.props.inputsDisabled}
                    placeholder = "jarek2123"
                    name="Game name:"/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["nameChange"]}/>

                <NumberOutput
                    value={this.props.entity["tournamentsNumber"]}
                    name="Tournaments count:"/>
                <TextOutput
                    value={this.props.entity["status"]}
                    name="Status:"/>
                <TextOutput
                    value={this.props.entity["creatorName"]}
                    name="Creator username:"/>
                <TextOutput
                    value={setDate(this.props.entity["dateOfCreation"])}
                    name="Creation date:"/>

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