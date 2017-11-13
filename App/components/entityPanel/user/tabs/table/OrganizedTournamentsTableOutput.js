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

export default class OrganizedTournamentsTableOutput extends Component{

    createTableRows(){
        if(this.props.value.length===0){
            return <EmptyTableRow/>
        }
        else{
            return this.props.value.map(tournament =>
                <DuelTournamentTableRow key={tournament.name}
                                        disabled = {true}
                                        accepted={false}
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