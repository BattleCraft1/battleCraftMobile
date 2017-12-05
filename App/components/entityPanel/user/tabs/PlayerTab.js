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

import MainStyles from "../../../../Styles/UniversalStyles/MainStyles";
import EntityPanelStyle from "../../../../Styles/CollectionPanelStyles/EntityPanelStyle";
import InputStyles from "../../../../Styles/UniversalStyles/InputStyles";

import NumberOutput from "../../outputs/NumberOutput";

import { ActionCreators } from '../../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TournamentsTable from './table/ParticipatedTournamentsTable'
import TournamentsTableOutput from './table/ParticipatedTournamentsTableOutput'

class PlayerTab extends Component{

    startAddTournaments(){
        this.props.setOperations(["Invite"]);
        this.props.setRelatedEntity(
            this.props.entity["participatedTournaments"].map(entity => {
                return{
                    name: entity.name,
                    playersOnTableCount: entity.playersOnTableCount
                }
            }),
            "participatedTournaments",
            [{
                "keys": ["status"],
                "operation": ":",
                "value": ["NEW","ACCEPTED"]
            },{
                "keys": ["banned"],
                "operation": ":",
                "value": [false]
            }],
            Number.POSITIVE_INFINITY);
        this.props.navigate('Tournaments');
    }

    startInviteSecondPlayerToGroup(tournamentName){
        this.props.setOperations(["Invite"]);
        this.props.setRelatedEntity(
            [],
            "secondPlayerFor"+tournamentName,
            [
                {
                    "keys": ["status"],
                    "operation": ":",
                    "value": ["ACCEPTED","ORGANIZER"]
                },
                {
                "keys": ["banned"],
                "operation": ":",
                "value": [false]
                },
                {
                    "keys": ["name"],
                    "operation": "not in",
                    "value": [this.props.entity['name'],""]
                },
                {
                    "keys": ["name"],
                    "operation": "not participate",
                    "value": [tournamentName]
                }
            ],
            1);
        this.props.navigate('Users');
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

                    <View style={InputStyles.inputCard}>
                        <View style={EntityPanelStyle.playerHeader}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Participated tournaments</Text></View>
                    <ValidationErrorMessage validationErrorMessage={this.props.validationErrors["participatedTournaments"]}/>
                        <TournamentsTable
                            shouldActualizeRelatedEntities={this.props.shouldActualizeRelatedEntities}
                            shouldActualizeRelatedEntitiesCallBack={this.props.shouldActualizeRelatedEntitiesCallBack}
                            inviteSecondPlayer={this.startInviteSecondPlayerToGroup.bind(this)}
                            relatedEntity={this.props.relatedEntity}
                            hidden={this.props.hidden}
                            value={this.props.entity["participatedTournaments"]}
                            fieldName="participatedTournaments"
                            disabled = {this.props.inputsDisabled}
                            changeEntity={this.props.changeEntity}/>
                    </View>

                    <View style={InputStyles.inputCard}>
                        <View style={InputStyles.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Points:</Text></View>
                        <NumberOutput
                            value={this.props.entity["points"]}/>
                    </View>

                    <View style={InputStyles.inputCard}>
                        <View style={InputStyles.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Battles Count:</Text></View>
                        <NumberOutput
                            value={this.props.entity["numberOfBattles"]}/>
                    </View>

                    <View style={InputStyles.inputCard}>
                        <View style={EntityPanelStyle.playerHeader}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Finished tournaments</Text></View>
                        <TournamentsTableOutput
                            value={this.props.entity["finishedParticipatedTournaments"]}
                        />
                    </View>
                </ScrollView>
                {!this.props.inputsDisabled &&
                <Button title={"ADD TOURNAMENT"} color='#4b371b'
                        onPress={()=>this.startAddTournaments()}/>}
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

export default connect( mapStateToProps, mapDispatchToProps )( PlayerTab );