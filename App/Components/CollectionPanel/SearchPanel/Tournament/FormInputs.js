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

    async componentWillReceiveProps(nextProps) {
        if (nextProps.enums!==undefined && nextProps.enums !== this.props.enums) {
            this.setState({provincesNames:convertArrayToObject(this.props.enums["provincesNames"])});
            this.setState({tournamentsGames:convertArrayToObject(this.props.enums["gamesNames"])});
            let status = this.props.enums["tournamentStatus"];
            console.log(status);
            status.push("BANNED");
            this.setState({status: convertArrayToObject(status)});
        }
    }

    componentDidMount(){
        this.setState({provincesNames:convertArrayToObject(this.props.enums["provincesNames"])});
        this.setState({tournamentsGames:convertArrayToObject(this.props.enums["gamesNames"])});
        let status = this.props.enums["tournamentStatus"];
        status.push("BANNED");
        this.setState({status: convertArrayToObject(status)});
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
                name = "Tournament name"
                placeholder = "Tournament 2017"
                keys = {["name"]}
                operation = ":"
                indexOfSearchFields = "name"
                changeSearchForm = {this.changeSearchForm.bind(this)}
            />
            <SelectInput
                name = "Game genre"
                keys = {["game","name"]}
                operation = ":"
                indexOfSearchFields = "game"
                options = {this.state.tournamentsGames}
                changeSearchForm = {this.changeSearchForm.bind(this)}
            />
            <StatusInput
                options = {this.state.status}
                changeSearchForm = {this.changeSearchForm.bind(this)}
            />
            <NumberInput
                name = "Players number"
                keys = {["playersNumber"]}
                operation = "<"
                indexOfSearchFields = "playersNumber"
                changeSearchForm = {this.changeSearchForm.bind(this)}
            />
            <NumberInput
                name = "Max players"
                keys = {["maxPlayers"]}
                operation = "<"
                indexOfSearchFields = "maxPlayers"
                changeSearchForm = {this.changeSearchForm.bind(this)}
            />
            <NumberInput
                name = "Free slots"
                keys = {["freeSlots"]}
                operation = ">"
                indexOfSearchFields = "freeSlots"
                changeSearchForm = {this.changeSearchForm.bind(this)}
            />
            <TextInput
                name = "City"
                placeholder = "Lublin"
                keys = {["address", "city"]}
                operation = ":"
                indexOfSearchFields = "city"
                changeSearchForm = {this.changeSearchForm.bind(this)}
            />
            <SelectInput
                name = "Province"
                keys = {["address", "province","location"]}
                operation = ":"
                indexOfSearchFields = "province"
                options = {this.state.provincesNames}
                changeSearchForm = {this.changeSearchForm.bind(this)}
            />
            <DateInput
                name = "Date from"
                keys = {["dateOfStart"]}
                operation = ">"
                indexOfSearchFields = "dateOfStart"
                changeSearchForm = {this.changeSearchForm.bind(this)}
            />
            <DateInput
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