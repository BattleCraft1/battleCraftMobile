import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight
} from 'react-native';

import Modal from 'react-native-modal';

import MainStyle from '../../../Styles/UniversalStyles/MainStyles';
import EntityPanelStyle from '../../../Styles/CollectionPanelStyles/EntityPanelStyle'

import BaseColours from 'battleCraftMobile/App/main/consts/BaseColours'

import GameDataTab from './tabs/GameDataTab'

import { ActionCreators } from '../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {serverName} from '../../../main/consts/serverName';
import axios from 'axios';

import checkIfObjectIsNotEmpty from '../../../main/functions/checkIfObjectIsNotEmpty'
import validateGame from '../validators/GameValidator'

class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entityReady:false,
            entity:{
                "name": "",
                "nameChange":"",
                "creatorName":"",
                "dateOfCreation": new Date(),
                "tournamentsNumber":0,
                "status":"NEW",
                "gameRules":""
            },
            validationErrors:{
                "name": "",
                "nameChange":"",
                "gameRules": ""
            }
        };
    }

    async componentDidMount() {

        if(this.props.mode==='edit' || this.props.mode==='get')
        {
            let getEntityOperation = async () => {
                this.props.startLoading("Fetching game...");
                await axios.get(serverName+`get/game?name=`+this.props.name)
                    .then(res => {
                        this.setState({entity:res.data});
                        this.setState({entityReady:true});
                        this.props.stopLoading();
                        console.log("input entity: ");
                        console.log(res.data);
                    })
                    .catch(error => {
                        this.props.showNetworkErrorMessage(error,getEntityOperation);
                        this.props.stopLoading();
                    });
            };

            await getEntityOperation();
        }
        else {
            this.setState({entityReady:true});
        }

    }

    createContent(){
        if(this.state.entityReady)
            return React.createElement(
                GameDataTab,
                {
                    entity:this.state.entity,
                    inputsDisabled: this.props.mode === 'get',
                    changeEntity: this.changeEntity.bind(this),
                    validationErrors: this.state.validationErrors
                },
                null);
        else
            return <View/>
    }

    changeEntity(fieldName,value){
        let entity = this.state.entity;
        entity[fieldName] = value;
        this.setState({entity:entity});
    }

    sendEntity(){
        if(this.props.mode==='add')
        {
            let entity = this.state.entity;
            entity.name = entity.nameChange;
            this.setState({entity:entity})
        }

        let entityToSend = JSON.parse(JSON.stringify(this.state.entity));

        delete entityToSend["creatorName"];
        delete entityToSend["dateOfCreation"];
        delete entityToSend["tournamentsNumber"];
        delete entityToSend["status"];

        let isEditMode = this.props.mode === 'edit';

        let validationErrors = validateGame(entityToSend,isEditMode);
        if(checkIfObjectIsNotEmpty(validationErrors)){
            let gameRules = entityToSend["gameRules"];
            delete entityToSend["gameRules"];
            console.log("output entity:");
            console.log(entityToSend);
            axios.post(serverName+this.props.mode+'/'+this.props.type, entityToSend)
                .then(res => {
                    let newEntity = res.data;
                    if(gameRules===undefined && isEditMode){
                        this.props.showSuccessMessage("Game: "+newEntity.name+" successfully "+this.props.mode+"ed");
                        this.props.disable();
                    }
                    else
                        this.sendGameRules(res.data,gameRules);
                })
                .catch(error => {
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

    sendGameRules(entity,gameRules){
        let formData = new FormData();
        formData.append('gameRules', { uri: gameRules, name: entity.name+'.pdf',type: 'application/pdf' });

        let url = serverName+`/upload/game/rules?gameName=`+ entity.name;
        fetch(url, {
            method: 'POST',
            body: formData,
            header: {
                'content-type': 'multipart/form-data',
            },
        }).then(res => {
            console.log(res);
            if(res.ok){
                this.props.showSuccessMessage("Game: "+entity.name+" successfully "+this.props.mode+"ed");
                this.props.disable();
            }
            else{
                this.props.showFailureMessage('Upload failed');
            }
        }).catch(error => {
            this.props.showNetworkErrorMessage(error);
        });
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

    createButtons(){
        if(this.props.mode!=='get'){
            return [
                <TouchableHighlight key="save" style={[EntityPanelStyle.button,{backgroundColor: BaseColours.misc.deepRed }]} onPress={() => this.sendEntity()}>
                    <Text style={MainStyle.bigWhiteStyle}>Save</Text>
                </TouchableHighlight>,
                <TouchableHighlight key="close" style={[EntityPanelStyle.button,{backgroundColor: BaseColours.misc.deepRed }]} onPress={() => this.props.disable()}>
                    <Text style={MainStyle.bigWhiteStyle}>Close</Text>
                </TouchableHighlight>
            ]
        }
        else{
            return [
                <TouchableHighlight key="ok" style={[EntityPanelStyle.button,{backgroundColor: BaseColours.misc.deepRed }]} onPress={() => this.props.disable()}>
                    <Text style={MainStyle.bigWhiteStyle}>Ok</Text>
                </TouchableHighlight>
            ]
        }
    }

    calculatePanelHeight(){
        return this.props.dimension.orientation === 'portrait'?
            this.props.dimension.height*0.75:this.props.dimension.height*0.8;
    }

    render() {
        let content = this.createContent();
        let buttons = this.createButtons();

        return (
            <Modal isVisible={!this.props.hidden} backdropOpacity={0.3}>
                <View style={[EntityPanelStyle.modal,{
                    width: this.props.dimension.width*0.9,
                    height: this.calculatePanelHeight()}]}>
                    <View style={[EntityPanelStyle.title,{alignItems:'center'}]}>
                        <Text style={[MainStyle.textStyle,{fontSize: 22}]}>
                            {this.props.mode.charAt(0).toUpperCase()+this.props.mode.slice(1)+" game"}
                        </Text>
                    </View>
                    <View style={[EntityPanelStyle.formWindow]}>
                        {content}
                    </View>
                    <View style={EntityPanelStyle.buttonRow}>
                        {buttons}
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