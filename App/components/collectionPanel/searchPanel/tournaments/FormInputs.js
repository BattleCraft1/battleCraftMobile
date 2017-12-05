import React, { Component } from 'react';
import {
    View,
    Button
} from 'react-native';

import TextInput from '../inputs/TextInput'
import SelectInput from '../inputs/SelectInput'
import DateInput from "../inputs/DateInput";
import NumberInput from "../inputs/NumberInput";
import StatusInput from "../inputs/StatusInput";
import SelectTournamentTypeInput from "../inputs/SelectTournamentTypeInput";

import {provinces} from "../../../../main/consts/provinces";
import {type} from "../../../../main/consts/tournamentType";
import {tournamentStatus} from "../../../../main/consts/status";

import {serverName} from "../../../../main/consts/serverName";
import axios from 'axios'

import convertArrayToObject from '../../../../main/functions/convertArrayToObject'

class FormInputs extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tournamentsGames:{},
            status:{},
            searchFormField: {
                "name":{},
                "dateOfStart":{},
                "dateOfEnd":{},
                "game":{},
                "city":{},
                "province":{},
                "status":{},
                "freeSlots":{},
                "maxPlayers":{},
                "playersNumber":{},
                "playersOnTableCount":{}
            }
        };
    }

    async componentDidMount() {
        let getGameOperation = async () => {
            this.props.startLoading("Fetching games...");
            await axios.get(serverName + `get/allGames/names`,
                {
                    headers: {
                        "X-Auth-Token":this.props.security.token
                    }
                })
                .then(res => {
                    this.props.stopLoading();
                    this.setState({tournamentsGames: convertArrayToObject(res.data)});
                })
                .catch(error => {
                    this.props.stopLoading();
                    this.props.showNetworkErrorMessage(error,getGameOperation);
                });
        };
        await getGameOperation();
    }

    changeSearchForm(index,value){
        let searchFormFields = this.state.searchFormField;
        searchFormFields[index] = value;
        this.setState({searchFormField:searchFormFields});
    }

    getTournamentStatus(){
        let tournamentStat = tournamentStatus;
        if(this.props.security.role==="ROLE_ADMIN"){
            tournamentStat["BANNED"] = "BANNED";
        }
        return tournamentStat;
    }

    render(){
        return(
        <View>
            <TextInput
                key="tournamentName"
                name = "Tournament name:"
                placeholder = "Tournament 2017"
                keys = {["name"]}
                operation = ":"
                indexOfSearchFields = "name"
                changeSearchForm = {this.changeSearchForm.bind(this)}
            />
            <SelectInput
                key="gameGenre"
                name = "Game genre:"
                keys = {["game","name"]}
                operation = ":"
                indexOfSearchFields = "game"
                options = {this.state.tournamentsGames}
                changeSearchForm = {this.changeSearchForm.bind(this)}
            />
            {
                this.props.entityPanelDisabled &&
                <StatusInput
                    key="status"
                    options={this.getTournamentStatus()}
                    changeSearchForm={this.changeSearchForm.bind(this)}
                />
            }
            <NumberInput
                key="playerNumber"
                placeholder = "Players number"
                name = "Players number:"
                keys = {["playersNumber"]}
                operation = "<"
                indexOfSearchFields = "playersNumber"
                changeSearchForm = {this.changeSearchForm.bind(this)}
            />
            <NumberInput
                key="maxPlayers"
                placeholder = "Max players"
                name = "Max players:"
                keys = {["maxPlayers"]}
                operation = "<"
                indexOfSearchFields = "maxPlayers"
                changeSearchForm = {this.changeSearchForm.bind(this)}
            />
            <NumberInput
                key="freeSlots"
                placeholder = "Free slots"
                name = "Free slots:"
                keys = {["freeSlots"]}
                operation = ">"
                indexOfSearchFields = "freeSlots"
                changeSearchForm = {this.changeSearchForm.bind(this)}
            />
            <SelectTournamentTypeInput
                key="tournamentType"
                name = "Tournament type:"
                keys = {["playersOnTableCount"]}
                operation = ":"
                indexOfSearchFields = "playersOnTableCount"
                options = {type}
                changeSearchForm = {this.changeSearchForm.bind(this)}
            />
            <TextInput
                key="city"
                name = "City:"
                placeholder = "Lublin"
                keys = {["address", "city"]}
                operation = ":"
                indexOfSearchFields = "city"
                changeSearchForm = {this.changeSearchForm.bind(this)}
            />
            <SelectInput
                key="province"
                name = "Province:"
                keys = {["address", "province"]}
                operation = ":"
                indexOfSearchFields = "province"
                options = {provinces}
                changeSearchForm = {this.changeSearchForm.bind(this)}
            />
            <DateInput
                key="dateFrom"
                name = "Date from:"
                keys = {["dateOfStart"]}
                operation = ">"
                indexOfSearchFields = "dateOfStart"
                changeSearchForm = {this.changeSearchForm.bind(this)}
            />
            <DateInput
                key="dateTo"
                name = "Date to:"
                keys = {["dateOfEnd"]}
                operation = "<"
                indexOfSearchFields = "dateOfEnd"
                changeSearchForm = {this.changeSearchForm.bind(this)}
            />
            <Button title="Search"  color='#4b371b' onPress={()=>this.props.search(this.state.searchFormField)}/>
        </View>);
    }
}