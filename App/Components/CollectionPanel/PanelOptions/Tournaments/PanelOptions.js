import React, { Component } from 'react';
import OptionsStyles from '../../../../Styles/OptionsStyles'
import MainStyles from '../../../../Styles/MainStyles'
import {
    Text,
    View,
    Button,
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import axios from 'axios';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../Redux/actions';

import {serverName} from '../../../../Main/consts/serverName'

class PanelOptions extends Component {

    makeOperation(elements, link, operationLoadingMessage, failure, confirmation, successMessage, operationImpossibleMessage){
        let showSuccessMessage = this.props.showSuccessMessageBox;
        let showFailMessage = this.props.showFailMessageBox;
        let collectionType = 'tournaments';
        let setPage = this.props.setPage;
        let showErrorMessage = this.props.showErrorMessageBox;
        let haveFailure=false;
        let startLoading=this.props.startLoading;
        let stopLoading=this.props.stopLoading;
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
        let operation = function(){
            startLoading(operationLoadingMessage);

            axios.post(serverName+link+'/tournaments',
                getPageAndModifyDataObjectsWrapper)
                .then(res => {
                    setPage(res.data);
                    if(failure.canBeFailed)
                        if(haveFailure)
                        {
                            stopLoading();
                            showFailMessage(failure.message);
                            return;
                        }
                        else
                        {
                            stopLoading();
                            showSuccessMessage(successMessage);
                            return;
                        }
                    stopLoading();
                    showSuccessMessage(successMessage);
                })
                .catch(error => {
                    stopLoading();
                    showErrorMessage(error,operation);
                });
        };
        if(elements.length>0) {
            this.props.showConfirmationDialog(
                {
                    header: confirmation.header,
                    message: confirmation.message,
                    onConfirmFunction: operation
                });
        }
        else{
            this.props.showFailMessageBox(operationImpossibleMessage,operation);
        }
    }

    banCheckedElements(){
        let checkedElements = this.props.page.content.filter(element => element.checked===true);
        let elementsToBan = checkedElements.filter(element => element.banned===false);
        this.makeOperation(
            elementsToBan
            ,
            `ban`,
            "Baning tournaments...",
            {
                canBeFailed: false
            },
            {
                header:"Ban checked tournaments",
                message:"Are you sure?"
            },
            {
                messageText: "Elements "+elementsToBan.map(function(element){return element.name}).join(", ")+" are banned"
            },
            {
                messageText: "Nothing to ban."
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
            "Unlocking tournaments...",
            {
                canBeFailed: false,
            },
            {
                header:"Unlock checked tournaments",
                message:"Are you sure?"
            },
            {
                messageText: "Elements "+elementsToUnlock.map(function(element){return element.name}).join(", ")+" are unlock"
            },
            {
                messageText: "Nothing to unlock"
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
            "Deleting tournaments...",
            {
                canBeFailed: true,
                elements: elementsWhichCannotBeDeleted,
                message:{
                    messageText: "Elements "+elementsWhichCannotBeDeleted
                        .map(function(element){return element.name}).join(", ")+" are not deleted " +
                    "because if you want delete element you must ban it firstly"
                }
            },
            {
                header:"Delete checked tournaments",
                message:"Are you sure?"
            },
            {
                messageText: "Elements "+elementsToDelete.map(function(element){return element.name}).join(", ")+" are deleted"
            },
            {
                messageText: "Nothing to delete"
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
            "Accepting tournaments...",
            {
                canBeFailed: true,
                elements: elementsWhichCannotBeAccept,
                message:{
                    messageText: "Elements "+elementsWhichCannotBeAccept
                        .map(function(element){return element.name}).join(", ")+" are not accepted " +
                    "because you can accept only new elements and not banned"
                }
            },
            {
                header:"Accept checked tournaments",
                message:"Are you sure?"
            },
            {
                messageText: "Elements "+elementsToAccept.map(function(element){return element.name}).join(", ")+" are accepted"
            },
            {
                messageText: "Nothing to accept"
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
            "Canceling acceptations for tournaments...",
            {
                canBeFailed: true,
                elements: elementsWithFailedCancellation,
                message:{
                    messageText: "Elements "+elementsWithFailedCancellation
                        .map(function(element){return element.name}).join(", ")+" are still accepted " +
                    "because you can cancel accept only for accepted and not banned elements"
                }
            },
            {
                header:"Cancel acceptations of checked tournaments",
                message:"Are you sure?"
            },
            {
                messageText: "Acceptations for "+elementsToCancelAccept.map(function(element){return element.name}).join(", ")+" are canceled"
            },
            {
                messageText: "Nothing to reject"
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
                                <Text style={OptionsStyles.iconText}>Reject</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={MainStyles.centering}>
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
        confirmation: state.confirmation,
        loading: state.loading
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( PanelOptions );