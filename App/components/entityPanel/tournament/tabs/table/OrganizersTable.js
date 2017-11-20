import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

import UserTableRow from './row/UserTableRow'
import EmptyTableRow from './row/EmptyUserTableRow'

export default class OrganizersTable extends React.Component{

    componentDidMount() {
        if(this.props.shouldActualizeRelatedEntities === true) {
            this.props.shouldActualizeRelatedEntitiesCallBack();
            this.actualizeRelatedEntityObjects(this.props.relatedEntity.relatedEntities);
        }
    }

    actualizeRelatedEntityObjects(relatedEntities){
        let organizers = this.props.value;
        let relatedEntitiesNames = organizers.map(entity => entity.name);
        relatedEntities.forEach(
            elementName => {
                if(relatedEntitiesNames.indexOf(elementName)===-1){
                    organizers.push({
                        name:elementName,
                        accepted:false
                    })
                }
            }
        );
        relatedEntitiesNames.forEach(
            elementName => {
                if(relatedEntities.indexOf(elementName)===-1){
                    let organizerToDelete = organizers.find(element => element.name===elementName);
                    organizers.splice(organizers.indexOf(organizerToDelete),1);
                }
            }
        );
        this.props.changeEntity(this.props.fieldName,organizers);
    }

    createTableRows(){
        if(this.props.value.length===0){
            return <EmptyTableRow/>
        }
        else{
            return this.props.value.map(
                organizer => <UserTableRow key={organizer.name}
                                           disabled = {this.props.disabled}
                                           delete = {this.deleteElement.bind(this)}
                                           accepted={organizer.accepted}
                                           name={organizer.name}/>
            )
        }
    }

    deleteElement(name){
        let elements = this.props.value;
        elements = elements.filter(user => {
            return user.name!==name
        });
        this.props.changeEntity(this.props.fieldName,elements)
    }

    render(){
        return(
            <View>
                <Text>{this.props.name}</Text>
                {this.createTableRows()}
            </View>
        )
    }
}
