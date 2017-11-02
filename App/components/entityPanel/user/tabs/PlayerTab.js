/**
 * Created by FBegiello on 20.10.2017.
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Button,
    TouchableHighlight
} from 'react-native';

import ValidationErrorMessage from '../../outputs/ValidationErrorMessage'

import TableStyles from '../../../../Styles/TableStyles'
import MainStyles from '../../../../Styles/MainStyles'
import ListColours from '../../../../main/consts/ListColours'
import EntityPanelStyle from "../../../../Styles/EntityPanelStyle";

import EmptyRow from "../../outputs/EmptyRow";
import NumberOutput from "../../outputs/NumberOutput";

import { ActionCreators } from '../../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';

class PlayerTab extends Component{

    createListOfParticipatedTournaments(){
        if(this.props.entity["participatedTournaments"].length===0){
            return <EmptyRow/>
        }
        else{
            return this.props.entity["participatedTournaments"]
                .map(participatedTournament => this.renderRowOfParticipatedTournaments(participatedTournament));
        }
    }

    createListOfFinishedTournaments(){
        if(this.props.entity["finishedParticipatedTournaments"].length===0){
            return <EmptyRow/>
        }
        else{
            return this.props.entity["finishedParticipatedTournaments"]
                .map(finishedTournament => this.renderRowOfFinishedTournaments(finishedTournament));
        }
    }

    renderRowOfParticipatedTournaments(rowData) {

        let backgroundColour = this.backgroundColourCheck(rowData.accepted);

        return (
            <View key={rowData.name} style={[TableStyles.row, {flexDirection: 'row'}]}>
                <View style={{backgroundColor: backgroundColour, flex: 1, justifyContent:'center'}}>
                    <Text numberOfLines={1} style={[MainStyles.verySmallWhiteStyle, {padding:3}]}> {rowData.name}</Text>
                </View>
                {!this.props.inputsDisabled &&
                <View style={{flexDirection:'row'}}>
                    <TouchableHighlight onPress={() => {this.acceptElement(rowData.name);}}>
                        <View style={TableStyles.icon} >
                            <Icon name='check-square-o' size={25} color="#ffffff"/>
                            <Text style={TableStyles.iconText}>{this.props.name}</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => {this.deleteElement(rowData.name);}}>
                        <View style={TableStyles.icon} >
                            <Icon name='close' size={25} color="#ffffff"/>
                            <Text style={TableStyles.iconText}>{this.props.name}</Text>
                        </View>
                    </TouchableHighlight>
                </View>}
            </View>);
    }

    renderRowOfFinishedTournaments(rowData) {
        return (
            <View key={rowData} style={[TableStyles.row, {flexDirection: 'row'}]}>
                <View style={{backgroundColor: '#a58e60', flex: 1, justifyContent:'center'}}>
                    <Text numberOfLines={1} style={[MainStyles.verySmallWhiteStyle, {padding:3}]}> {rowData}</Text>
                </View>
            </View>);
    }

    backgroundColourCheck(accepted){
        return accepted? ListColours.users.ACCEPTED:ListColours.users.NEW;
    }

    acceptElement(name){
        let elements = this.props.entity["participatedTournaments"];
        let element = elements.find(tournament => {
            return tournament.name===name
        });
        element.accepted = !element.accepted;
        this.props.changeEntity("participatedTournaments",elements)
    }

    deleteElement(name){
        let elements = this.props.entity["participatedTournaments"];
        elements = elements.filter(tournament => {
            return tournament.name!==name
        });
        this.props.changeEntity("participatedTournaments",elements)
    }

    startAddTournaments(){
        this.props.setOperations(["Invite"]);
        this.props.setRelatedEntity(
            this.props.entity["participatedTournaments"].map(entity => entity.name),
            "participatedTournaments",
            ["ACCEPTED"]);
        this.props.showEntityPanel(false);
        this.props.navigate('Tournaments');
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
                    <Text>Participated tournaments</Text>
                    {this.createListOfParticipatedTournaments()}
                    <Text>Finished tournaments</Text>
                    {this.createListOfFinishedTournaments()}
                    <NumberOutput
                        value={this.props.entity["points"]}
                        name="Points"/>
                    <NumberOutput
                        value={this.props.entity["numberOfBattles"]}
                        name="Battles Count"/>
                </ScrollView>
                <ValidationErrorMessage validationErrorMessage={this.props.validationErrors["participatedTournaments"]}/>
                {!this.props.inputsDisabled &&
                <Button title={"ADD TOURNAMENT"} color='#4b371b'
                        onPress={()=>this.startAddTournaments()}/>}
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

export default connect( mapStateToProps, mapDispatchToProps )( PlayerTab );