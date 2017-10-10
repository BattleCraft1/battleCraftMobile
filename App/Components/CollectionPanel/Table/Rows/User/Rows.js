import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    Image
} from 'react-native';

import TableStyles from '../../../../../Styles/TableStyles'
import MainStyles from '../../../../../Styles/MainStyles'

import Checkbox from '../../../../Common/CheckBox/Checkbox'
import MultiCheckbox from '../../../../Common/CheckBox/MultiCheckbox'

import {serverName} from '../../../../../Main/consts/serverName';

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

    printStatus(data){
        if(data.banned===true)
            return "banned";
        else if(data.status!==undefined)
            return data.status.toLowerCase().split('_').join(' ');
        else
            return "";
    }


    renderRow(rowData) {
        return (
            <View style={[TableStyles.row]}>
                <View style={[TableStyles.sectionHeader]}>
                    <Text style={[MainStyles.smallWhiteStyle, {fontSize: 20}]}> {rowData.name}</Text>
                    <Checkbox name={rowData.name}/>
                </View>

                <View style={[TableStyles.row, {flexDirection:'column'}]}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
                            <Image
                                style={{width: 70, height: 70}}
                                source={{uri:serverName+`/get/user/`+rowData.name+`/avatar/mobile`}} />
                        </View>
                        <View style={{flex: 3, alignSelf: "stretch"}}>
                            <View style={[TableStyles.row]}>
                                <Text style={[MainStyles.smallWhiteStyle]}> Name: {rowData.firstname}</Text>
                            </View>
                            <View style={[TableStyles.row]}>
                                <Text style={[MainStyles.smallWhiteStyle]}> Surname: {rowData.lastname}</Text>
                            </View>
                            <View style={[TableStyles.row]}>
                                <Text style={[MainStyles.smallWhiteStyle]}> E-mail: {rowData.email}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={[TableStyles.row]}>
                            <Text style={[MainStyles.smallWhiteStyle]}> Province: {rowData.province}</Text>
                        </View>
                        <View style={[TableStyles.row]}>
                            <Text style={[MainStyles.smallWhiteStyle]}> City: {rowData.city}</Text>
                        </View>
                        <View style={[TableStyles.row]}>
                            <Text style={[MainStyles.smallWhiteStyle]}> Phone number: {rowData.phoneNumber}</Text>
                        </View>
                        <View style={[TableStyles.row]}>
                            <Text style={[MainStyles.smallWhiteStyle]}> Status: {this.printStatus(rowData)}</Text>
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