import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight
} from 'react-native';

import Modal from 'react-native-modal';

import MainStyle from '../../../Styles/UniversalStyles/MainStyles';
import EntityPanelStyle from '../../../Styles/CollectionPanelStyles/EntityPanelStyle'

import PersonalDataTab from './tabs/PersonalDataTab';
import AddressTab from './tabs/AddressTab';
import PlayerTab from './tabs/PlayerTab';
import OrganizerTab from './tabs/OrganizerTab';

import BaseColours from 'battleCraftMobile/App/main/consts/BaseColours'

import Navigation from './navigation/Navigation'

import { ActionCreators } from '../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {serverName} from '../../../main/consts/serverName';
import axios from 'axios';

import checkIfObjectIsNotEmpty from '../../../main/functions/checkIfObjectIsNotEmpty'
import validateUser from '../validators/UserValidator'
import loginUserWithChangedUsername from "../../../main/functions/loginUserWithChangedUsername";
import getDatesDifferenceInDays from "../../../main/functions/getDatesDifferenceInDays";
import {SQLite} from "expo";

const db = SQLite.openDatabase({ name: 'tokens2.db' });

class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab : "",
            entity:{
                "name": "",
                "nameChange": "",
                "email": "",
                "firstname": "",
                "lastname": "",
                "phoneNumber": "",
                "status": "",
                "points": 0,
                "numberOfBattles": 0,
                "participatedTournaments": [],
                "finishedParticipatedTournaments": [],
                "organizedTournaments": [],
                "finishedOrganizedTournaments": [],
                "createdGames":[],
                "banned":false,
                "canCurrentUserEdit":false
            },
            validationErrors:{
                "name": "",
                "nameChange": "",
                "email": "",
                "firstname": "",
                "lastname": "",
                "phoneNumber": "",
                "province": "",
                "city": "",
                "street": "",
                "zipCode": "",
                "description": "",
                "participatedTournaments": "",
                "organizedTournaments": ""
            },
            tabsMap:{},
            tabsNamesMap:{},
            shouldActualizeRelatedEntities:false
        };
    }

    async componentDidMount() {

        let getEntityOperation = async () => {
            this.props.startLoading("Fetching user...");
            await axios.get(serverName+`get/user?name=`+this.props.name,
                {
                    headers: {
                        "X-Auth-Token":this.props.security.token
                    }
                })
                .then(res => {
                    this.setAccessToTabsByStatus(res.data.status);
                    this.setState({entity:res.data});
                    this.setState({activeTab:"personalData"});
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.hidden === false &&
            this.props.hidden === true && nextProps.relatedEntity.operationCanceled === false) {
            this.setState({shouldActualizeRelatedEntities:true});
        }
    }

    setAccessToTabsByStatus(status){
        let tabsMap = {
            "personalData":PersonalDataTab,
            "address":AddressTab,
        };
        let tabsNamesMap = {
            "personalData":"Personal data",
            "address":"Address"
        };
        if(status === "ORGANIZER" || status === "ACCEPTED"){
            tabsMap["player"] = PlayerTab;
            tabsNamesMap["player"] = "Participant data";
        }
        if(status === "ORGANIZER"){
            tabsMap["organizer"] = OrganizerTab;
            tabsNamesMap["organizer"] = "Organizer data";
        }
        this.setState({tabsMap:tabsMap});
        this.setState({tabsNamesMap:tabsNamesMap});
    }

    setActiveTab(activeTabName){
        this.setState({activeTab:activeTabName});
    }

    isTabActive(activeTabName){
        return this.state.activeTab === activeTabName?BaseColours.border.bottom:BaseColours.background.darkBrown;
    }

    shouldActualizeRelatedEntitiesCallBack(){
        this.setState({shouldActualizeRelatedEntities:false});
    }

    createContent(){
        if(this.state.activeTab === "organizer" || this.state.activeTab === "player")
            return React.createElement(
                this.state.tabsMap[this.state.activeTab],
                {
                    shouldActualizeRelatedEntities: this.state.shouldActualizeRelatedEntities,
                    shouldActualizeRelatedEntitiesCallBack: this.shouldActualizeRelatedEntitiesCallBack.bind(this),
                    width: this.props.dimension.width,
                    height:this.props.dimension.height,
                    orientation:this.props.dimension.orientation,
                    navigate:this.props.navigate,
                    entity:this.state.entity,
                    inputsDisabled: this.props.mode === 'get' || !this.state.entity.canCurrentUserEdit,
                    changeEntity: this.changeEntity.bind(this),
                    validationErrors: this.state.validationErrors,
                    relatedEntity: this.props.relatedEntity,
                    hidden: this.props.hidden
                },
                null);
        else if(this.state.activeTab!=="")
            return React.createElement(
                this.state.tabsMap[this.state.activeTab],
                {
                    width: this.props.dimension.width,
                    height:this.props.dimension.height,
                    orientation:this.props.dimension.orientation,
                    entity:this.state.entity,
                    inputsDisabled: this.props.mode === 'get' || !this.state.entity.canCurrentUserEdit,
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
        let entityToSend = JSON.parse(JSON.stringify(this.state.entity));
        delete entityToSend["status"];
        delete entityToSend["points"];
        delete entityToSend["numberOfBattles"];
        delete entityToSend["finishedParticipatedTournaments"];
        delete entityToSend["finishedOrganizedTournaments"];
        delete entityToSend["finishedOrganizedTournaments"];
        delete entityToSend["createdGames"];
        delete entityToSend["banned"];
        delete entityToSend["canCurrentUserEdit"];
        console.log("entity");
        console.log(entityToSend);
        let validationErrors = validateUser(entityToSend);
        if(checkIfObjectIsNotEmpty(validationErrors)){
            console.log("output entity:");
            console.log(entityToSend);
            let sendEntityOperation = () => {
                this.props.startLoading("Sending data...");
                axios.post(serverName + this.props.mode + '/user', entityToSend,
                    {
                        headers: {
                            "X-Auth-Token": this.props.security.token
                        }
                    })
                    .then(res => {
                        this.props.stopLoading();
                        this.setAccessToTabsByStatus(res.data.status);
                        this.setState({entity: res.data});
                        if (res.data.newToken !== "") {
                            this.loginUserWithChangedUsername(res.data.newToken);
                        }
                        this.props.showSuccessMessage("User: " + res.data.name + " successfully " + this.props.mode + "ed");
                        this.props.disable();
                    })
                    .catch(error => {
                        this.props.stopLoading();
                        if (error.response.data.fieldErrors === undefined) {
                            this.props.showNetworkErrorMessage(error,sendEntityOperation);
                        }
                        else {
                            this.setValidationErrors(error.response.data);
                        }
                    });
            }

            sendEntityOperation();
        }
        else{
            let entity = this.state.entity;
            entity.canCurrentUserEdit = true;
            this.setState({entity:entity});
            this.setValidationErrors(validationErrors);
        }
    }

    loginUserWithChangedUsername(token){
        this.props.setTokenAndRole(token,this.props.security.role);
        let date = new Date();
        db.transaction(
            tx => {
                tx.executeSql(
                    'select * from tokens2 where id=1',
                    [],
                    (ts,result) =>{
                        console.log("result array: ");
                        let rows = result.rows._array;
                        console.log(JSON.stringify(rows));
                        if(rows.length !== 0){
                            tx.executeSql(
                                `update tokens2 set token = ? ,date = ? where id = 1;`,
                                [token,date],
                                (ts,success) => console.log(success),
                                (ts,error) => {
                                    console.log("error: ");
                                    console.log(error)
                                }
                            );
                        }
                    },
                    (ts,error)  => {
                        console.log("error: ");
                        console.log(error)
                    }
                );
            }
        );
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
        if(this.props.mode!=='get'  && this.state.entity.canCurrentUserEdit){
            return [
                <TouchableHighlight key="save" style={[EntityPanelStyle.button,{backgroundColor:BaseColours.misc.deepRed  }]} onPress={() =>{this.props.playSound('toggle'); this.sendEntity()}}>
                    <Text style={MainStyle.bigWhiteStyle}>Save</Text>
                </TouchableHighlight>,
                <TouchableHighlight key="close" style={[EntityPanelStyle.button,{backgroundColor:BaseColours.misc.deepRed  }]} onPress={() =>{this.props.playSound('toggle'); this.props.disable()}}>
                    <Text style={MainStyle.bigWhiteStyle}>Close</Text>
                </TouchableHighlight>
            ]
        }
        else{
            return [
                <TouchableHighlight key="ok" style={[EntityPanelStyle.button,{backgroundColor:BaseColours.misc.deepRed  }]} onPress={() =>{this.props.playSound('toggle'); this.props.disable()}}>
                    <Text style={MainStyle.bigWhiteStyle}>Ok</Text>
                </TouchableHighlight>
            ]
        }
    }

    calculatePanelHeight(){
        return this.props.dimension.orientation === 'portrait'?
            this.props.dimension.height*0.80:this.props.dimension.height*0.77;
    }

    render() {
        let content = this.createContent();
        let buttons = this.createButtons();

        return (
            <Modal isVisible={!this.props.hidden} backdropOpacity={0.3}>
                <View style={[EntityPanelStyle.modal,{
                    width: this.props.dimension.width*0.9,
                    height: this.calculatePanelHeight()
                }]}>
                    <View style={[EntityPanelStyle.title,{alignItems:'center'}]}>
                        <Text style={[MainStyle.textStyle,{fontSize: 22}]}>
                            {this.props.mode.charAt(0).toUpperCase()+this.props.mode.slice(1)+" user"}
                        </Text>
                    </View>
                    <Navigation
                        orientation={this.props.dimension.orientation}
                        tabsNamesMap={this.state.tabsNamesMap}
                        setActiveTab={this.setActiveTab.bind(this)}
                        isTabActive={this.isTabActive.bind(this)}/>
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
        dimension: state.dimension,
        security: state.security
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( Panel );