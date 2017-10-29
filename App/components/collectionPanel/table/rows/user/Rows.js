import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    Image
} from 'react-native';

import TableStyles from '../../../../../Styles/TableStyles'
import MainStyles from '../../../../../Styles/MainStyles'
import ListColours from '../../../../../main/consts/ListColours'

import Checkbox from '../../../../commonComponents/checkBox/Checkbox'
import MultiCheckbox from '../../../../commonComponents/checkBox/MultiCheckbox'

import {serverName} from '../../../../../main/consts/serverName';

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


    backgroundColourCheck(rowData){
        switch(this.printStatus(rowData)){
            case 'new': return ListColours.users.NEW;
            case 'accepted': return ListColours.users.ACCEPTED;
            case 'organizer': return ListColours.users.ORGANIZER;
            case 'admin': return ListColours.users.ADMIN;
            case 'banned': return ListColours.users.BANNED;
            default: return ListColours.users.NEW;
        }
    }

    renderRow(rowData) {
        let backgroundColour = this.backgroundColourCheck(rowData);

        return (
            <View style={[TableStyles.row]}>
                <View style={[TableStyles.sectionHeader]}>
                    <Text numberOfLines={1} style={[MainStyles.smallWhiteStyle, {fontSize: 20}]}> {rowData.name}</Text>
                    <Checkbox elementName = {rowData.name} checked = {rowData.checked}/>
                </View>

                <View style={[TableStyles.row, {flexDirection:'column'}]}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
                            <Image
                                style={{width: 70, height: 70}}
                                source={{uri:serverName+`/get/user/avatar?username=${rowData.name}`}} />
                        </View>
                        <View style={{flex: 3, alignSelf: "stretch"}}>
                            <View style={[TableStyles.row]}>
                                <Text numberOfLines={1} style={[MainStyles.smallWhiteStyle]}> Name: {rowData.firstname}</Text>
                            </View>
                            <View style={[TableStyles.row]}>
                                <Text numberOfLines={1} style={[MainStyles.smallWhiteStyle]}> Surname: {rowData.lastname}</Text>
                            </View>
                            <View style={[TableStyles.row]}>
                                <Text numberOfLines={1} style={[MainStyles.smallWhiteStyle]}> E-mail: {rowData.email}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={[TableStyles.row]}>
                            <Text numberOfLines={1} style={[MainStyles.smallWhiteStyle]}> Province: {rowData.province}</Text>
                        </View>
                        <View style={[TableStyles.row]}>
                            <Text numberOfLines={1} style={[MainStyles.smallWhiteStyle]}> City: {rowData.city}</Text>
                        </View>
                        <View style={[TableStyles.row]}>
                            <Text numberOfLines={1} style={[MainStyles.smallWhiteStyle]}> Phone number: {rowData.phoneNumber}</Text>
                        </View>
                        <View style={[TableStyles.row]}>
                            <Text numberOfLines={1} style={[MainStyles.smallWhiteStyle, {backgroundColor: backgroundColour}]}> Status: {this.printStatus(rowData)}</Text>
                        </View>
                    </View>
                </View>
            </View>);
    }

    render(){
        return(
            <ListView styles={TableStyles.table}
                      dataSource={this.state.dataSource.cloneWithRows(this.props.content)}
                      enableEmptySections={true}
                      renderHeader={(headerData) => <View style={TableStyles.header}>
                          <Text style={[MainStyles.textStyle, {fontSize: 24}]}>User list</Text>
                          <MultiCheckbox/>
                      </View>}
                      renderRow={this.renderRow}/>
        );
    }
}