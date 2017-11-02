import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight
} from 'react-native';

import Modal from 'react-native-modal';

import MainStyle from '../../../Styles/MainStyles';
import EntityPanelStyle from '../../../Styles/EntityPanelStyle'

import PersonalDataTab from './tabs/PersonalDataTab';
import AddressTab from './tabs/AddressTab';
import PlayerTab from './tabs/PlayerTab';
import OrganizerTab from './tabs/OrganizerTab';

import Navigation from './navigation/Navigation'

import { ActionCreators } from '../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {serverName} from '../../../main/consts/serverName';
import axios from 'axios';

import checkIfObjectIsNotEmpty from '../../../main/functions/checkIfObjectIsNotEmpty'
import compareArrays from "../../../main/functions/compareArrays";
import validateUser from '../validators/UserValidator'

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
                "banned":false
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
            tabsNamesMap:{}
        };
    }

    async componentDidMount() {

        let getEntityOperation = async () => {
            this.props.startLoading("Fetching user...");
            await axios.get(serverName+`get/user?name=`+this.props.name)
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
                });
        };

        await getEntityOperation();

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.hidden === false &&
            this.props.hidden === true &&
            !compareArrays(nextProps.relatedEntity.relatedEntityNames,this.props.relatedEntity.relatedEntityNames)) {
            this.actualizeRelatedEntityObjects(
                nextProps.relatedEntity.relatedEntityType,
                nextProps.relatedEntity.relatedEntityNames)
        }
    }


    actualizeRelatedEntityObjects(relatedEntityType,relatedEntityNames){
        let entity = this.state.entity;
        let relatedEntitiesNames = entity[relatedEntityType].map(entity => entity.name);
        relatedEntityNames.forEach(
            elementName => {
                if(relatedEntitiesNames.indexOf(elementName)===-1){
                    entity[relatedEntityType].push({
                        name:elementName,
                        accepted:false
                    })
                }
            }
        );
        relatedEntitiesNames.forEach(
            elementName => {
                if(relatedEntityNames.indexOf(elementName)===-1){
                    let organizerToDelete = entity[relatedEntityType].find(element => element.name===elementName);
                    entity[relatedEntityType].splice(entity[relatedEntityType].indexOf(organizerToDelete),1);
                }
            }
        );
        this.setState({entity:entity});
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
        return this.state.activeTab === activeTabName?'#E0BA51':'#4b371b';
    }

    createContent(){
        if(this.state.activeTab!=="")
            return React.createElement(
                this.state.tabsMap[this.state.activeTab],
                {
                    width: this.props.dimension.width,
                    height:this.props.dimension.height,
                    orientation:this.props.dimension.orientation,
                    navigate:this.props.navigate,
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
        let entityToSend = JSON.parse(JSON.stringify(this.state.entity));
        delete entityToSend["status"];
        delete entityToSend["points"];
        delete entityToSend["numberOfBattles"];
        delete entityToSend["finishedParticipatedTournaments"];
        delete entityToSend["finishedOrganizedTournaments"];
        delete entityToSend["finishedOrganizedTournaments"];
        delete entityToSend["createdGames"];
        delete entityToSend["banned"];
        let validationErrors = validateUser(entityToSend);
        console.log(validationErrors);
        if(checkIfObjectIsNotEmpty(validationErrors)){
            console.log("output entity:");
            console.log(entityToSend);
            axios.post(serverName+this.props.mode+'/user', entityToSend)
                .then(res => {
                    this.setAccessToTabsByStatus(res.data.status);
                    this.setState({entity:res.data});
                    this.props.showSuccessMessage("User: "+res.data.name+" successfully "+this.props.mode+"ed");
                    this.props.disable();
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
                <TouchableHighlight key="save" style={[EntityPanelStyle.button,{backgroundColor:'#721515' }]} onPress={() => this.sendEntity()}>
                    <Text style={EntityPanelStyle.buttonText}>SAVE</Text>
                </TouchableHighlight>,
                <TouchableHighlight key="close" style={[EntityPanelStyle.button,{backgroundColor:'#721515' }]} onPress={() => this.props.disable()}>
                    <Text style={EntityPanelStyle.buttonText}>CLOSE</Text>
                </TouchableHighlight>
            ]
        }
        else{
            return [
                <TouchableHighlight key="ok" style={[EntityPanelStyle.button,{backgroundColor:'#721515' }]} onPress={() => this.props.disable()}>
                    <Text style={EntityPanelStyle.buttonText}>OK</Text>
                </TouchableHighlight>
            ]
        }
    }

    calculatePanelHeight(){
        return this.props.dimension.orientation === 'portrait'?
            this.props.dimension.height*0.8:this.props.dimension.height*0.7;
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
        dimension: state.dimension
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( Panel );