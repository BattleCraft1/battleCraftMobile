/**
 * Created by FBegiello on 20.10.2017.
 */

import React, { Component } from 'react';
import {
    ScrollView
} from 'react-native';

import SelectInput from '../../inputs/SelectInput'
import SelectTournamentTypeInput from '../../inputs/SelectTournamentTypeInput'
import NumberInput from '../../inputs/NumberInput'
import TextInput from '../../inputs/TextInput'
import DateInput from '../../inputs/DateInput'

import NumberOutput from '../../outputs/NumberOutput'
import TextOutput from '../../outputs/TextOutput'

import {serverName} from '../../../../main/consts/serverName';
import axios from 'axios';

import ValidationErrorMessage from '../../outputs/ValidationErrorMessage'

import convertArrayToObject from "../../../../main/functions/convertArrayToObjectWithoutEmptyField";
import {type} from "../../../../main/consts/tournamentTypeWithoutEmptyOption";
import EntityPanelStyle from "../../../../Styles/EntityPanelStyle";

import { ActionCreators } from '../../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class BasicDataTab extends Component{
    constructor(props) {
        super(props);

        this.state = {
            gameNames:{}
        };
    }

    async componentDidMount(){
        await this.getGameSelectData();
    }

    async getGameSelectData(){
        let getGameOperation = async () => {
            this.props.startLoading("Fetching games...");
            await axios.get(serverName + `get/tournaments/enums`)
                .then(res => {
                    console.log("games: ");
                    console.log(res.data);
                    this.setState({gameNames: convertArrayToObject(res.data)});
                    this.props.stopLoading();
                })
                .catch(error => {
                    this.props.showNetworkErrorMessage(error,getGameOperation);
                });
        };
        await getGameOperation();
    }

    calculateTournamentType(maxPlayers){
        if(maxPlayers<=8){
            return "Local";
        }
        else if(maxPlayers<=16){
            return "Challenger";
        }
        else
            return "Master";
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
                    placeholder = "Tournament 2017"
                    name="Name:"/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["nameChange"]}/>

                <TextOutput
                    value={this.props.entity["status"]}
                    name="Tournament status:"/>

                <SelectInput
                    value={this.props.entity["game"]}
                    fieldName="game"
                    changeEntity={this.props.changeEntity}
                    options={this.state.gameNames}
                    disabled = {this.props.inputsDisabled}
                    name="Game:"/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["game"]}/>

                <NumberInput
                    value={this.props.entity["tablesCount"]}
                    fieldName="tablesCount"
                    changeEntity={this.props.changeEntity}
                    disabled = {this.props.inputsDisabled}
                    placeholder = "Tables count"
                    name="Tables count:"/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["tablesCount"]}/>

                <SelectTournamentTypeInput
                    value={this.props.entity["playersOnTableCount"]}
                    fieldName="playersOnTableCount"
                    changeEntity={this.props.changeEntity}
                    options={type}
                    disabled = {this.props.inputsDisabled}
                    name="Type:"/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["playersOnTableCount"]}/>

                <NumberOutput
                    value={maxPlayers}
                    name="Max players:"/>
                <TextOutput
                    value={this.calculateTournamentType(maxPlayers)}
                    name="Tournament class:"/>

                <DateInput
                    value={this.props.entity["dateOfStart"]}
                    fieldName="dateOfStart"
                    changeEntity={this.props.changeEntity}
                    disabled = {this.props.inputsDisabled}
                    name="Start at:"/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["dateOfStart"]}/>

                <DateInput
                    value={this.props.entity["dateOfEnd"]}
                    fieldName="dateOfEnd"
                    changeEntity={this.props.changeEntity}
                    disabled = {this.props.inputsDisabled}
                    name="Ends at:"/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["dateOfEnd"]}/>

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

export default connect( mapStateToProps, mapDispatchToProps )( BasicDataTab );