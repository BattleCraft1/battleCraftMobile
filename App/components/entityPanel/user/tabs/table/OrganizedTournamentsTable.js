/**
 * Created by FBegiello on 20.10.2017.
 */
import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

import DuelTournamentTableRow from './row/DuelTournamentTableRow'
import EmptyTableRow from './row/EmptyTournamentTableRow'

export default class OrganizedTournamentsTable extends Component{

    componentDidMount() {
        if(this.props.shouldActualizeRelatedEntities === true) {
            this.props.shouldActualizeRelatedEntitiesCallBack();
            this.actualizeRelatedEntityObjects(this.props.relatedEntity.relatedEntities);
        }
    }

    actualizeRelatedEntityObjects(relatedEntities){
        let organizedTournaments = this.props.value;
        let relatedEntitiesNames = organizedTournaments.map(entity => entity.name);
        relatedEntities.forEach(
            elementName => {
                if(relatedEntitiesNames.indexOf(elementName)===-1){
                    organizedTournaments.push({
                        name:elementName,
                        accepted:false
                    })
                }
            }
        );
        relatedEntitiesNames.forEach(
            elementName => {
                if(relatedEntities.indexOf(elementName)===-1){
                    let organizerToDelete = organizedTournaments.find(element => element.name===elementName);
                    organizedTournaments.splice(organizedTournaments.indexOf(organizerToDelete),1);
                }
            }
        );
        this.props.changeEntity(this.props.fieldName,organizedTournaments);
    }

    deleteElement(name){
        let elements = this.props.value;
        elements = elements.filter(tournament => {
            return tournament.name!==name
        });
        this.props.changeEntity(this.props.fieldName,elements)
    }

    acceptElement(name){
        let elements = this.props.value;
        let element = elements.find(tournament => {
            return tournament.name===name
        });
        element.accepted = !element.accepted;
        this.props.changeEntity(this.props.fieldName,elements)
    }

    createTableRows(){
        if(this.props.value.length===0){
            return <EmptyTableRow/>
        }
        else{
            return this.props.value.map(tournament =>
                <DuelTournamentTableRow key={tournament.name}
                                        disabled = {this.props.disabled}
                                        delete = {this.deleteElement.bind(this)}
                                        accept = {this.acceptElement.bind(this)}
                                        accepted={tournament.accepted}
                                        name={tournament.name}/>
            )
        }
    }

    render(){
        return(
            <View>
                <Text>{this.props.name}</Text>
                {this.createTableRows()}
            </View>
        );
    }
}