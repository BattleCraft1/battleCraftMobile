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

import { ActionCreators } from '../../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';

class OrganizerTab extends Component{

    createListOfOrganizedTournaments(){
        if(this.props.entity["organizedTournaments"].length===0){
            return <EmptyRow/>
        }
        else{
            return this.props.entity["organizedTournaments"]
                .map(participatedTournament => this.renderRowOfOrganizedTournaments(participatedTournament));
        }
    }

    createDisabledList(listPattern){
        if(listPattern.length===0){
            return <EmptyRow/>
        }
        else{
            return listPattern
                .map(participatedTournament => this.renderRowOfDisabledList(participatedTournament));
        }
    }

    renderRowOfOrganizedTournaments(rowData) {

        let backgroundColour = this.backgroundColourCheck(rowData.accepted);

        return (
            <View key={rowData.name} style={[TableStyles.row, {flexDirection: 'row'}]}>
                <View style={{backgroundColor: backgroundColour, flex: 1, justifyContent:'center'}}>
                    <Text numberOfLines={1} style={[MainStyles.verySmallWhiteStyle, {padding:3}]}>{rowData.name}</Text>
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

    renderRowOfDisabledList(rowData) {
        return (
            <View key={rowData.name} style={[TableStyles.row, {flexDirection: 'row'}]}>
                <View style={{backgroundColor: 'white', flex: 1, justifyContent:'center'}}>
                    <Text numberOfLines={1} style={[MainStyles.verySmallWhiteStyle, {padding:3}]}>{rowData.name}</Text>
                </View>
            </View>);
    }

    backgroundColourCheck(accepted){
        return accepted? ListColours.tournaments.ACCEPTED:ListColours.tournaments.NEW;
    }

    deleteElement(name){
        let elements = this.props.entity["organizedTournaments"];
        elements = elements.filter(tournament => {
            return tournament.name!==name
        });
        this.props.changeEntity(this.props.fieldName,elements)
    }

    acceptElement(name){
        let elements = this.props.entity["organizedTournaments"];
        let element = elements.find(tournament => {
            return tournament.name===name
        });
        element.accepted = !element.accepted
        this.props.changeEntity(this.props.fieldName,elements)
    }

    startAddTournaments(){
        this.props.setOperations(["Invite"]);
        this.props.setRelatedEntity(
            this.props.entity["organizedTournaments"].map(entity => entity.name),
            "organizedTournaments",
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
                    <Text>Organized tournaments</Text>
                    {this.createListOfOrganizedTournaments()}
                    <Text>Finished tournaments</Text>
                    {this.createDisabledList(this.props.entity["finishedOrganizedTournaments"])}
                    <Text>Created games</Text>
                    {this.createDisabledList(this.props.entity["createdGames"])}
                </ScrollView>
                <ValidationErrorMessage validationErrorMessage={this.props.validationErrors["organizedTournaments"]}/>
                {!this.props.inputsDisabled &&
                <Button title={"Add"} color='#4b371b'
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

export default connect( mapStateToProps, mapDispatchToProps )( OrganizerTab );