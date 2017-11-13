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

export default class ParticipatedTournamentsTableOutput extends Component{

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
                                                disabled = {true}
                                                accepted={false}
                                                name={this.props.value[i].name}/>
                    )
                }
                else{
                    outputTable.push(
                        <TournamentDataInGroupTournamentRow
                            key={this.props.value[i].name}
                            disabled = {true}
                            accepted={false}
                            name={this.props.value[i].name}/>
                    );
                    if(this.props.value[i].secondPlayerName === ""){
                        outputTable.push(<EmptySecondPlayerInGroupRow
                            key={'empty'+i}
                            disabled={this.props.disabled}/>);
                    }
                    else{
                        outputTable.push(
                            <SecondPlayerDataInGroupTournamentRow
                                key={this.props.value[i].secondPlayerName}
                                name = {this.props.value[i].secondPlayerName}
                                disabled = {true}
                                accepted={false}
                            />)
                    }
                }
            }
            return outputTable;
        }
    }

    render(){
        return(
            <View>
                <Text>Finished participated tournaments</Text>
                {this.createTableRows()}
            </View>
        );
    }
}