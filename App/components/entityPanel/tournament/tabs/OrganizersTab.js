/**
 * Created by FBegiello on 20.10.2017.
 */
import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Button
} from 'react-native';

import ValidationErrorMessage from '../../outputs/ValidationErrorMessage'

import EntityPanelStyle from "../../../../Styles/EntityPanelStyle";


import { ActionCreators } from '../../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import OrganizersTable from './table/OrganizersTable'

class OrganizersTab extends Component{

    startInviteOrganizers(){
        this.props.setOperations(["Invite"]);
        this.props.setRelatedEntity(
            this.props.entity["organizers"].map(entity => entity.name),
            "organizers",
            [{
                "keys": ["status"],
                "operation": ":",
                "value": ["ORGANIZER"]
            }, {
                "keys": ["banned"],
                "operation": ":",
                "value": [false]
            }]
            ,10);
        this.props.navigate('Users');
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
                    <ValidationErrorMessage validationErrorMessage={this.props.validationErrors["organizers"]}/>
                    <OrganizersTable
                        shouldActualizeRelatedEntities={this.props.shouldActualizeRelatedEntities}
                        shouldActualizeRelatedEntitiesCallBack={this.props.shouldActualizeRelatedEntitiesCallBack}
                        value={this.props.entity["organizers"]}
                        fieldName="organizers"
                        disabled = {this.props.inputsDisabled}
                        changeEntity={this.props.changeEntity}
                        relatedEntity={this.props.relatedEntity}
                        hidden={this.props.hidden}
                        name="Organizers" />
                </ScrollView>
                {!this.props.inputsDisabled &&
                <Button title={"Invite"} color='#4b371b'
                        onPress={()=>this.startInviteOrganizers()}/>}
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

export default connect( mapStateToProps, mapDispatchToProps )( OrganizersTab );