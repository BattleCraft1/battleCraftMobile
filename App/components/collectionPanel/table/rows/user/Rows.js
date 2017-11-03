import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    ListView,
    Image
} from 'react-native';

import TableStyles from '../../../../../Styles/TableStyles'
import MainStyles from '../../../../../Styles/MainStyles'
import ListColours from '../../../../../main/consts/ListColours'

import Checkbox from '../../../../commonComponents/checkBox/Checkbox'
import MultiCheckbox from '../../../../commonComponents/checkBox/MultiCheckbox'

import { ActionCreators } from '../../../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {serverName} from '../../../../../main/consts/serverName';

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
            case 'new': return ListColours.users.NEW;
            case 'accepted': return ListColours.users.ACCEPTED;
            case 'organizer': return ListColours.users.ORGANIZER;
            case 'admin': return ListColours.users.ADMIN;
            case 'banned': return ListColours.users.BANNED;
            default: return ListColours.users.NEW;
        }
    }

    editEntity(element){
        if(this.props.entityPanel.mode!=='disabled'){
            this.props.showAdditionalEntityPanel("user",element.name);
        }
        else{
            this.props.editEntity("user",element.name);
        }
    }

    renderRow(rowData) {
        let backgroundColour = this.backgroundColourCheck(rowData);

        return (
            <View key={rowData.name}  style={[TableStyles.row]}>
                <View style={[TableStyles.sectionHeader]}>
                    <TouchableHighlight
                        style={{flex:1}}
                        onPress={() => this.editEntity(rowData)}>
                        <Text numberOfLines={1} style={[MainStyles.smallWhiteStyle, {fontSize: 20}]}> {rowData.name}</Text>
                    </TouchableHighlight>
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


function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        entityPanel: state.entityPanel
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( Rows );