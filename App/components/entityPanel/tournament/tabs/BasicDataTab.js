/**
 * Created by FBegiello on 20.10.2017.
 */

import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text
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

import MainStyles from "../../../../Styles/MainStyles";
import EntityPanelStyle from "../../../../Styles/EntityPanelStyle";

import convertArrayToObject from "../../../../main/functions/convertArrayToObjectWithoutEmptyField";
import {type} from "../../../../main/consts/tournamentTypeWithoutEmptyOption";
import ValidationErrorMessage from '../../outputs/ValidationErrorMessage'

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
            await axios.get(serverName + `get/allGames/names`)
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

                <View style={EntityPanelStyle.inputCard}>
                    <View style={EntityPanelStyle.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Name:</Text></View>
                    <TextInput
                        value={this.props.entity["nameChange"]}
                        fieldName="nameChange"
                        changeEntity={this.props.changeEntity}
                        disabled = {this.props.inputsDisabled}
                        placeholder = "Tournament 2017"/>
                    <ValidationErrorMessage
                        validationErrorMessage={this.props.validationErrors["nameChange"]}/>
                </View>

                <View style={EntityPanelStyle.inputCard}>
                    <View style={EntityPanelStyle.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Tournament status:</Text></View>
                    <TextOutput
                        value={this.props.entity["status"]}/>
                </View>

                <View style={EntityPanelStyle.inputCard}>
                    <View style={EntityPanelStyle.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Game:</Text></View>
                    <SelectInput
                        value={this.props.entity["game"]}
                        fieldName="game"
                        changeEntity={this.props.changeEntity}
                        options={this.state.gameNames}
                        disabled = {this.props.inputsDisabled}/>
                    <ValidationErrorMessage
                        validationErrorMessage={this.props.validationErrors["game"]}/>
                </View>

                <View style={EntityPanelStyle.inputCard}>
                    <View style={EntityPanelStyle.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Tables count:</Text></View>
                    <NumberInput
                        value={this.props.entity["tablesCount"]}
                        fieldName="tablesCount"
                        changeEntity={this.props.changeEntity}
                        disabled = {this.props.inputsDisabled}
                        placeholder = "Tables count"/>
                    <ValidationErrorMessage
                        validationErrorMessage={this.props.validationErrors["tablesCount"]}/>
                </View>

                <View style={EntityPanelStyle.inputCard}>
                    <View style={EntityPanelStyle.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Type:</Text></View>
                    <SelectTournamentTypeInput
                        value={this.props.entity["playersOnTableCount"]}
                        fieldName="playersOnTableCount"
                        changeEntity={this.props.changeEntity}
                        options={type}
                        disabled = {this.props.inputsDisabled}/>
                    <ValidationErrorMessage
                        validationErrorMessage={this.props.validationErrors["playersOnTableCount"]}/>
                </View>

                <View style={EntityPanelStyle.inputCard}>
                    <View style={EntityPanelStyle.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Tours count:</Text></View>
                    <NumberInput
                        value={this.props.entity["toursCount"]}
                        fieldName="toursCount"
                        changeEntity={this.props.changeEntity}
                        disabled = {this.props.inputsDisabled}/>
                    <ValidationErrorMessage
                        validationErrorMessage={this.props.validationErrors["toursCount"]}/>
                </View>

                <View style={EntityPanelStyle.inputCard}>
                    <View style={EntityPanelStyle.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Max players:</Text></View>
                    <NumberOutput
                        value={maxPlayers}/>
                    <View style={EntityPanelStyle.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Tournament class:</Text></View>
                    <TextOutput
                        value={this.calculateTournamentType(maxPlayers)}/>
                </View>

                <View style={EntityPanelStyle.inputCard}>
                    <View style={EntityPanelStyle.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Start at:</Text></View>
                    <DateInput
                        value={this.props.entity["dateOfStart"]}
                        fieldName="dateOfStart"
                        changeEntity={this.props.changeEntity}
                        disabled = {this.props.inputsDisabled}/>
                    <ValidationErrorMessage
                        validationErrorMessage={this.props.validationErrors["dateOfStart"]}/>
                </View>

                <View style={EntityPanelStyle.inputCard}>
                    <View style={EntityPanelStyle.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Ends at:</Text></View>
                    <DateInput
                        value={this.props.entity["dateOfEnd"]}
                        fieldName="dateOfEnd"
                        changeEntity={this.props.changeEntity}
                        disabled = {this.props.inputsDisabled}/>
                    <ValidationErrorMessage
                        validationErrorMessage={this.props.validationErrors["dateOfEnd"]}/>
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

export default connect( mapStateToProps, mapDispatchToProps )( BasicDataTab );