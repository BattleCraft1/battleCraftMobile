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
import {checkIfNotNull} from '../../../../Main/functions/checkIfNotNull'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../Redux/actions';

class FormDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            provincesNames:{},
            tournamentsGames:{},
            tournamentStatus:{}
        };
    }

    async componentDidMount() {
        await this.getAllTournamentsEnums();
        this.refs.searchFormData.refs.name.setValue(this.props.formData.name);
        this.refs.searchFormData.refs.city.setValue(this.props.formData.city);
        this.refs.searchFormData.refs.province.setValue(this.props.formData.province);
        this.refs.searchFormData.refs.game.setValue(this.props.formData.game);
        this.refs.searchFormData.refs.maxPlayers.setValue(this.props.formData.maxPlayers.toString());
        this.refs.searchFormData.refs.playersNumber.setValue(this.props.formData.playersNumber.toString());
        this.refs.searchFormData.refs.freeSlots.setValue(this.props.formData.freeSlots.toString());
        this.refs.searchFormData.refs.tournamentStatus.setValue(this.props.formData.tournamentStatus);
        this.refs.searchFormData.refs.dateStart.setValue(this.props.formData.dateStart);
        this.refs.searchFormData.refs.dateEnd.setValue(this.props.formData.dateEnd);
    }

    handleSearchFormChanges(searchFormData){
        this.props.setFormData({
            name: searchFormData.name,
            city: searchFormData.city,
            province: searchFormData.province,
            game: searchFormData.game,
            dateStart: searchFormData.dateStart,
            dateEnd: searchFormData.dateEnd,
            maxPlayers: parseInt(searchFormData.maxPlayers),
            playersNumber: parseInt(searchFormData.playersNumber),
            freeSlots: parseInt(searchFormData.freeSlots),
            tournamentStatus: searchFormData.tournamentStatus,
        });
    }

    submitForm(){
        this.searchTournaments();
        this.props.onClosePanel();
    }

    async getAllTournamentsEnums() {
        this.props.startLoading("Fetching tournaments data...");

        await axios.get(serverName + `get/tournaments/enums`)
            .then(res => {
                this.props.stopLoading();
                this.setState({provincesNames: convertArrayToObject(res.data.provincesNames)});
                this.setState({tournamentsGames: convertArrayToObject(res.data.gamesNames)});
                res.data.tournamentStatus.push("BANNED");
                this.setState({tournamentStatus: convertArrayToObject(res.data.tournamentStatus)});
            })
            .catch(error => {
                this.props.stopLoading();
                this.props.showErrorMessageBox(error);
            });
    }

    searchTournaments(){
        let pageRequest=this.props.pageRequest;
        pageRequest.searchCriteria=[];

        if(this.props.formData.name!==undefined && this.props.formData.name!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["name"],
                    "operation":":",
                    "value":this.props.formData.name
                }
            )}
        if(this.props.formData.dateStart!==undefined && this.props.formData.dateStart!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["dateOfStart"],
                    "operation":">",
                    "value":this.props.formData.dateStart
                }
            )}
        if(this.props.formData.dateEnd!==undefined && this.props.formData.dateEnd!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["dateOfEnd"],
                    "operation":"<",
                    "value":this.props.formData.dateEnd
                }
            )}
        if(this.props.formData.game!==undefined && this.props.formData.game!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["game","name"],
                    "operation":":",
                    "value":this.props.formData.game
                }
            )}
        if(this.props.formData.city!==undefined && this.props.formData.city!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["address", "city"],
                    "operation":":",
                    "value":this.props.formData.city
                }
            )}
        if(this.props.formData.province!==undefined && this.props.formData.province!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["address","province","location"],
                    "operation":":",
                    "value":this.props.formData.province
                }
            )}
        if(this.props.formData.tournamentStatus!==undefined && this.props.formData.tournamentStatus!==""){
            if(this.props.formData.tournamentStatus==='BANNED')
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
                        "value":this.props.formData.tournamentStatus
                    }
                );
        }
        if(!isNaN(this.props.formData.freeSlots) && this.props.formData.freeSlots!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["freeSlots"],
                    "operation":">",
                    "value":parseInt(this.props.formData.freeSlots)
                }
            )}
        if(!isNaN(this.props.formData.maxPlayers) && this.props.formData.maxPlayers!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["maxPlayers"],
                    "operation":"<",
                    "value":parseInt(this.props.formData.maxPlayers)
                }
            )}
        if(!isNaN(this.props.formData.playersNumber) && this.props.formData.playersNumber!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["playersNumber"],
                    "operation":"<",
                    "value":parseInt(this.props.formData.playersNumber)
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
                        onChange={(searchFormData) => this.handleSearchFormChanges(searchFormData)}>
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