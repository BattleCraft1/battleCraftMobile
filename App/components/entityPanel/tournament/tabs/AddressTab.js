/**
 * Created by FBegiello on 20.10.2017.
 */
import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
} from 'react-native';

import SelectInput from '../../inputs/SelectInput'
import TextInput from '../../inputs/TextInput'
import TextArea from '../../inputs/TextArea'

import ValidationErrorMessage from '../../outputs/ValidationErrorMessage'
import {provinces} from "../../../../main/consts/provincesWithoutEmptyOption";

import EntityPanelStyle from "../../../../Styles/CollectionPanelStyles/EntityPanelStyle";
import MainStyles from "../../../../Styles/UniversalStyles/MainStyles";
import InputStyles from "../../../../Styles/UniversalStyles/InputStyles";

export default class AddressTab extends Component{

    calculateHeight(){
        return this.props.orientation === 'portrait'?
            this.props.height*0.80-190:this.props.height*0.77-150;
    }

    render(){
        let height = this.calculateHeight();
        return(
            <ScrollView
                style={{height:height}}
                contentContainerStyle={EntityPanelStyle.scrollView}>

                <View style={InputStyles.inputCard}>
                    <View style={InputStyles.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Province:</Text></View>
                    <SelectInput
                        value={this.props.entity["province"]}
                        fieldName="province"
                        changeEntity={this.props.changeEntity}
                        options={provinces}
                        disabled = {this.props.inputsDisabled}/>
                    <ValidationErrorMessage
                        validationErrorMessage={this.props.validationErrors["province"]}/>
                </View>

                <View style={InputStyles.inputCard}>
                    <View style={InputStyles.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>City:</Text></View>
                    <TextInput
                        value={this.props.entity["city"]}
                        fieldName="city"
                        changeEntity={this.props.changeEntity}
                        disabled = {this.props.inputsDisabled}
                        placeholder = "Lublin"/>
                    <ValidationErrorMessage
                        validationErrorMessage={this.props.validationErrors["city"]}/>
                </View>

                <View style={InputStyles.inputCard}>
                    <View style={InputStyles.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Street:</Text></View>
                    <TextInput
                        value={this.props.entity["street"]}
                        fieldName="street"
                        changeEntity={this.props.changeEntity}
                        disabled = {this.props.inputsDisabled}
                        placeholder = "Nadbystrzycka"/>
                    <ValidationErrorMessage
                        validationErrorMessage={this.props.validationErrors["street"]}/>
                </View>

                <View style={InputStyles.inputCard}>
                    <View style={InputStyles.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>ZIP code:</Text></View>
                    <TextInput
                        value={this.props.entity["zipCode"]}
                        fieldName="zipCode"
                        changeEntity={this.props.changeEntity}
                        disabled = {this.props.inputsDisabled}
                        placeholder = "12-123"/>
                    <ValidationErrorMessage
                        validationErrorMessage={this.props.validationErrors["zipCode"]}/>
                </View>

                <View style={InputStyles.inputCard}>
                    <View style={InputStyles.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Description (optional):</Text></View>
                    <TextArea
                        value={this.props.entity["description"]}
                        fieldName="description"
                        changeEntity={this.props.changeEntity}
                        disabled = {this.props.inputsDisabled}
                        placeholder = ""/>
                    <ValidationErrorMessage
                        validationErrorMessage={this.props.validationErrors["description"]}/>
                </View>
            </ScrollView>
        );
    }
}

