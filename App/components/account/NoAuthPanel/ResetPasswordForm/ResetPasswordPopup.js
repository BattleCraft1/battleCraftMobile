import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    ScrollView
} from 'react-native';

import {InputField} from 'react-native-form-generator';

import Modal from 'react-native-modal';

import EntityPanelStyle from "../../../../Styles/CollectionPanelStyles/EntityPanelStyle";
import MainStyle from "../../../../Styles/UniversalStyles/MainStyles";
import InputStyles from "../../../../Styles/UniversalStyles/InputStyles";
import EntityPanelInputsStyles from '../../../../Styles/CollectionPanelStyles/EntityPanelInputsStyles'

import BaseColours from 'battleCraftMobile/App/main/consts/BaseColours'

import ValidationErrorMessage from '../../../entityPanel/outputs/ValidationErrorMessage'

import { ActionCreators } from '../../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {serverName} from '../../../../main/consts/serverName';
import axios from 'axios';

class ResetPasswordPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            validationError:""
        };
    }

    resetPassword(){
        if(this.state.validationError!=="")
            this.setState({validationError:""});

        if(!this.state.email.match(new RegExp("(^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.+[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@+(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$)")))
        {
            this.setState({validationError:"Invalid email"});
            return;
        }

        let resetPasswordOperation = () => {
            this.props.startLoading("Reseting password...");
            axios.post(serverName+"auth/reset/password",{email:this.state.email})
                .then(res => {
                    this.props.stopLoading();
                    this.props.showSuccessMessage("Username and new password were sent to you e-mail address");
                    this.props.disable();
                })
                .catch(error => {
                    this.props.stopLoading();
                    this.props.showNetworkErrorMessage(error,resetPasswordOperation);
                });
        };

        resetPasswordOperation();
    }

    calculatePanelHeight(){
        return this.props.dimension.orientation === 'portrait'?
            this.props.dimension.height*0.5:this.props.dimension.height*0.77;
    }

    calculateInnerHeight(){
        return this.props.orientation === 'portrait'?
            this.props.dimension.height*0.5-200:this.props.dimension.height*0.77-180;
    }

    render() {

        return (
            <Modal isVisible={!this.props.hidden} backdropOpacity={0.3}>
                <View style={[EntityPanelStyle.modal,{
                    width: this.props.dimension.width*0.9,
                    height: this.calculatePanelHeight()
                }]}>
                    <View style={[EntityPanelStyle.title,{alignItems:'center'}]}>
                        <Text style={[MainStyle.textStyle,{fontSize: 22}]}>Reset password</Text>
                    </View>
                    <View style={[EntityPanelStyle.formWindow]}>
                        <ScrollView
                            contentContainerStyle={EntityPanelStyle.scrollView}>
                            <View style={InputStyles.inputCard}>
                                <View style={InputStyles.inputText}><Text style={[MainStyle.smallWhiteStyle, {fontWeight:'bold'}]}>E-mail:</Text></View>
                                <View style={EntityPanelInputsStyles.inputStyle}>
                                    <Text>E-mail:</Text>
                                    <InputField
                                        onValueChange={(value)=>{this.setState({email:value})}}
                                        value = {this.state.email}
                                        placeholder="jarek123@gmail.com"
                                    />
                                </View>
                                <ValidationErrorMessage
                                    validationErrorMessage={this.state.validationError}/>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={EntityPanelStyle.buttonRow}>
                        <TouchableHighlight key="save" style={[EntityPanelStyle.button,{backgroundColor:BaseColours.misc.deepRed  }]} onPress={() => {this.resetPassword()}}>
                            <Text style={MainStyle.bigWhiteStyle}>Save</Text>
                        </TouchableHighlight>
                        <TouchableHighlight key="close" style={[EntityPanelStyle.button,{backgroundColor:BaseColours.misc.deepRed  }]} onPress={() => {this.props.disable()}}>
                            <Text style={MainStyle.bigWhiteStyle}>Close</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        dimension: state.dimension
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( ResetPasswordPopup );