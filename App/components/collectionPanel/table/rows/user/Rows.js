import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    ScrollView,
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

    createUsersList(){
        if(this.props.content.length===0){
            return <View style={[TableStyles.row]}><Text numberOfLines={1} style={[MainStyles.smallWhiteStyle]}>Empty</Text></View>;
        }
        else{
            return this.props.content.map(user => this.renderRow(user));
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
                    <Checkbox element = {rowData} checked = {rowData.checked}/>
                </View>

                <View style={[TableStyles.row, {flexDirection:'column'}]}>
                    <View style={{flexDirection:'row'}}>
                        <TouchableHighlight
                            style={TableStyles.avatar}
                            onPress={() => this.editEntity(rowData)}>
                            <Image
                                style={{width: 60, height: 60}}
                                source={{uri:`${serverName}/get/user/avatar?username=${rowData.name}&${new Date().getTime()}`}} />
                        </TouchableHighlight>

                        <View style={{flex: 4, alignSelf: "stretch"}}>
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
                <ScrollView styles={TableStyles.table}>
                    <View style={TableStyles.header}>
                        <Text style={[MainStyles.textStyle, {fontSize: 24}]}>User list</Text>
                        <MultiCheckbox/>
                    </View>
                    {this.createUsersList()}
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