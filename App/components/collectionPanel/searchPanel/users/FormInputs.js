import React, { Component } from 'react';
import {
    View,
    Button
} from 'react-native';

import TextInput from '../inputs/TextInput'
import SelectInput from '../inputs/SelectInput'
import StatusInput from '../inputs/StatusInput'

import convertArrayToObject from '../../../../main/functions/convertArrayToObject'

import {provinces} from "../../../../main/consts/provinces";
import {userStatus} from "../../../../main/consts/status";

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
                    keys = {["name"]}
                    operation = ":"
                    indexOfSearchFields = "Name"
                    changeSearchForm = {this.changeSearchForm.bind(this)}/>
                <TextInput
                    key="firstName"
                    name = "First name:"
                    placeholder = "Jarek"
                    keys = {["firstname"]}
                    operation = ":"
                    indexOfSearchFields = "firstname"
                    changeSearchForm = {this.changeSearchForm.bind(this)}/>
                <TextInput
                    key="lastName"
                    name = "Last name:"
                    placeholder = "Kowalski"
                    keys = {["lastname"]}
                    operation = ":"
                    indexOfSearchFields = "lastname"
                    changeSearchForm = {this.changeSearchForm.bind(this)}/>
                <TextInput
                    key="eMail"
                    name = "E-mail:"
                    placeholder = "Jarek@gmail.com"
                    keys = {["email"]}
                    operation = ":"
                    indexOfSearchFields = "email"
                    changeSearchForm = {this.changeSearchForm.bind(this)}/>
                <TextInput
                    key="city"
                    name = "City:"
                    placeholder = "Lublin"
                    keys = {["address", "city"]}
                    operation = ":"
                    indexOfSearchFields = "city"
                    changeSearchForm = {this.changeSearchForm.bind(this)}/>
                <SelectInput
                    key="province"
                    name = "Province:"
                    keys = {["address", "province"]}
                    operation = ":"
                    indexOfSearchFields = "province"
                    options = {provinces}
                    changeSearchForm = {this.changeSearchForm.bind(this)}/>
                {
                    this.props.entityPanelDisabled &&
                    <StatusInput
                        key="status"
                        options={userStatus}
                        changeSearchForm={this.changeSearchForm.bind(this)}/>
                }
                <Button title="Search"  color='#4b371b' onPress={()=>this.props.search(this.state.searchFormField)}/>
            </View>);
    }
}