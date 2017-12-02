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

class ChangePasswordPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword:"",
            password:"",
            passwordConfirm:"",
            validationError:"",
        };
    }

    changePassword(){
        if(this.state.validationError!=="")
            this.setState({validationError:""});

        if(this.state.password.length<8 || this.state.password.length>32)
        {
            this.setState({validationError:"Password should have more than 8 characters and less than 32"});
            return;
        }

        if(this.state.password!==this.state.passwordConfirm){
            this.setState({validationError:"Password confirmation and password are not the same"});
            return;
        }

        this.props.startLoading("Changing password...");
        axios.post(serverName+"auth/change/password",
            {
                oldPassword:this.state.oldPassword,
                password:this.state.password,
                passwordConfirm: this.state.passwordConfirm
            },
            {
                headers: {
                    "X-Auth-Token":this.props.security.token
                }
            })
            .then(res => {
                this.props.stopLoading();
                this.props.showSuccessMessage("Password changed");
                this.props.disable();
            })
            .catch(error => {
                this.props.stopLoading();
                this.props.showNetworkErrorMessage(error);
            });
    }

    calculatePanelHeight(){
        return this.props.dimension.orientation === 'portrait'?
            this.props.dimension.height*0.55:this.props.dimension.height*0.77;
    }

    calculateInnerHeight(){
        return this.props.orientation === 'portrait'?
            this.props.dimension.height*0.5-180:this.props.dimension.height*0.77-160;
    }

    render() {

        return (
            <Modal isVisible={!this.props.hidden} backdropOpacity={0.3}>
                <View style={[EntityPanelStyle.modal,{
                    width: this.props.dimension.width*0.9,
                    height: this.calculatePanelHeight()
                }]}>
                    <View style={[EntityPanelStyle.title,{alignItems:'center'}]}>
                        <Text style={[MainStyle.textStyle,{fontSize: 22}]}>Change password</Text>
                    </View>
                    <View style={[EntityPanelStyle.formWindow]}>
                        <ScrollView
                            contentContainerStyle={EntityPanelStyle.scrollView}>
                            <View style={InputStyles.inputCard}>
                                <ValidationErrorMessage validationErrorMessage={this.state.validationError}/>
                                <View style={EntityPanelInputsStyles.inputStyle}>
                                    <Text>Old password</Text>
                                    <InputField
                                        secureTextEntry={true}
                                        onValueChange={(value)=>{this.setState({oldPassword:value})}}
                                        value = {this.state.oldPassword}
                                    />
                                </View>
                                <View style={EntityPanelInputsStyles.inputStyle}>
                                    <Text>New password</Text>
                                    <InputField
                                        secureTextEntry={true}
                                        onValueChange={(value)=>{this.setState({password:value})}}
                                        value = {this.state.password}
                                    />
                                </View>
                                <View style={EntityPanelInputsStyles.inputStyle}>
                                    <Text>Confirm new password</Text>
                                    <InputField
                                        secureTextEntry={true}
                                        onValueChange={(value)=>{this.setState({passwordConfirm:value})}}
                                        value = {this.state.passwordConfirm}
                                    />
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={EntityPanelStyle.buttonRow}>
                        <TouchableHighlight key="save" style={[EntityPanelStyle.button,{backgroundColor:BaseColours.misc.deepRed  }]} onPress={() => {this.changePassword()}}>
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
        dimension: state.dimension,
        security: state.security
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( ChangePasswordPopup );