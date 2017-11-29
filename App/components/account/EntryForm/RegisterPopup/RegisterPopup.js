import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight
} from 'react-native';

import Modal from 'react-native-modal';

import MainStyle from '../../../../Styles/UniversalStyles/MainStyles';
import EntityPanelStyle from '../../../../Styles/CollectionPanelStyles/EntityPanelStyle'

import BasicDataTab from './tabs/PersonalDataTab';
import AddressTab from './tabs/AddressTab';
import ResendMailTab from './tabs/ResendMailTab';

import Navigation from './navigation/Navigation';

import BaseColours from 'battleCraftMobile/App/main/consts/BaseColours'

import { ActionCreators } from '../../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {serverName} from '../../../../main/consts/serverName';
import axios from 'axios';

import checkIfObjectIsNotEmpty from '../../../../main/functions/checkIfObjectIsNotEmpty'
import validateUser from './validator/RegisterValidator'

const tabsMap = {
    "personalData":BasicDataTab,
    "address":AddressTab,
    "resendMail":ResendMailTab
};


const tabsNamesMap = {
    "personalData":"Personal data",
    "address":"Address",
    "resendMail":"Resend Mail"
};

class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab : "personalData",
            entity:{
                "name": "",
                "nameChange": "",
                "email": "",
                "password":"",
                "passwordConfirm":"",
                "firstname": "",
                "lastname": "",
                "phoneNumber": "",
                "province": "lubelskie",
                "city": "",
                "street": "",
                "zipCode": "",
                "description": "",
            },
            validationErrors:{
                "name": "",
                "nameChange": "",
                "email": "",
                "password":"",
                "passwordConfirm":"",
                "firstname": "",
                "lastname": "",
                "phoneNumber": "",
                "province": "",
                "city": "",
                "street": "",
                "zipCode": "",
                "description": ""
            }
        };
    }

    setActiveTab(activeTabName){
        this.setState({activeTab:activeTabName});
    }

    isTabActive(activeTabName){
        return this.state.activeTab === activeTabName?BaseColours.border.bottom:BaseColours.background.darkBrown;
    }

    createContent(){
            return React.createElement(
                tabsMap[this.state.activeTab],
                {
                    width: this.props.dimension.width,
                    height:this.props.dimension.height,
                    orientation:this.props.dimension.orientation,
                    entity:this.state.entity,
                    disable:this.props.disable,
                    changeEntity: this.changeEntity.bind(this),
                    validationErrors: this.state.validationErrors,
                },
                null);
    }

    changeEntity(fieldName,value){
        let entity = this.state.entity;
        entity[fieldName] = value;
        this.setState({entity:entity});
    }

    sendEntity(){
        let entityToSend = JSON.parse(JSON.stringify(this.state.entity));
        console.log("entity");
        console.log(entityToSend);
        entityToSend.name = this.state.entity.nameChange;
        let validationErrors = validateUser(entityToSend);
        if(checkIfObjectIsNotEmpty(validationErrors)){
            console.log("output entity:");
            console.log(entityToSend);
            this.props.startLoading("Registering user...");
            axios.post(serverName+'registration', entityToSend)
                .then(res => {
                    this.props.showSuccessMessage("You are successfully registered. Please check your mail box to verify you account. If you do not have any mail from us please try to rensend mail.");
                    this.props.stopLoading();
                    this.props.disable();
                })
                .catch(error => {
                    this.props.stopLoading();
                    if(error.response.data.fieldErrors===undefined){
                        this.props.showNetworkErrorMessage(error);
                    }
                    else{
                        this.setValidationErrors(error.response.data);
                    }
                });
        }
        else{
            this.setValidationErrors(validationErrors);
        }
    }


    setValidationErrors(validationException){
        this.props.showFailureMessage(validationException.message);
        let validationErrors = validationException.fieldErrors;
        console.log("validation errors:");
        console.log(validationErrors);
        let validationErrorsState = this.state.validationErrors;
        for (let field in validationErrorsState) {
            if (validationErrors.hasOwnProperty(field)) {
                validationErrorsState[field] = validationErrors[field]
            }
            else{
                validationErrorsState[field] = "";
            }
        }
        this.setState({validationErrors:validationErrorsState})
    }

    calculatePanelHeight(){
        return this.props.dimension.orientation === 'portrait'?
            this.props.dimension.height*0.85:this.props.dimension.height*0.77;
    }

    render() {

        return (
            <Modal isVisible={!this.props.hidden} backdropOpacity={0.3}>
                <View style={[EntityPanelStyle.modal,{
                    width: this.props.dimension.width*0.9,
                    height: this.calculatePanelHeight()
                }]}>
                    <View style={[EntityPanelStyle.title,{alignItems:'center'}]}>
                        <Text style={[MainStyle.textStyle,{fontSize: 22}]}>Register</Text>
                    </View>
                    <Navigation
                        orientation={this.props.dimension.orientation}
                        tabsNamesMap={tabsNamesMap}
                        setActiveTab={this.setActiveTab.bind(this)}
                        isTabActive={this.isTabActive.bind(this)}/>
                    <View style={[EntityPanelStyle.formWindow]}>
                        {this.createContent()}
                    </View>
                    <View style={EntityPanelStyle.buttonRow}>
                        <TouchableHighlight key="save" style={[EntityPanelStyle.button,{backgroundColor:BaseColours.misc.deepRed  }]} onPress={() => this.sendEntity()}>
                            <Text style={MainStyle.bigWhiteStyle}>Save</Text>
                        </TouchableHighlight>
                        <TouchableHighlight key="close" style={[EntityPanelStyle.button,{backgroundColor:BaseColours.misc.deepRed  }]} onPress={() => this.props.disable()}>
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

export default connect( mapStateToProps, mapDispatchToProps )( Panel );