/**
 * Created by FBegiello on 20.10.2017.
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Button,
    Image
} from 'react-native';

import ValidationErrorMessage from '../../outputs/ValidationErrorMessage'

import TableStyles from '../../../../Styles/TableStyles'
import MainStyles from '../../../../Styles/MainStyles'
import ListColours from '../../../../main/consts/ListColours'
import EntityPanelStyle from "../../../../Styles/EntityPanelStyle";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions/index';
import EmptyRow from "../../outputs/EmptyRow";
import {serverName} from "../../../../main/consts/serverName";

class OrganizersTab extends Component{

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
                <Button title={"Remove"} color='#4b371b' onPress={()=>this.deleteElement(rowData.name)}/>}
            </View>);
    }

    deleteElement(name){
        let elements = this.props.entity["organizers"];
        elements = elements.filter(user => {
            return user.name!==name
        });
        this.props.changeEntity("organizers",elements);
    }

    startInviteOrganizers(){
        this.props.setOperations(["Invite"]);
        this.props.setRelatedEntity(
            this.props.entity["organizers"].map(entity => entity.name),
            "organizers",
            ["ORGANIZER"]);
        this.props.showEntityPanel(false);
        this.props.navigate('Users');
    }

    createListOfUsers(){
        if(this.props.entity["organizers"].length===0){
            return <EmptyRow/>
        }
        else{
            return this.props.entity["organizers"].map(organizer => this.renderRow(organizer));
        }
    }

    calculateHeight(inputsDisabled){
        let disabledInputHeight = inputsDisabled?35:0;
        return this.props.dimension.orientation === 'portrait'?
            this.props.dimension.height*0.8-180+disabledInputHeight
            :
            this.props.dimension.height*0.7-150+disabledInputHeight;
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
                <ValidationErrorMessage validationErrorMessage={this.props.validationErrors["organizers"]}/>
                {!this.props.inputsDisabled &&
                <Button title={"Invite"} color='#4b371b'
                        onPress={()=>this.startInviteOrganizers()}/>}
            </View>
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        dimension: state.dimension
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( OrganizersTab );
