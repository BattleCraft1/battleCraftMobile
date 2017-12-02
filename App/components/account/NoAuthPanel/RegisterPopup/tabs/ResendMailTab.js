/**
 * Created by FBegiello on 20.10.2017.
 */

import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableHighlight
} from 'react-native';

import {InputField} from 'react-native-form-generator';

import ValidationErrorMessage from '../../../../entityPanel/outputs/ValidationErrorMessage'

import EntityPanelStyle from "../../../../../Styles/CollectionPanelStyles/EntityPanelStyle";
import MainStyles from "../../../../../Styles/UniversalStyles/MainStyles";
import InputStyles from "../../../../../Styles/UniversalStyles/InputStyles";
import EntityPanelInputsStyles from '../../../../../Styles/CollectionPanelStyles/EntityPanelInputsStyles'

import { ActionCreators } from '../../../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BaseColours from "../../../../../main/consts/BaseColours";

import {serverName} from '../../../../../main/consts/serverName';
import axios from "axios"

class ResendMailTab extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value:"",
            validationError:""
        }
    }

    resendMail(){
        if(this.state.validationError!=="")
        this.setState({validationError:""});

        if(!this.state.value.match(new RegExp("(^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.+[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@+(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$)")))
        {
            this.setState({validationError:"Invalid email"});
            return;
        }

        let resendTokenOperation = () => {
            this.props.startLoading("Resending email...");
            axios.post(serverName + "registration/resendToken", {email: this.state.value})
                .then(res => {
                    this.props.stopLoading();
                    this.props.showSuccessMessage("Verification email resubmitted. Please check your mail box.");
                    this.props.disable();
                })
                .catch(error => {
                    this.props.stopLoading();
                    this.props.showNetworkErrorMessage(error,resendTokenOperation);
                });
        };

        resendTokenOperation()
    }

    calculateHeight(){
        return this.props.orientation === 'portrait'?
            this.props.height*0.85-190:this.props.height*0.77-150;
    }

    render(){
        let height = this.calculateHeight();
        return(
            <ScrollView
                style={{height:height}}
                contentContainerStyle={EntityPanelStyle.scrollView}>

                <View style={InputStyles.inputCard}>
                    <View style={InputStyles.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>E-mail:</Text></View>
                    <View style={EntityPanelInputsStyles.inputStyle}>
                        <Text>E-mail:</Text>
                        <InputField
                            onValueChange={(value)=>{this.setState({value:value})}}
                            value = {this.state.value}
                            placeholder="jarek123@gmail.com"
                        />
                    </View>
                    <ValidationErrorMessage
                        validationErrorMessage={this.state.validationError}/>
                </View>

                <TouchableHighlight style={[EntityPanelStyle.button,{backgroundColor: BaseColours.background.darkBrown}]}
                                    onPress={() => {this.resendMail()}}>
                    <Text style={[MainStyles.smallWhiteStyle, {fontWeight: 'bold'}]}>Resend</Text>
                </TouchableHighlight>

            </ScrollView>
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {};
}

export default connect( mapStateToProps, mapDispatchToProps )( ResendMailTab );