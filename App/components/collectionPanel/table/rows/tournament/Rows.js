import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    TouchableHighlight
} from 'react-native';

import TableStyles from '../../../../../Styles/TableStyles'
import MainStyles from '../../../../../Styles/MainStyles'
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

        let dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(['Placeholder'])
        };
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
        else if(element.status!=='NEW' && element.status!=='ACCEPTED'){
            console.log("debug");
            this.props.getEntity("tournament",element.name);
        }
        else
            this.props.editEntity("tournament",element.name);
    }

    renderRow(rowData) {

        let backgroundColour = this.backgroundColourCheck(rowData);

        return (
            <View style={[TableStyles.row]}>
                <View style={[TableStyles.sectionHeader]}>
                    <TouchableHighlight
                        style={{flex:1}}
                        onPress={() => this.editEntity(rowData)}>
                        <Text numberOfLines={1} style={[MainStyles.smallWhiteStyle, {fontSize: 20}]}> {rowData.name}</Text>
                    </TouchableHighlight>
                    <Checkbox elementName = {rowData.name} checked = {rowData.checked}/>
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
            <ListView styles={TableStyles.table}
                      dataSource={this.state.dataSource.cloneWithRows(this.props.content)}
                      enableEmptySections={true}
                      renderHeader={(headerData) => <View style={TableStyles.header}>
                          <Text style={[MainStyles.textStyle, {fontSize: 24}]}>Tournaments List</Text>
                          <MultiCheckbox/>
                      </View>}
                      renderRow={this.renderRow.bind(this)}/>
        );
    }
}


function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        entityPanel: state.entityPanel
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( Rows );

