/**
 * Created by FBegiello on 20.10.2017.
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Button
} from 'react-native';

import SelectInput from '../../inputs/SelectInput'
import SelectNumberInput from '../../inputs/SelectTournamentTypeInput'
import NumberInput from '../../inputs/NumberInput'
import TextInput from '../../inputs/TextInput'
import DateInput from '../../inputs/DateInput'

import NumberOutput from '../../outputs/NumberOutput'
import TextOutput from '../../outputs/TextOutput'

import {serverName} from '../../../../main/consts/serverName';
import axios from 'axios';

import ValidationErrorMessage from '../../outputs/ValidationErrorMessage'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions/index';
import convertArrayToObject from "../../../../main/functions/convertArrayToObject";
import {type} from "../../../../main/consts/tournamentType";

class BasicDataTab extends Component{
    constructor(props) {
        super(props);

        this.state = {
            gameNames:[]
        };
    }

    async componentDidMount(){
        await this.getGameSelectData();
    }

    async getGameSelectData(){
        let getGameOperation = async () => {
            await axios.get(serverName + `get/tournaments/enums`)
                .then(res => {
                    this.setState({tournamentsGames: convertArrayToObject(res.data)});
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

    render(){
        let maxPlayers = this.props.entity["tablesCount"]*this.props.entity["playersOnTableCount"];
        return(
            <View>
                    <View>
                        <View>
                            <ValidationErrorMessage
                                validationErrorMessage={this.props.validationErrors["nameChange"]}/>
                            <ValidationErrorMessage
                                validationErrorMessage={this.props.validationErrors["game"]}/>
                            <ValidationErrorMessage
                                validationErrorMessage={this.props.validationErrors["tablesCount"]}/>
                            <ValidationErrorMessage
                                validationErrorMessage={this.props.validationErrors["playersOnTableCount"]}/>
                            <ValidationErrorMessage
                                validationErrorMessage={this.props.validationErrors["dateOfStart"]}/>
                            <ValidationErrorMessage
                                validationErrorMessage={this.props.validationErrors["dateOfEnd"]}/>
                        </View>
                        <View>
                            <TextInput
                                value={this.props.entity["nameChange"]}
                                fieldName="nameChange"
                                changeEntity={this.props.changeEntity}
                                disabled = {this.props.inputsDisabled}
                                name="Name"/>
                            <TextOutput
                                value={this.props.entity["status"]}
                                name="Tournament status"/>
                            <SelectInput
                                value={this.props.entity["game"]}
                                fieldName="game"
                                changeEntity={this.props.changeEntity}
                                options={this.state.gameNames}
                                disabled = {this.props.inputsDisabled}
                                name="Game"/>

                            <NumberInput
                                value={this.props.entity["tablesCount"]}
                                fieldName="tablesCount"
                                changeEntity={this.props.changeEntity}
                                disabled = {this.props.inputsDisabled}
                                name="Tables count"/>

                            <SelectNumberInput
                                value={this.props.entity["playersOnTableCount"]}
                                fieldName="playersOnTableCount"
                                changeEntity={this.props.changeEntity}
                                options={type}
                                disabled = {this.props.inputsDisabled}
                                name="Type"/>
                            <NumberOutput
                                value={maxPlayers}
                                name="Max players"/>
                            <TextOutput
                                value={this.calculateTournamentType(maxPlayers)}
                                name="Tournament class"/>
                            <DateInput
                                value={this.props.entity["dateOfStart"]}
                                fieldName="dateOfStart"
                                changeEntity={this.props.changeEntity}
                                disabled = {this.props.inputsDisabled}
                                name="Start at"/>
                            <DateInput
                                value={this.props.entity["dateOfEnd"]}
                                fieldName="dateOfEnd"
                                changeEntity={this.props.changeEntity}
                                disabled = {this.props.inputsDisabled}
                                name="Ends at"/>
                        </View>
                    </View>
            </View>
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
