import React, { Component } from 'react';
import {
    View,
    Button
} from 'react-native';

import TextInput from '../inputs/TextInput'
import SelectInput from '../inputs/SelectInput'
import DateInput from '../inputs/DateInput'
import GameInputForRanking from '../inputs/GameInputForRanking'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';

import convertArrayToObjectWithoutEmptyField from '../../../../main/functions/convertArrayToObjectWithoutEmptyField'
import findGameName from '../../../../main/functions/findGameName'
import {provinces} from "../../../../main/consts/provinces";

import {serverName} from "../../../../main/consts/serverName";
import axios from 'axios'

class FormInputs extends Component{
    constructor(props) {
        super(props);
        this.state = {
            gameName:findGameName(this.props.pageRequest.searchCriteria),
            tournamentsGames:{},
            searchFormField: {
                "name":{},
                "province":{},
                "city":{},
                "game":{},
                "points":{},
                "dateOfStart":{},
                "dateOfEnd":{},
            }
        };
    }

    async componentDidMount(){
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

    setDefaultGameSearchCriteria(){
        this.changeSearchForm(
            "game",
            {
                "keys":["tour","tournament","game","name"],
                "operation":":",
                "value":this.state.gameName
            }
        );
    }

    changeSearchForm(index,value){
        let searchFormFields = this.state.searchFormField;
        searchFormFields[index] = value;
        this.setState({searchFormField:searchFormFields});
    }

    render(){
        return(
            <View>
                <TextInput
                    key="name"
                    name = "Name:"
                    placeholder = "Jarek123"
                    keys = {["players","player","name"]}
                    operation = ":"
                    indexOfSearchFields = "Name"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <TextInput
                    key="city"
                    name = "Tournaments city:"
                    placeholder = "Lublin"
                    keys = {["tour","tournament","address", "city"]}
                    operation = ":"
                    indexOfSearchFields = "city"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <SelectInput
                    key="province"
                    name = "Tournaments province:"
                    keys = {["tour","tournament","address", "province"]}
                    operation = ":"
                    indexOfSearchFields = "province"
                    options = {provinces}
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <GameInputForRanking
                    key="game"
                    name = "Game:"
                    value = {this.state.gameName}
                    keys = {["tour","tournament","game","name"]}
                    operation = ":"
                    indexOfSearchFields = "game"
                    options = {this.state.tournamentsGames}
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <DateInput
                    key="dateFrom"
                    name = "Date from:"
                    keys = {["tour","tournament","dateOfStart"]}
                    operation = ">"
                    indexOfSearchFields = "dateOfStart"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <DateInput
                    key="dateTo"
                    name = "Date to:"
                    keys = {["tour","tournament","dateOfEnd"]}
                    operation = "<"
                    indexOfSearchFields = "dateOfEnd"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <Button title="Search"  color='#4b371b' onPress={()=>this.props.search(this.state.searchFormField)}/>
            </View>);
    }
}



function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        pageRequest: state.pageRequest
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( FormInputs );