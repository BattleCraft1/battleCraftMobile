import React, { Component } from 'react';
import {
    View,
    Button
} from 'react-native';

import TextInput from '../inputs/TextInput'
import NumberInput from '../inputs/NumberInput'
import StatusInput from '../inputs/StatusInput'
import DateInput from '../inputs/DateInput'

import {gameStatus} from '../../../../main/consts/status'

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
                    placeholder = "Warhammer"
                    keys = {["name"]}
                    operation = ":"
                    indexOfSearchFields = "name"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <NumberInput
                    key="tournamentsNumber"
                    placeholder = "Tournaments number"
                    name = "Tournaments number:"
                    keys = {["tournamentsNumber"]}
                    operation = "<"
                    indexOfSearchFields = "tournamentsNumber"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <DateInput
                    key="creationDate"
                    name = "Creation date:"
                    keys = {["dateOfCreation"]}
                    operation = "<"
                    indexOfSearchFields = "dateOfCreation"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <TextInput
                    key="creatorName"
                    name = "Creator name:"
                    placeholder = "Jarek123"
                    keys = {["creatorName"]}
                    operation = ":"
                    indexOfSearchFields = "creatorName"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <StatusInput
                    key="status"
                    options = {gameStatus}
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <Button title="Search"  color='#4b371b' onPress={()=>this.props.search(this.state.searchFormField)}/>
            </View>);
    }
}