/**
 * Created by FBegiello on 20.10.2017.
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Button,
    Image,
    TouchableHighlight
} from 'react-native';

import ValidationErrorMessage from '../../outputs/ValidationErrorMessage'

import TableStyles from '../../../../Styles/TableStyles'
import MainStyles from '../../../../Styles/MainStyles'
import ListColours from '../../../../main/consts/ListColours'
import EntityPanelStyle from "../../../../Styles/EntityPanelStyle";

import EmptyRow from "../../outputs/EmptyRow";
import {serverName} from "../../../../main/consts/serverName";

import { ActionCreators } from '../../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';

class ParticipantsTab extends Component{

    backgroundColourCheck(accepted){
        return accepted? ListColours.users.ACCEPTED:ListColours.users.NEW;
    }

    renderRow(rowData) {

        let backgroundColour = this.backgroundColourCheck(rowData.accepted);

        return (
            <View key={rowData.name} style={[TableStyles.row, {flexDirection: 'row'}]}>
                <View style={{width: 35, justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                        style={{width: 35, height: 35}}
                        source={{uri:serverName+`/get/user/avatar?username=${rowData.name}`}}/>
                </View>
                <View style={{backgroundColor: backgroundColour, flex: 1, justifyContent:'center'}}>
                    <Text numberOfLines={1} style={[MainStyles.verySmallWhiteStyle, {padding:3}]}> {rowData.name}</Text>
                </View>
                {!this.props.inputsDisabled &&
                <TouchableHighlight onPress={() => {this.deleteElement(rowData.name);}}>
                    <View style={TableStyles.icon} >
                        <Icon name='close' size={25} color="#ffffff"/>
                        <Text style={TableStyles.iconText}>{this.props.name}</Text>
                    </View>
                </TouchableHighlight>}
            </View>);
    }

    deleteElement(name){
        let elements = this.props.entity["participants"];
        elements = elements.filter(user => {
            return user.name!==name
        });
        this.props.changeEntity("participants",elements);
    }

    startInviteParticipants(){
        this.props.setOperations(["Invite"]);
        this.props.setRelatedEntity(
            this.props.entity["participants"].map(entity => entity.name),
            "participants",
            ["ORGANIZER","ACCEPTED"]);
        this.props.showEntityPanel(false);
        this.props.navigate('Users');
    }

    createListOfUsers(){
        if(this.props.entity["participants"].length===0){
            return <EmptyRow/>
        }
        else{
            return this.props.entity["participants"].map(organizer => this.renderRow(organizer));
        }
    }

    calculateHeight(inputsDisabled){
        let disabledInputHeight = inputsDisabled?35:0;
        return this.props.orientation === 'portrait'?
            this.props.height*0.8-180+disabledInputHeight
            :
            this.props.height*0.7-150+disabledInputHeight;
    }

    render(){
        let height = this.calculateHeight(this.props.inputsDisabled);
        return(
            <View>
                <ScrollView
                    style={{height:height}}
                    contentContainerStyle={EntityPanelStyle.scrollView}>
                    {this.createListOfUsers()}
                </ScrollView>
                <ValidationErrorMessage validationErrorMessage={this.props.validationErrors["participants"]}/>
                {!this.props.inputsDisabled &&
                <Button title={"Invite"} color='#4b371b'
                        onPress={()=>this.startInviteParticipants()}/>}
            </View>
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {};
}

export default connect( mapStateToProps, mapDispatchToProps )( ParticipantsTab );