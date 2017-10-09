import React, { Component } from 'react';
import {
    View,
    Button
} from 'react-native';

import TextInput from './../Inputs/TextInput'
import SelectInput from './../Inputs/SelectInput'
import StatusInput from './../Inputs/StatusInput'

import convertArrayToObject from '../../../../Main/functions/convertArrayToObject'

export default class FormInputs extends Component{
    constructor(props) {
        super(props);
        this.state = {
            provincesNames:{},
            status:{},
            searchFormField: {
                "name":{},
                "firstname":{},
                "lastname":{},
                "email":{},
                "province":{},
                "city":{},
                "userType":{}
            }
        };
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.enums!==undefined && nextProps.enums !== this.props.enums) {
            this.setState({provincesNames:convertArrayToObject(nextProps.enums["provincesNames"])});
            let status = this.props.enums["usersTypes"];
            status.push("BANNED");
            this.setState({status: convertArrayToObject(status)});
        }
    }

    componentDidMount(){
        this.setState({provincesNames:convertArrayToObject(this.props.enums["provincesNames"])});
        this.setState({status:convertArrayToObject(this.props.enums["usersTypes"])});
        let status = this.props.enums.usersTypes;
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
                    name = "Name"
                    placeholder = "Jarek123"
                    keys = {["name"]}
                    operation = ":"
                    indexOfSearchFields = "Name"
                    changeSearchForm = {this.changeSearchForm.bind(this)}/>
                <TextInput
                    name = "First name"
                    placeholder = "Jarek"
                    keys = {["firstname"]}
                    operation = ":"
                    indexOfSearchFields = "firstname"
                    changeSearchForm = {this.changeSearchForm.bind(this)}/>
                <TextInput
                    name = "Last name"
                    placeholder = "Kowalski"
                    keys = {["lastname"]}
                    operation = ":"
                    indexOfSearchFields = "lastname"
                    changeSearchForm = {this.changeSearchForm.bind(this)}/>
                <TextInput
                    name = "E-mail"
                    placeholder = "Jarek@gmail.com"
                    keys = {["email"]}
                    operation = ":"
                    indexOfSearchFields = "email"
                    changeSearchForm = {this.changeSearchForm.bind(this)}/>
                <TextInput
                    name = "City"
                    placeholder = "Lublin"
                    keys = {["address", "city"]}
                    operation = ":"
                    indexOfSearchFields = "city"
                    changeSearchForm = {this.changeSearchForm.bind(this)}/>
                <SelectInput
                    name = "Province"
                    keys = {["address", "province","location"]}
                    operation = ":"
                    indexOfSearchFields = "province"
                    options = {this.state.provincesNames}
                    changeSearchForm = {this.changeSearchForm.bind(this)}/>
                <StatusInput
                    options = {this.state.status}
                    changeSearchForm = {this.changeSearchForm.bind(this)}/>
                <Button title="Search"  color='#4b371b' onPress={()=>this.props.search(this.state.searchFormField)}/>
            </View>);
    }
}