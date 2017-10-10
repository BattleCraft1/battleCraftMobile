import React, { Component } from 'react';
import {
    View,
    Button
} from 'react-native';

import TextInput from './../Inputs/TextInput'
import SelectInput from './../Inputs/SelectInput'
import DateInput from "../Inputs/DateInput";
import NumberInput from "../Inputs/NumberInput";
import StatusInput from "../Inputs/StatusInput";

import convertArrayToObject from '../../../../Main/functions/convertArrayToObject'

export default class FormInputs extends Component{
    constructor(props) {
        super(props);
        this.state = {
            provincesNames:{},
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
                "playersNumber":{}
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.enums!==undefined && nextProps.enums !== this.props.enums) {
            this.setState({provincesNames:convertArrayToObject(this.props.enums["provincesNames"])});
            this.setState({tournamentsGames:convertArrayToObject(this.props.enums["gamesNames"])});
            let status = this.props.enums["tournamentStatus"];
            if(status!==undefined) {
                status.push("BANNED");
                this.setState({status: convertArrayToObject(status)});
            }
        }
    }

    componentDidMount(){
        this.setState({provincesNames:convertArrayToObject(this.props.enums["provincesNames"])});
        this.setState({tournamentsGames:convertArrayToObject(this.props.enums["gamesNames"])});
        let status = this.props.enums["tournamentStatus"];
        if(status!==undefined) {
            status.push("BANNED");
            this.setState({status: convertArrayToObject(status)});
        }
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
                key="tournamentName"
                name = "Tournament name"
                placeholder = "Tournament 2017"
                keys = {["name"]}
                operation = ":"
                indexOfSearchFields = "name"
                changeSearchForm = {this.changeSearchForm.bind(this)}
            />
            <SelectInput
                key="gameGenre"
                name = "Game genre"
                keys = {["game","name"]}
                operation = ":"
                indexOfSearchFields = "game"
                options = {this.state.tournamentsGames}
                changeSearchForm = {this.changeSearchForm.bind(this)}
            />
            <StatusInput
                key="status"
                options = {this.state.status}
                changeSearchForm = {this.changeSearchForm.bind(this)}
            />
            <NumberInput
                key="playerNumber"
                name = "Players number"
                keys = {["playersNumber"]}
                operation = "<"
                indexOfSearchFields = "playersNumber"
                changeSearchForm = {this.changeSearchForm.bind(this)}
            />
            <NumberInput
                key="maxPlayers"
                name = "Max players"
                keys = {["maxPlayers"]}
                operation = "<"
                indexOfSearchFields = "maxPlayers"
                changeSearchForm = {this.changeSearchForm.bind(this)}
            />
            <NumberInput
                key="freeSlots"
                name = "Free slots"
                keys = {["freeSlots"]}
                operation = ">"
                indexOfSearchFields = "freeSlots"
                changeSearchForm = {this.changeSearchForm.bind(this)}
            />
            <TextInput
                key="city"
                name = "City"
                placeholder = "Lublin"
                keys = {["address", "city"]}
                operation = ":"
                indexOfSearchFields = "city"
                changeSearchForm = {this.changeSearchForm.bind(this)}
            />
            <SelectInput
                key="province"
                name = "Province"
                keys = {["address", "province","location"]}
                operation = ":"
                indexOfSearchFields = "province"
                options = {this.state.provincesNames}
                changeSearchForm = {this.changeSearchForm.bind(this)}
            />
            <DateInput
                key="dateFrom"
                name = "Date from"
                keys = {["dateOfStart"]}
                operation = ">"
                indexOfSearchFields = "dateOfStart"
                changeSearchForm = {this.changeSearchForm.bind(this)}
            />
            <DateInput
                key="dateTo"
                name = "Date to"
                keys = {["dateOfEnd"]}
                operation = "<"
                indexOfSearchFields = "dateOfEnd"
                changeSearchForm = {this.changeSearchForm.bind(this)}
            />
            <Button title="Search"  color='#4b371b' onPress={()=>this.props.search(this.state.searchFormField)}/>
        </View>);
    }
}