import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Button,
} from 'react-native';
import { Form,
    InputField,
    PickerField,
    DatePickerField,
} from 'react-native-form-generator';
import MainStyles from '../../../../Styles/MainStyles'
import {serverName} from '../../../../Main/consts/serverName'
import convertArrayToObject from '../../../../Main/functions/convertArrayToObject'
import axios from 'axios';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../Redux/actions';

class FormDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            provincesNames:{},
            tournamentsGames:{},
            tournamentStatus:{},
            searchFormData:{}
        };
    }

    componentDidMount(){
        this.getAllTournamentsEnums();
    }

    submitForm(){
        this.searchTournaments();
        this.props.onClosePanel();
    }

    getAllTournamentsEnums(){
        this.props.startLoading("Fetching tournaments data...");

        axios.get(serverName+`get/tournaments/enums`)
            .then(res => {
                this.props.stopLoading();
                this.setState({provincesNames:convertArrayToObject(res.data.provincesNames)});
                this.setState({tournamentsGames:convertArrayToObject(res.data.gamesNames)});
                res.data.tournamentStatus.push("BANNED");
                this.setState({tournamentStatus:convertArrayToObject(res.data.tournamentStatus)});
            })
            .catch(error => {
                this.props.stopLoading();
                this.props.showErrorMessageBox(error);
            });
    }

    searchTournaments(){
        let pageRequest=this.props.pageRequest;
        pageRequest.searchCriteria=[];

        if(this.state.searchFormData.name!==undefined && this.state.searchFormData.name!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["name"],
                    "operation":":",
                    "value":this.state.searchFormData.name
                }
            )}
        if(this.state.searchFormData.dateStart!==undefined && this.state.searchFormData.dateStart!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["dateOfStart"],
                    "operation":">",
                    "value":this.state.searchFormData.dateStart
                }
            )}
        if(this.state.searchFormData.dateEnd!==undefined && this.state.searchFormData.dateEnd!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["dateOfEnd"],
                    "operation":"<",
                    "value":this.state.searchFormData.dateEnd
                }
            )}
        if(this.state.searchFormData.game!==undefined && this.state.searchFormData.game!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["game","name"],
                    "operation":":",
                    "value":this.state.searchFormData.game
                }
            )}
        if(this.state.searchFormData.city!==undefined && this.state.searchFormData.city!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["address", "city"],
                    "operation":":",
                    "value":this.state.searchFormData.city
                }
            )}
        if(this.state.searchFormData.province!==undefined && this.state.searchFormData.province!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["address","province","location"],
                    "operation":":",
                    "value":this.state.searchFormData.province
                }
            )}
        if(this.state.searchFormData.tournamentStatus!==undefined && this.state.searchFormData.tournamentStatus!==""){
            if(this.state.searchFormData.tournamentStatus==='BANNED')
                pageRequest.searchCriteria.push(
                    {
                        "keys":["banned"],
                        "operation":":",
                        "value":true
                    }
                );
            else
                pageRequest.searchCriteria.push(
                    {
                        "keys":["tournamentStatus"],
                        "operation":":",
                        "value":this.state.searchFormData.tournamentStatus
                    }
                );
        }
        if(!isNaN(this.state.searchFormData.freeSlots) && this.state.searchFormData.freeSlots!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["freeSlots"],
                    "operation":">",
                    "value":parseInt(this.state.searchFormData.freeSlots)
                }
            )}
        if(!isNaN(this.state.searchFormData.maxPlayers) && this.state.searchFormData.maxPlayers!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["maxPlayers"],
                    "operation":"<",
                    "value":parseInt(this.state.searchFormData.maxPlayers)
                }
            )}
        if(!isNaN(this.state.searchFormData.playersNumber) && this.state.searchFormData.playersNumber!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["playersNumber"],
                    "operation":"<",
                    "value":parseInt(this.state.searchFormData.playersNumber)
                }
            )}
            console.log(pageRequest);
        this.props.setPageRequest(pageRequest);
        this.props.getPageOfData();
    }

    render() {
        return (
            <View style={[MainStyles.contentStyle, MainStyles.centering]}>
                <ScrollView keyboardShouldPersistTaps='always' style={{paddingLeft:10,paddingRight:10}}>
                    <View>
                        <Text style={[MainStyles.textStyle, {fontSize: 26,}]}>Search Tournaments</Text>
                    </View>
                    <Form
                        ref='searchFormData'
                        onChange={(searchFormData) => this.setState({searchFormData:searchFormData})}>
                        <InputField
                            ref="name"
                            placeholder='Name'
                        />
                        <InputField
                            ref="city"
                            placeholder='City'
                        />
                        <PickerField
                            ref="province"
                                    label='Province'
                                     options={this.state.provincesNames}/>
                        <PickerField
                            ref="game"
                            label='Game'
                                     options={this.state.tournamentsGames}/>
                        <DatePickerField
                            ref="dateStart"
                            minimumDate={new Date('1/1/1900')}
                                         maximumDate={new Date()}
                                         placeholder='Start date'
                                         style={{backgroundColor:'#a58e60',}}/>
                        <DatePickerField
                            ref="dateEnd"
                            minimumDate={new Date('1/1/1900')}
                                         maximumDate={new Date()}
                            placeholder='End date'
                                         style={{backgroundColor:'#a58e60',}}/>
                        <InputField
                            ref="maxPlayers"
                            keyboardType = 'numeric'
                            placeholder='Max players'
                        />
                        <InputField
                            ref="playersNumber"
                            keyboardType = 'numeric'
                            placeholder='Players number'
                        />
                        <InputField
                            ref="freeSlots"
                            keyboardType = 'numeric'
                            placeholder='Free slots'
                        />
                        <PickerField
                            ref="tournamentStatus"
                            label='Tournament status'
                                     options={this.state.tournamentStatus}/>
                        <Button title="Search"  color='#4b371b' onPress={this.submitForm.bind(this)}/>
                    </Form>
                </ScrollView>
            </View>
        );
    }
}


function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        page: state.page,
        message: state.message,
        pageRequest: state.pageRequest,
        loading: state.loading
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( FormDrawer );