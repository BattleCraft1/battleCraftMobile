import React, { Component } from 'react';
import {
    View,
    Text,
    ListView
} from 'react-native';

import TableStyles from '../../../../../Styles/TableStyles'
import MainStyles from '../../../../../Styles/MainStyles'

import Checkbox from '../../../../Common/CheckBox/Checkbox'
import MultiCheckbox from '../../../../Common/CheckBox/MultiCheckbox'

import dateFormat from 'dateformat';

export default class Rows extends Component{

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


    renderRow(rowData) {
        return (
            <View style={[TableStyles.row]}>
                <View style={[TableStyles.sectionHeader]}>
                    <Text style={[MainStyles.smallWhiteStyle, {fontSize: 24}]}> {rowData.name}</Text>
                    <Checkbox name={rowData.name}/>
                </View>
                <View style={[TableStyles.row]}>
                    <Text style={[MainStyles.smallWhiteStyle]}> Province: {rowData.province}</Text>
                </View>
                <View style={[TableStyles.row]}>
                    <Text style={[MainStyles.smallWhiteStyle]}> City: {rowData.city}</Text>
                </View>
                <View style={[TableStyles.row]}>
                    <Text style={[MainStyles.smallWhiteStyle]}> Game: {rowData.game}</Text>
                </View>
                <View style={[TableStyles.row]}>
                    <Text style={[MainStyles.smallWhiteStyle]}> Players: {rowData.playersNumber}/{rowData.maxPlayers}</Text>
                </View>
                <View style={[TableStyles.row]}>
                    <Text style={[MainStyles.smallWhiteStyle]}> Date start: {dateFormat(rowData.dateOfStart,"dd-MM-yyyy hh:mm")}</Text>
                </View>
                <View style={[TableStyles.row]}>
                    <Text style={[MainStyles.smallWhiteStyle]}> Date end: {dateFormat(rowData.dateOfEnd,"dd-MM-yyyy hh:mm")}</Text>
                </View>
                <View style={[TableStyles.row]}>
                    <Text style={[MainStyles.smallWhiteStyle]}> Status: {
                        rowData.banned?"banned":
                            rowData.tournamentStatus.toLowerCase().split('_').join(' ')}</Text>
                </View>
            </View>);
    }

    render(){
        return(
            <ListView styles={TableStyles.table}
                      dataSource={this.state.dataSource.cloneWithRows(this.props.content)}
                      renderHeader={(headerData) => <View style={TableStyles.header}>
                          <Text style={MainStyles.bigWhiteStyle}>Tournaments List</Text>
                          <MultiCheckbox/>
                      </View>}
                      renderRow={this.renderRow}/>
        );
    }
}