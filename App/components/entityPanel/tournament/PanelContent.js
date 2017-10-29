import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    ScrollView
} from 'react-native';

import AddStyle from '../../../Styles/AddStyle'
import MainStyles from '../../../Styles/MainStyles'

import BaseForm from './TabsForms/BaseForm';
import AddressForm from './TabsForms/AddressForm';
import UserForm from './TabsForms/UserForms';

import { Form } from 'react-native-form-generator';

export default class PanelContent extends Component {

    constructor(props) {
        super(props);

        this.state={
            formType: "Base info",
            tournamentInfo:{

            }
        }
    }


    setForm(){
        switch (this.state.formType){
            case "Base info":
                return <BaseForm/>;
            case "Address":
                return <AddressForm/>;
            case "Organisers":
                return <UserForm UserType="organiser"/>;
            case "Participants":
                return <UserForm UserType="participant"/>;
            default: return <Text/>;
        }
    }



    render() {
        let formText = this.setForm();
        return (
            <View style={{flex:1}}>
                <View>
                    <View style={AddStyle.buttonRow}>
                        <View style={AddStyle.button}><Button title={"Base info"} color='#4b371b' onPress={() => {this.setState({formType: "Base info"})}}/></View>
                        <View style={AddStyle.button}><Button title={"Address"} color='#4b371b' onPress={() => {this.setState({formType: "Address"})}}/></View>
                    </View>
                    <View style={AddStyle.buttonRow}>
                        <View style={AddStyle.button}><Button title={"Organisers"} color='#4b371b' onPress={() => {this.setState({formType: "Organisers"})}}/></View>
                        <View style={AddStyle.button}><Button title={"Participants"} color='#4b371b' onPress={() => {this.setState({formType: "Participants"})}}/></View>
                    </View>
                </View>

                <View style={AddStyle.formHeader}><Text style={[MainStyles.textStyle,{fontSize: 20}]}>{this.state.formType}</Text></View>
                <View style={[AddStyle.formWindow,{flex:1}]}>
                    {formText}
                </View>
            </View>
        );
    }
}