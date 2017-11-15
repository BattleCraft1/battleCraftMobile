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

import MainStyle from "../../../../Styles/MainStyles";
import EntityPanelStyle from "../../../../Styles/EntityPanelStyle";

import { ActionCreators } from '../../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TournamentsTable from './table/OrganizedTournamentsTable'
import TournamentsTableOutput from './table/OrganizedTournamentsTableOutput'

class OrganizerTab extends Component{

    startAddTournaments(){
        this.props.setOperations(["Invite"]);
        this.props.setRelatedEntity(
            this.props.entity["organizedTournaments"].map(entity => entity.name),
            "organizedTournaments",
            [{
                "keys": ["status"],
                "operation": ":",
                "value": ["NEW","ACCEPTED"]
            }],
            Number.POSITIVE_INFINITY);
        this.props.navigate('Tournaments');
    }

    calculateHeight(inputsDisabled){
        let disabledInputHeight = inputsDisabled?35:0;
        return this.props.orientation === 'portrait'?
            this.props.height*0.8-180+disabledInputHeight
            :
            this.props.height*0.7-150+disabledInputHeight;
    }

    render(){
        let height = this.calculateHeight(this.props.inputsDisabled);
        return(
            <View>
                <ScrollView
                    style={{height:height}}
                    contentContainerStyle={EntityPanelStyle.scrollView}>

                    <View style={EntityPanelStyle.inputCard}>
                        <View style={EntityPanelStyle.playerHeader}><Text style={[MainStyle.smallWhiteStyle, {fontWeight:'bold'}]}>Organized tournaments</Text></View>
                        <ValidationErrorMessage validationErrorMessage={this.props.validationErrors["participatedTournaments"]}/>
                        <TournamentsTable
                            shouldActualizeRelatedEntities={this.props.shouldActualizeRelatedEntities}
                            shouldActualizeRelatedEntitiesCallBack={this.props.shouldActualizeRelatedEntitiesCallBack}
                            relatedEntity={this.props.relatedEntity}
                            hidden={this.props.hidden}
                            value={this.props.entity["organizedTournaments"]}
                            fieldName="organizedTournaments"
                            disabled = {this.props.inputsDisabled}
                            changeEntity={this.props.changeEntity.bind(this)}/>
                    </View>

                    <View style={EntityPanelStyle.inputCard}>
                        <View style={EntityPanelStyle.playerHeader}><Text style={[MainStyle.smallWhiteStyle, {fontWeight:'bold'}]}>Finished  participated tournaments</Text></View>
                        <TournamentsTableOutput
                            value={this.props.entity["finishedParticipatedTournaments"]}/>
                    </View>

                    <View style={EntityPanelStyle.inputCard}>
                        <View style={EntityPanelStyle.playerHeader}><Text style={[MainStyle.smallWhiteStyle, {fontWeight:'bold'}]}>Finished organized tournaments</Text></View>
                        <TournamentsTableOutput
                            value={this.props.entity["finishedOrganizedTournaments"]}/>
                    </View>

                    <View style={EntityPanelStyle.inputCard}>
                        <View style={EntityPanelStyle.playerHeader}><Text style={[MainStyle.smallWhiteStyle, {fontWeight:'bold'}]}>Created games</Text></View>
                        <TournamentsTableOutput
                            inputsDisabled={true}
                            value={this.props.entity["createdGames"]}/>
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

export default connect( mapStateToProps, mapDispatchToProps )( OrganizerTab );