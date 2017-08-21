import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Switch,
    Button,
} from 'react-native';
import { Form,
    Separator,
    PickerField,
    InputField,
    DatePickerField,
} from 'react-native-form-generator';
import MainStyles from '../../../../Styles/MainStyles'
import {serverName} from '../../../../Main/consts/serverName'
import convertArrayToObject from '../../../../Main/functions/convertArrayToObject'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../Redux/actions';

class FormDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            provincesNames:{},
            tournamentsGames:{}
        };
    }

    componentDidMount(){
        this.getAllProvincesNames();
        this.getAllTournamentGames();
    }

    submitForm(){
        this.searchTournaments();
        this.props.onClosePanel();
    }

    getAllProvincesNames(){
        this.props.startLoading("Fetching provinces data...");
        fetch(serverName+`get/allProvinces/names`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.props.stopLoading();
                this.setState({provincesNames:convertArrayToObject(responseJson)});
            })
            .catch(error => {
                this.props.stopLoading();
                this.props.showErrorMessageBox(error);
            });
    }

    getAllTournamentGames(){
        this.props.startLoading("Fetching games data...");
        fetch(serverName+`get/allGames/names`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.props.stopLoading();
                this.setState({tournamentsGames:convertArrayToObject(responseJson)});
            })
            .catch(error => {
                this.props.stopLoading();
                this.props.showErrorMessageBox(error);
            });
    }

    searchTournaments(){
        let pageRequest=this.props.pageRequest;
        pageRequest.searchCriteria=[];

        console.log(this.name);

        if(this.name.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["name"],
                    "operation":":",
                    "value":this.name.value
                }
            )}
        if(this.dateStart.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["dateOfStart"],
                    "operation":">",
                    "value":this.dateStart.value
                }
            )}
        if(this.dateEnd.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["dateOfStart"],
                    "operation":"<",
                    "value":this.dateEnd.value
                }
            )}
        if(this.game.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["game","name"],
                    "operation":":",
                    "value":this.game.value
                }
            )}
        if(this.city.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["address", "city"],
                    "operation":":",
                    "value":this.city.value
                }
            )}
        if(this.province.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["address", "province","location"],
                    "operation":":",
                    "value":this.province.value
                }
            )}
        if(this.banned.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["banned"],
                    "operation":":",
                    "value":JSON.parse(this.banned.value)
                }
            )}
        if(this.active.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["active"],
                    "operation":":",
                    "value":JSON.parse(this.active.value)
                }
            )}
        if(this.accepted.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["accepted"],
                    "operation":":",
                    "value":JSON.parse(this.accepted.value)
                }
            )}
        if(this.freeSlots.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["freeSlots"],
                    "operation":">",
                    "value":parseInt(this.freeSlots.value)
                }
            )}
        if(this.maxPlayers.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["maxPlayers"],
                    "operation":"<",
                    "value":parseInt(this.maxPlayers.value)
                }
            )}
        if(this.playersNumber.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["playersNumber"],
                    "operation":"<",
                    "value":parseInt(this.playersNumber.value)
                }
            )}

        this.props.setPageRequest(pageRequest);
        this.props.getPageOfData();
    }

    render() {
        return (
            <View style={[MainStyles.contentStyle, MainStyles.centering]}>
                <ScrollView keyboardShouldPersistTaps='always' style={{paddingLeft:10,paddingRight:10}}>
                    <View>
                        <Text style={[MainStyles.textStyle, {fontSize: 26,}]}>Tournament Form</Text>
                    </View>
                    <Form
                        ref='filterTorunament'>
                        <InputField
                            ref={(control) => this.name = control}
                            placeholder='Name'
                        />
                        <InputField
                            ref={(control) => this.city = control}
                            placeholder='City'
                        />
                        <PickerField ref={(control) => this.province = control}
                                     label='Province'
                                     options={this.state.provincesNames}/>
                        <PickerField ref={(control) => this.game = control}
                                     label='Game'
                                     options={this.state.tournamentsGames}/>
                        <DatePickerField ref={(control) => this.dateStart = control}
                                         minimumDate={new Date('1/1/1900')}
                                         maximumDate={new Date()}
                                         label='Start date'
                                         style={{backgroundColor:'#a58e60',}}/>
                        <DatePickerField ref={(control) => this.dateEnd = control}
                                         minimumDate={new Date('1/1/1900')}
                                         maximumDate={new Date()}
                                         label='End date'
                                         style={{backgroundColor:'#a58e60',}}/>
                        <InputField
                            ref={(control) => this.maxPlayers = control}
                            placeholder='Max players'
                        />
                        <InputField
                            ref={(control) => this.playersNumber = control}
                            placeholder='Players number'
                        />
                        <InputField
                            ref={(control) => this.freeSlots = control}
                            placeholder='Free slots'
                        />
                        <PickerField ref={(control) => this.banned = control}
                                     label='Banned'
                                     options={{
                                         "":'',
                                         "yes":'true',
                                         "no":'false'
                                     }}/>
                        <PickerField ref={(control) => this.active = control}
                                     label='Active'
                                     options={{
                                         "":'',
                                         "yes":'true',
                                         "no":'false'
                                     }}/>
                        <PickerField ref={(control) => this.accepted = control}
                                     label='Accepted'
                                     options={{
                                         "":'',
                                         "yes":'true',
                                         "no":'false'
                                     }}/>
                        <Button title="Search"  color='#4b371b' onPress={this.submitForm.bind(this)}/>
                        <Separator/>
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
        pageRequest: state.pageRequest,
        loading: state.loading
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( FormDrawer );