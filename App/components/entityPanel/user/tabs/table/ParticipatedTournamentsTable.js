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
import TournamentDataInGroupTournamentRow from './row/TournamentDataInGroupTournamentRow'
import EmptySecondPlayerInGroupRow from "./row/EmptySecondPlayerInGroupRow";
import SecondPlayerDataInGroupTournamentRow from "./row/SecondPlayerDataInGroupTournamentRow";

export default class ParticipatedTournamentsTable extends Component{

    componentDidMount(){
        if(this.props.shouldActualizeRelatedEntities === true){
            this.props.shouldActualizeRelatedEntitiesCallBack();
        if(this.props.relatedEntity.relatedEntityType==='participatedTournaments')
            this.actualizeParticipants(this.props.relatedEntity.relatedEntities);
        else
            this.actualizeSecondPlayerInGroup(this.props.relatedEntity.relatedEntityType,this.props.relatedEntity.relatedEntities);
        }
    }

    actualizeParticipants(relatedEntities){
        let participatedTournaments = this.props.value;
        let participatedTournamentsNames = participatedTournaments.map(entity => entity.name);
        let relatedEntitiesNames = relatedEntities.map(entity => entity.name);
        relatedEntities.forEach(
            element => {
                if(participatedTournamentsNames.indexOf(element.name)===-1){
                    if(element.playersOnTableCount === 4)
                        participatedTournaments.push({
                            secondPlayerName: "",
                            secondPlayerAccept: false,
                            name: element.name,
                            accepted: false
                        });
                    else
                        participatedTournaments.push({
                            name: element.name,
                            accepted: false
                        })
                }
            }
        );
        participatedTournamentsNames.forEach(
            elementName => {
                if(relatedEntitiesNames.indexOf(elementName)===-1){
                    participatedTournaments = participatedTournaments.filter(element => element.name!==elementName);
                }
            }
        );
        this.props.changeEntity(this.props.fieldName,participatedTournaments);
    }

    actualizeSecondPlayerInGroup(tournamentNameMarker,secondPlayerName){
        let tournamentName = tournamentNameMarker.replace("secondPlayerFor", "");
        let tournament = this.props.value.find(tournament => tournament.name === tournamentName);
        if(tournament.hasOwnProperty("secondPlayerName"));
        tournament.secondPlayerName = secondPlayerName[0];
        this.props.changeEntity(this.props.fieldName,this.props.value);
    }

    deletePlayerFromGroupTournament(tournamentName){
        let participatedTournaments = this.props.value;
        for(let index in participatedTournaments){
            if(participatedTournaments[index].name === tournamentName){
                participatedTournaments[index].secondPlayerName = "";
                participatedTournaments[index].secondPlayerAccept = false;
            }
        }
        this.props.changeEntity(this.props.fieldName,participatedTournaments);
    }

    createTableRows(){
        if(this.props.value.length===0){
            return <EmptyTableRow/>
        }
        else{
            let outputTable = [];
            for(let i=0; i<this.props.value.length; i++){
                if(this.props.value[i].secondPlayerName === undefined){
                    outputTable.push(
                        <DuelTournamentTableRow key={this.props.value[i].name}
                                                disabled = {this.props.disabled}
                                                delete = {this.deleteElement.bind(this)}
                                                accept = {this.acceptElement.bind(this)}
                                                accepted={this.props.value[i].accepted}
                                                name={this.props.value[i].name}/>
                    )
                }
                else{
                    outputTable.push(
                        <TournamentDataInGroupTournamentRow
                            key={this.props.value[i].name}
                            disabled = {this.props.disabled}
                            delete = {this.deleteElement.bind(this)}
                            accept = {this.acceptElement.bind(this)}
                            accepted={this.props.value[i].accepted}
                            name={this.props.value[i].name}/>
                    );
                    if(this.props.value[i].secondPlayerName === ""){
                        outputTable.push(<EmptySecondPlayerInGroupRow
                            invite={this.props.inviteSecondPlayer}
                            key={'empty'+i}
                            tournament={this.props.value[i].name}
                            disabled={this.props.disabled}/>);
                    }
                    else{
                        outputTable.push(
                            <SecondPlayerDataInGroupTournamentRow
                                deleteElement={this.deletePlayerFromGroupTournament.bind(this)}
                                tournament={this.props.value[i].name}
                                key={this.props.value[i].secondPlayerName}
                                name = {this.props.value[i].secondPlayerName}
                                accepted = {this.props.value[i].secondPlayerAccept}
                                disabled = {this.props.disabled}
                            />)
                    }
                }
            }
            return outputTable;
        }
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

    render(){
        return(
            <View>
                <Text>{this.props.name}</Text>
                {this.createTableRows()}
            </View>
        );
    }
}