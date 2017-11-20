import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableHighlight
} from 'react-native';

import TableStyles from '../../../../../Styles/CollectionPanelStyles/TableStyles'
import MainStyles from '../../../../../Styles/UniversalStyles/MainStyles'
import ListColours from '../../../../../main/consts/ListColours'

import Checkbox from '../../../../commonComponents/checkBox/Checkbox'
import MultiCheckbox from '../../../../commonComponents/checkBox/MultiCheckbox'

import { ActionCreators } from '../../../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import dateFormat from 'dateformat';


class Rows extends Component{

    constructor(props) {
        super(props);

        this.renderRow = this.renderRow.bind(this);
    }

    printStatus(data){
        if(data.banned===true)
            return "banned";
        else if(data.status!==undefined)
            return data.status.toLowerCase().split('_').join(' ');
        else
            return "";
    }

    backgroundColourCheck(rowData){
        switch(this.printStatus(rowData)){
            case 'new': return ListColours.tournaments.NEW;
            case 'accepted': return ListColours.tournaments.ACCEPTED;
            case 'in progress': return ListColours.tournaments.IN_PROGRESS;
            case 'finished': return ListColours.tournaments.FINISHED;
            case 'banned': return ListColours.tournaments.BANNED;
            default: return ListColours.tournaments.NEW;
        }
    }

    editEntity(element){
        if(this.props.entityPanel.mode!=='disabled')
            this.props.showAdditionalEntityPanel("tournament",element.name);
        else if((element.status!=='NEW' && element.status!=='ACCEPTED') || element.banned === true){
            this.props.getEntity("tournament",element.name);
        }
        else
            this.props.editEntity("tournament",element.name);
    }

    createTournamentsList(){
        if(this.props.content.length===0){
            return <View style={[TableStyles.row]}><Text numberOfLines={1} style={[MainStyles.smallWhiteStyle]}>Empty</Text></View>;
        }
        else{
            return this.props.content.map(tournament => this.renderRow(tournament));
        }
    }

    renderRow(rowData) {

        let backgroundColour = this.backgroundColourCheck(rowData);

        return (
            <View key={rowData.name} style={[TableStyles.row]}>
                <View style={[TableStyles.sectionHeader]}>
                    <TouchableHighlight
                        style={{flex:1}}
                        onPress={() => this.editEntity(rowData)}>
                        <Text numberOfLines={1} style={[MainStyles.smallWhiteStyle, {fontSize: 20}]}> {rowData.name}</Text>
                    </TouchableHighlight>
                    <Checkbox element = {rowData} checked = {rowData.checked}/>
                </View>
                <View style={[TableStyles.row]}>
                    <Text numberOfLines={1} style={[MainStyles.smallWhiteStyle]}> Province: {rowData.province}</Text>
                </View>
                <View style={[TableStyles.row]}>
                    <Text numberOfLines={1} style={[MainStyles.smallWhiteStyle]}> City: {rowData.city}</Text>
                </View>
                <View style={[TableStyles.row]}>
                    <Text numberOfLines={1} style={[MainStyles.smallWhiteStyle]}> Game: {rowData.game}</Text>
                </View>
                <View style={[TableStyles.row]}>
                    <Text numberOfLines={1} style={[MainStyles.smallWhiteStyle]}> Players: {rowData.playersNumber}/{rowData.maxPlayers}</Text>
                </View>
                <View style={[TableStyles.row]}>
                    <Text numberOfLines={1} style={[MainStyles.smallWhiteStyle]}> Type: {rowData.playersOnTableCount===2?"Duel":"Group"}</Text>
                </View>
                <View style={[TableStyles.row]}>
                    <Text numberOfLines={1} style={[MainStyles.smallWhiteStyle]}> Date start: {dateFormat(rowData.dateOfStart,"dd-MM-yyyy hh:mm")}</Text>
                </View>
                <View style={[TableStyles.row]}>
                    <Text numberOfLines={1} style={[MainStyles.smallWhiteStyle]}> Date end: {dateFormat(rowData.dateOfEnd,"dd-MM-yyyy hh:mm")}</Text>
                </View>
                <View style={[TableStyles.row, {backgroundColor: backgroundColour}]}>
                    <Text numberOfLines={1} style={[MainStyles.smallWhiteStyle]}> Status: {this.printStatus(rowData)}</Text>
                </View>
            </View>);
    }

    render(){
        return(
                <ScrollView styles={TableStyles.table}>
                    <View style={TableStyles.header}>
                        <Text style={[MainStyles.textStyle, {fontSize: 24}]}>Tournaments</Text>
                        <MultiCheckbox/>
                    </View>
                    {this.createTournamentsList()}
                </ScrollView>
        );
    }
}


function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        entityPanel: state.entityPanel,
        page: state.page
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( Rows );

