/**
 * Created by FBegiello on 20.10.2017.
 */
import React, { Component } from 'react';
import {
    ScrollView
} from 'react-native';

import SelectInput from '../../inputs/SelectInput'
import TextInput from '../../inputs/TextInput'
import TextArea from '../../inputs/TextArea'

import ValidationErrorMessage from '../../outputs/ValidationErrorMessage'
import {provinces} from "../../../../main/consts/provincesWithoutEmptyOption";
import EntityPanelStyle from "../../../../Styles/EntityPanelStyle";

export default class AddressTab extends Component{

    calculateHeight(){
        return this.props.orientation === 'portrait'?
            this.props.height*0.8-145:this.props.height*0.7-115;
    }

    render(){
        let height = this.calculateHeight();
        return(
            <ScrollView
                style={{height:height}}
                contentContainerStyle={EntityPanelStyle.scrollView}>
                <SelectInput
                    value={this.props.entity["province"]}
                    fieldName="province"
                    changeEntity={this.props.changeEntity}
                    options={provinces}
                    disabled = {this.props.inputsDisabled}
                    name="Province:"/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["province"]}/>

                <TextInput
                    value={this.props.entity["city"]}
                    fieldName="city"
                    changeEntity={this.props.changeEntity}
                    disabled = {this.props.inputsDisabled}
                    placeholder = "Lublin"
                    name="City:"/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["city"]}/>

                <TextInput
                    value={this.props.entity["street"]}
                    fieldName="street"
                    changeEntity={this.props.changeEntity}
                    disabled = {this.props.inputsDisabled}
                    placeholder = "Nadbystrzycka"
                    name="Street:"/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["street"]}/>

                <TextInput
                    value={this.props.entity["zipCode"]}
                    fieldName="zipCode"
                    changeEntity={this.props.changeEntity}
                    disabled = {this.props.inputsDisabled}
                    placeholder = "12-123"
                    name="ZIP code:"/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["zipCode"]}/>

                <TextArea
                    value={this.props.entity["description"]}
                    fieldName="description"
                    changeEntity={this.props.changeEntity}
                    disabled = {this.props.inputsDisabled}
                    placeholder = ""
                    name="Description:"/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["description"]}/>
            </ScrollView>
        );
    }
}

