import React, { Component } from 'react';
import OptionsStyles from '../../../../Styles/OptionsStyles'
import {
    Text,
    View,
    Button,
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../Redux/actions';

import {serverName} from '../../../../Main/consts/serverName'

class PanelOptions extends Component {

    makeOperation(elements, link, failure, confirmation, successMessage, operationImpossibleMessage){
        let showMessage = this.props.showMessageBox;
        if(elements.length>0) {
            let collectionType = 'tournaments';
            let setPage = this.props.setPage;
            let showNetworkErrorMessageBox = this.props.showNetworkErrorMessageBox;
            let haveFailure=false;
            if(failure.canBeFailed)
            {
                haveFailure = (failure.elements.length > 0);
            }
            let uniqueElementsNames = elements.map(function(item) {
                return item['name'];
            });
            let getPageAndModifyDataObjectsWrapper = {
                namesOfObjectsToModify: uniqueElementsNames,
                getPageObjectsWrapper: this.props.pageRequest
            };
            this.props.showConfirmationDialog(
                {
                    header: confirmation.header,
                    message: confirmation.message,
                    onConfirmFunction:function(){
                        fetch(serverName+link+'/tournaments', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(getPageAndModifyDataObjectsWrapper)
                        })
                            .then((response) => response.json())
                            .then((responseJson) => {
                                setPage(responseJson);
                                if(failure.canBeFailed)
                                    if(haveFailure)
                                    {
                                        showMessage(failure.message);
                                        return;
                                    }
                                    else
                                    {
                                        showMessage(successMessage);
                                        return;
                                    }
                                showMessage(successMessage);
                            })
                            .catch(error => {
                                this.props.showNetworkErrorMessageBox(error);
                            });
                    }
                });
        }
        else{
            showMessage(operationImpossibleMessage)
        }
    }

    banCheckedElements(){
        let checkedElements = this.props.page.content.filter(element => element.checked===true);
        let elementsToBan = checkedElements.filter(element => element.banned===false);
        this.makeOperation(
            elementsToBan
            ,
            `ban`,
            {
                canBeFailed: false
            },
            {
                header:"Ban checked tournaments",
                message:"Are you sure?"
            },
            {
                messageText: "Elements "+elementsToBan.map(function(element){return element.name}).join(", ")+" are banned",
                messageType: "alert-success"
            },
            {
                messageText: "Nothing to ban",
                messageType: "alert-danger"
            }
        );
    }

    unlockCheckedElements(){
        let checkedElements = this.props.page.content.filter(element => element.checked===true);
        let elementsToUnlock = checkedElements.filter(element => element.banned===true);
        this.makeOperation(
            elementsToUnlock
            ,
            `unlock`,
            {
                canBeFailed: false,
            },
            {
                header:"Unlock checked tournaments",
                message:"Are you sure?"
            },
            {
                messageText: "Elements "+elementsToUnlock.map(function(element){return element.name}).join(", ")+" are unlock",
                messageType: "alert-success"
            },
            {
                messageText: "Nothing to unlock",
                messageType: "alert-danger"
            }
        );
    }

    deleteCheckedElements(){
        let checkedElements = this.props.page.content.filter(element => element.checked===true);
        let elementsToDelete = checkedElements.filter(element => element.banned===true);
        let elementsWhichCannotBeDeleted = checkedElements.filter(element => !element.banned);
        this.props.checkAllElements(false);
        this.makeOperation(
            elementsToDelete
            ,
            `delete`,
            {
                canBeFailed: true,
                elements: elementsWhichCannotBeDeleted,
                message:{
                    messageText: "Elements "+elementsWhichCannotBeDeleted
                        .map(function(element){return element.name}).join(", ")+" are not deleted " +
                    "because if you want delete element you must ban it firstly",
                    messageType: "alert-danger"
                }
            },
            {
                header:"Delete checked tournaments",
                message:"Are you sure?"
            },
            {
                messageText: "Elements "+elementsToDelete.map(function(element){return element.name}).join(", ")+" are deleted",
                messageType: "alert-success"
            },
            {
                messageText: "Nothing to delete",
                messageType: "alert-danger"
            }
        );
    }

    acceptCheckedElements(){
        let checkedElements = this.props.page.content.filter(element => element.checked===true);
        let elementsToAccept = checkedElements.filter(element =>
        element.tournamentStatus==="NEW" && element.banned===false);
        let elementsWhichCannotBeAccept = checkedElements.filter(element => element.tournamentStatus!=="NEW");
        this.makeOperation(
            elementsToAccept
            ,
            `accept`,
            {
                canBeFailed: true,
                elements: elementsWhichCannotBeAccept,
                message:{
                    messageText: "Elements "+elementsWhichCannotBeAccept
                        .map(function(element){return element.name}).join(", ")+" are not accepted " +
                    "because you can accept only new elements and not banned",
                    messageType: "alert-danger"
                }
            },
            {
                header:"Accept checked tournaments",
                message:"Are you sure?"
            },
            {
                messageText: "Elements "+elementsToAccept.map(function(element){return element.name}).join(", ")+" are accepted",
                messageType: "alert-success"
            },
            {
                messageText: "Nothing to accept",
                messageType: "alert-danger"
            }
        );
    }

    cancelAcceptCheckedElements(){
        let checkedElements = this.props.page.content.filter(element => element.checked===true);
        let elementsToCancelAccept = checkedElements.filter(element =>
        element.tournamentStatus==="ACCEPTED"  && element.banned===false);
        let elementsWithFailedCancellation = checkedElements.filter(element => element.tournamentStatus!=="ACCEPTED");
        this.makeOperation(
            elementsToCancelAccept
            ,
            `cancel/accept`,
            {
                canBeFailed: true,
                elements: elementsWithFailedCancellation,
                message:{
                    messageText: "Elements "+elementsWithFailedCancellation
                        .map(function(element){return element.name}).join(", ")+" are still accepted " +
                    "because you can cancel accept only for accepted and not banned elements",
                    messageType: "alert-danger"
                }
            },
            {
                header:"Cancel acceptations of checked tournaments",
                message:"Are you sure?"
            },
            {
                messageText: "Acceptations for "+elementsToCancelAccept.map(function(element){return element.name}).join(", ")+" are canceled",
                messageType: "alert-success"
            },
            {
                messageText: "Nothing to cancel accept",
                messageType: "alert-danger"
            }
        );
    }

    addNewTournament(){
        console.log("TO DO");
    }

    render(){
        return(
            <Modal
                isVisible={this.props.isVisible}
                backdropOpacity={0.3}
            >
                <View style={OptionsStyles.modal}>
                    <View style={OptionsStyles.iconsRow}>
                        <TouchableHighlight onPress={() => {
                            this.addNewTournament();
                            this.props.changeVisibility(false);
                        }}>
                            <View style={OptionsStyles.icon} >
                                <Icon name="plus-circle" size={40} color="#4b371b"/>
                                <Text style={OptionsStyles.iconText}>Add</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => {
                            this.banCheckedElements();
                            this.props.changeVisibility(false);
                        }}>
                            <View style={OptionsStyles.icon} >
                                <Icon name="lock" size={40} color="#4b371b"/>
                                <Text style={OptionsStyles.iconText}>Ban</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => {
                            this.unlockCheckedElements();
                            this.props.changeVisibility(false);
                        }}>
                            <View style={OptionsStyles.icon} >
                                <Icon name="unlock" size={40} color="#4b371b"/>
                                <Text style={OptionsStyles.iconText}>Unlock</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={OptionsStyles.iconsRow}>
                        <TouchableHighlight onPress={() => {
                            this.deleteCheckedElements();
                            this.props.changeVisibility(false);
                        }}>
                            <View style={OptionsStyles.icon} >
                                <Icon name="remove" size={40} color="#4b371b"/>
                                <Text style={OptionsStyles.iconText}>Remove</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => {
                            this.acceptCheckedElements();
                            this.props.changeVisibility(false);
                        }}>
                            <View style={OptionsStyles.icon} >
                                <Icon name="check" size={40} color="#4b371b"/>
                                <Text style={OptionsStyles.iconText}>Accept</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => {
                            this.cancelAcceptCheckedElements();
                            this.props.changeVisibility(false);
                        }}>
                            <View style={OptionsStyles.icon} >
                                <Icon name="window-close" size={40} color="#4b371b"/>
                                <Text style={OptionsStyles.iconText}>No accept</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={OptionsStyles.buttonRow}>
                        <Button
                            onPress={() => this.props.changeVisibility(false)}
                            title="Close"
                            color="#4b371b"
                        />
                    </View>
                </View>
            </Modal>
        );
    }
};

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        page: state.page,
        pageRequest: state.pageRequest,
        message: state.message,
        confirmation: state.confirmation
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( PanelOptions );
