import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import UserTableRow from './row/UserTableRow'
import EmptyTableRow from './row/EmptyUserTableRow'

export default class ParticipantsTable extends React.Component{

    componentDidMount() {
        if(this.props.shouldActualizeRelatedEntities === true) {
            this.props.shouldActualizeRelatedEntitiesCallBack();
            this.actualizeRelatedEntityObjects(this.props.relatedEntity.relatedEntities);
        }
    }

    actualizeRelatedEntityObjects(relatedEntities){
        console.log("organizers");
        let participants = this.props.value;
        let invitedParticipantsNames = [];

        for (let i = 0; i < participants.length; i++) {
            invitedParticipantsNames.push(participants[i][0].name);
        }
        relatedEntities.forEach(
            elementName => {
                if(invitedParticipantsNames.indexOf(elementName)===-1){
                    participants.push([{
                        name:elementName,
                        accepted:false
                    }])
                }
            }
        );
        invitedParticipantsNames.forEach(
            elementName => {
                if(relatedEntities.indexOf(elementName)===-1){
                    for (let i = 0; i < participants.length; i++) {
                        if(participants[i][0].name===elementName){
                            participants.splice(i,1);
                        }
                    }

                }
            }
        );
        this.props.changeEntity(this.props.fieldName,participants);
    }

    createTableRows(){
        if(this.props.value.length===0){
            return <EmptyTableRow/>
        }
        else{
            return this.props.value.map(
                user => <UserTableRow key={user[0].name}
                                      disabled = {this.props.disabled}
                                      delete = {this.deleteElement.bind(this)}
                                      accepted={user[0].accepted}
                                      name={user[0].name}/>
            )
        }
    }

    deleteElement(name){
        let elements = this.props.value;
        for (let i = 0; i < elements.length; i++) {
            if(elements[i][0].name===name){
                elements.splice(i,1);
            }
        }
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
