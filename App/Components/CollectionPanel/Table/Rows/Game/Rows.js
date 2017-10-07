import React, { Component } from 'react';
import {
    View,
    Text,
    ListView
} from 'react-native';

import TableStyles from '../../../../../Styles/TableStyles'
import MainStyles from '../../../../../Styles/MainStyles'

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
                    <Button title={"Download rules"} color='#4b371b'/>
                </View>
                <View style={[TableStyles.row]}>
                    <Text style={[MainStyles.smallWhiteStyle]}> Tournaments number: {rowData.tournamentsNumber}</Text>
                </View>
                <View style={[TableStyles.row]}>
                    <Text style={[MainStyles.smallWhiteStyle]}> Creator: {rowData.creator}</Text>
                </View>
                <View style={[TableStyles.row]}>
                    <Text style={[MainStyles.smallWhiteStyle]}> Creation date: {dateFormat(rowData.dateOfStart,"dd-MM-yyyy hh:mm")}</Text>
                </View>
            </View>);
    }

    render(){
        return(
            <ListView styles={TableStyles.table}
                      dataSource={this.state.dataSource.cloneWithRows(this.props.content)}
                      renderHeader={(headerData) => <View style={TableStyles.header}>
                          <Text style={MainStyles.bigWhiteStyle}>Games List</Text>
                          <MultiCheckbox/>
                      </View>}
                      renderRow={this.renderRow}/>
        );
    }
}