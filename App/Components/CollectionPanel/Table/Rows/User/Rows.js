import React, { Component } from 'react';
import {
    View,
    Text,
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
                    <Text style={[MainStyles.smallWhiteStyle, {fontSize: 24}]}> {rowData.name}</Text>
                    <Checkbox name={rowData.name}/>
                </View>

                <View style={[TableStyles.row, {flexDirection:'row'}]}>
                    <View>
                        <Image
                            style={{width: 148, height: 147}}
                            source={avatar} />
                    </View>
                    <View style={{flex: 1, alignSelf: "stretch"}}>
                        <View style={[TableStyles.row]}>
                            <Text style={[MainStyles.smallWhiteStyle]}> Name: {rowData.firstname}</Text>
                        </View>
                        <View style={[TableStyles.row]}>
                            <Text style={[MainStyles.smallWhiteStyle]}> Surname: {rowData.surname}</Text>
                        </View>
                        <View style={[TableStyles.row]}>
                            <Text style={[MainStyles.smallWhiteStyle]}> e-mail: {rowData.email}</Text>
                        </View>
                        <View style={[TableStyles.row]}>
                            <Text style={[MainStyles.smallWhiteStyle]}> Province: {rowData.province}</Text>
                        </View>
                        <View style={[TableStyles.row]}>
                            <Text style={[MainStyles.smallWhiteStyle]}> City: {rowData.city}</Text>
                        </View>
                    </View>
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