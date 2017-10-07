import React, { Component } from 'react';
import {
    ListView
} from 'react-native';

import TableStyles from '../../../../../Styles/TableStyles'
import MainStyles from '../../../../../Styles/MainStyles'

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
                    <Text style={[MainStyles.smallWhiteStyle, {fontSize: 24}]}> {rowData.rank}.{rowData.name}</Text>
                    <Checkbox name={rowData.name}/>
                </View>
                <View style={[TableStyles.row]}>
                    <Text style={[MainStyles.smallWhiteStyle]}> Game: {rowData.game}</Text>
                </View>
                <View style={[TableStyles.row]}>
                    <Text style={[MainStyles.smallWhiteStyle]}> Total points: {rowData.points}</Text>
                </View>
                <View style={[TableStyles.row]}>
                    <Text style={[MainStyles.smallWhiteStyle]}> E-mail: {rowData.email}</Text>
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