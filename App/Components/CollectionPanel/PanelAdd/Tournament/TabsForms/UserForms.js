/**
 * Created by FBegiello on 20.10.2017.
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    Button
} from 'react-native';

import TableStyles from '../../../../../Styles/TableStyles'
import MainStyles from '../../../../../Styles/MainStyles'
import ListColours from '../../../../../Main/consts/ListColours'

export default class UserForms extends Component{

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

    users={
        user1:{
            name:'Hitler',
            status: 'accepted'
        },
        user2:{
            name:'Stalin',
            status: 'accepted'
        },
        user3:{
            name:'Mao',
            status: 'new'
        },
    }


    backgroundColourCheck(rowData){
        switch(rowData.status){
            case 'new': return ListColours.users.NEW;
            case 'accepted': return ListColours.users.ACCEPTED;
            default: return ListColours.users.NEW;
        }
    }

    renderRow(rowData) {

        let backgroundColour = this.backgroundColourCheck(rowData);

        return (
            <View style={[TableStyles.row, {flexDirection: 'row'}]}>
                <View style={{backgroundColor: backgroundColour, flex: 1}}>
                    <Text style={[MainStyles.bigWhiteStyle, {padding:3}]}> {rowData.name}</Text>
                </View>
                <Button title={"Remove"} color='#4b371b' onPress={()=>{}}/>
            </View>);
    }

    render(){
        return(
            <View>
                <ListView styles={TableStyles.table}
                          dataSource={this.state.dataSource.cloneWithRows(this.users)}
                          renderRow={this.renderRow.bind(this)}/>
                <Button title={"Add new "+this.props.UserType} color='#4b371b' onPress={()=>{}}/>
            </View>
        );
    }
}

