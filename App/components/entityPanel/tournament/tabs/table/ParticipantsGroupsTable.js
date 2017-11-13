import React from 'react';
import {
    View,
    Text
} from 'react-native';

import UsersGroupTableRow from './row/PartisipantsGroupTableRow'
import EmptyTableRow from '../../../user/tabs/table/row/EmptyTournamentTableRow'

export default class ParticipantsGroupsTable extends React.Component{
    componentDidMount() {
        if(this.props.shouldActualizeRelatedEntities === true) {
            this.props.shouldActualizeRelatedEntitiesCallBack();
            this.actualizeRelatedEntityObjects(
                this.props.relatedEntity.relatedEntityType,
                this.props.relatedEntity.relatedEntities);
        }
    }

    actualizeRelatedEntityObjects(relatedEntityType,relatedEntities){
        let index = parseInt(relatedEntityType.replace("participantsGroup", ""));
        let participants = this.props.value[index];
        let invitedParticipantsNames = [];

        for (let i = 0; i < 2; i++) {
            if(participants[i]!==undefined)
                invitedParticipantsNames.push(participants[i].name);
            else
                invitedParticipantsNames.push("");
        }

        relatedEntities.forEach(
            elementName => {
                if(invitedParticipantsNames.indexOf(elementName)===-1){
                    participants.push({
                        name:elementName,
                        accepted:false
                    })
                }
            }
        );

        invitedParticipantsNames.forEach(
            elementName => {
                if(relatedEntities.indexOf(elementName)===-1){
                    for (let i = 0; i < participants.length; i++) {
                        if(participants[i].name===elementName){
                            participants.splice(i,1);
                        }
                    }

                }
            }
        );

        this.props.changeEntity(this.props.fieldName,this.props.value);
    }

    createTableRows(){
        if(this.props.value.length===0){
            return <EmptyTableRow/>
        }
        else{
            return this.props.value.map(
                (group,index) => <UsersGroupTableRow key={index}
                                                     group={group}
                                                     index={index}
                                                     invited = {this.props.value}
                                                     disabled = {this.props.disabled}
                                                     deleteGroup = {this.deleteGroup.bind(this)}
                                                     deleteElement = {this.deleteElement.bind(this)}
                                                     navigate={this.props.navigate}/>
            )
        }
    }

    deleteGroup(index){
        let elements = this.props.value;
        elements.splice(index, 1);
        this.props.changeEntity(this.props.fieldName,elements)
    }

    deleteElement(index,name){
        let elements = this.props.value[index];
        for(let i=0;i<2;i++){
            if(elements[i]!==undefined && elements[i].name === name)
                if(elements.length === 2)
                    elements.splice(i, 1);
                else{
                    this.deleteGroup(index);
                    break;
                }

        }
        this.props.changeEntity(this.props.fieldName,this.props.value)
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
