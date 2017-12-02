/**
 * Created by FBegiello on 20.10.2017.
 */
import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Button,
    Text
} from 'react-native';

import ValidationErrorMessage from '../../outputs/ValidationErrorMessage'

import MainStyle from '../../../../Styles/UniversalStyles/MainStyles';
import EntityPanelStyle from "../../../../Styles/CollectionPanelStyles/EntityPanelStyle";

import { ActionCreators } from '../../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ParticipantsTable from './table/ParticipantsTable'
import ParticipantsGroupsTable from './table/ParticipantsGroupsTable'

class ParticipantsTab extends Component{

    startInviteParticipants(){
        this.props.setOperations(["Invite"]);
        let invitedParticipantsNames = [];

        for (let i = 0; i < this.props.entity["participants"].length; i++) {
            invitedParticipantsNames.push(this.props.entity["participants"][i][0].name);
        }

        this.props.setRelatedEntity(
            invitedParticipantsNames,
            "participants",
            [{
                "keys": ["status"],
                "operation": ":",
                "value": ["ORGANIZER","ACCEPTED"]
            }, {
                "keys": ["banned"],
                "operation": ":",
                "value": [false]
            }],
            this.props.entity["tablesCount"]*this.props.entity["playersOnTableCount"]);
        this.props.navigate('Users');
    }

    addNewGroupOfParticipants(){
        let participants = this.props.entity["participants"];
        let maxPlayers = this.props.entity["tablesCount"]*this.props.entity["playersOnTableCount"];
        if((participants.length+1)*2>maxPlayers){
            this.props.showFailureMessage("Participants count must be less than "+maxPlayers)
        }
        else{
            participants.push(
                [
                    {
                        "name": undefined,
                        "accepted": false
                    },
                    {
                        "name": undefined,
                        "accepted": false
                    }
                ]
            );
            this.props.changeEntity("participants",participants);
        }
    }

    chooseUserTableByTournamentType(){
        if(this.props.entity["playersOnTableCount"] === 2){
            return <ParticipantsTable
                    shouldActualizeRelatedEntities={this.props.shouldActualizeRelatedEntities}
                    shouldActualizeRelatedEntitiesCallBack={this.props.shouldActualizeRelatedEntitiesCallBack}
                    value={this.props.entity["participants"]}
                    fieldName="participants"
                    disabled = {this.props.inputsDisabled}
                    changeEntity={this.props.changeEntity}
                    relatedEntity={this.props.relatedEntity}
                    hidden={this.props.hidden}/>
        }
        else{
            return <ParticipantsGroupsTable
                    shouldActualizeRelatedEntities={this.props.shouldActualizeRelatedEntities}
                    shouldActualizeRelatedEntitiesCallBack={this.props.shouldActualizeRelatedEntitiesCallBack}
                    navigate={this.props.navigate}
                    value={this.props.entity["participants"]}
                    fieldName="participants"
                    disabled = {this.props.inputsDisabled}
                    changeEntity={this.props.changeEntity}
                    relatedEntity={this.props.relatedEntity}
                    hidden={this.props.hidden}/>

        }
    }

    createButton(){
        if(!this.props.inputsDisabled)
        if(this.props.entity["playersOnTableCount"] === 2){
            return <Button title={"Invite"} color='#4b371b'
                    onPress={()=>this.startInviteParticipants()}/>
        }
        else {
            return  <Button title={"Add group"} color='#4b371b'
                    onPress={()=>this.addNewGroupOfParticipants()}/>
        }
    }

    calculateHeight(inputsDisabled){
        let disabledInputHeight = inputsDisabled?35:0;
        return this.props.orientation === 'portrait'?
            this.props.height*0.80-225+disabledInputHeight
            :
            this.props.height*0.77-185+disabledInputHeight;
    }

    render(){
        let height = this.calculateHeight(this.props.inputsDisabled);
        return(
            <View>
                <ScrollView
                    style={{height:height}}
                    contentContainerStyle={EntityPanelStyle.scrollView}>
                    <ValidationErrorMessage validationErrorMessage={this.props.validationErrors["participants"]}/>
                    <View style={EntityPanelStyle.playerHeader}><Text style={[MainStyle.smallWhiteStyle, {fontWeight:'bold'}]}>Participants</Text></View>
                    {this.chooseUserTableByTournamentType()}
                </ScrollView>
                {this.createButton()}
            </View>
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {};
}

export default connect( mapStateToProps, mapDispatchToProps )( ParticipantsTab );