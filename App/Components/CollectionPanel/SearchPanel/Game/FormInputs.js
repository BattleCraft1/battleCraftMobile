import React, { Component } from 'react';
import {
    View,
    Button
} from 'react-native';

import TextInput from './../Inputs/TextInput'
import NumberInput from './../Inputs/NumberInput'
import StatusInput from './../Inputs/StatusInput'
import DateInput from './../Inputs/DateInput'

import convertArrayToObject from '../../../../Main/functions/convertArrayToObject'

export default class FormInputs extends Component{
    constructor(props) {
        super(props);
        this.state = {
            status:{},
            searchFormField: {
                "name":{},
                "tournamentsNumber":{},
                "creatorName":{},
                "gameStatus":{}
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.enums!==undefined && nextProps.enums !== this.props.enums) {
            let status = this.props.enums["gamesStatus"];
            if(status!==undefined) {
                status.push("BANNED");
                this.setState({status: convertArrayToObject(status)});
            }
        }
    }

    componentDidMount(){
        let status = this.props.enums["gamesStatus"];
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
                    key="name"
                    name = "Name"
                    placeholder = "Warhammer"
                    keys = {["name"]}
                    operation = ":"
                    indexOfSearchFields = "name"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <NumberInput
                    key="tournamentsNumber"
                    name = "Tournaments number"
                    keys = {["tournamentsNumber"]}
                    operation = "<"
                    indexOfSearchFields = "tournamentsNumber"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <DateInput
                    key="creationDate"
                    name = "Creation date"
                    keys = {["dateOfCreation"]}
                    operation = "<"
                    indexOfSearchFields = "dateOfCreation"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <TextInput
                    key="creatorName"
                    name = "Creator name"
                    placeholder = "Jarek123"
                    keys = {["creatorName"]}
                    operation = ":"
                    indexOfSearchFields = "creatorName"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <StatusInput
                    key="status"
                    options = {this.state.status}
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <Button title="Search"  color='#4b371b' onPress={()=>this.props.search(this.state.searchFormField)}/>
            </View>);
    }
}