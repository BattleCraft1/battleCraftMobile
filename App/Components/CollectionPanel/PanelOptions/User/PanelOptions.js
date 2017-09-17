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
        let collectionType = 'users';
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
            return item['login'];
        });
        let getPageAndModifyDataObjectsWrapper = {
            namesOfObjectsToModify: uniqueElementsNames,
            getPageObjectsWrapper: this.props.pageRequest
        };
        let operation = function(){
            startLoading(operationLoadingMessage);

            axios.post(serverName+link+'/users',
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

    viewProfile(){
        //to do
            //view new modal with full user info
    }

    banCheckedElements(){
        let checkedElements = this.props.page.content.filter(element => element.checked===true);
        let elementsToBan = checkedElements.filter(element => element.banned===false);
        this.makeOperation(
            elementsToBan
            ,
            `ban`,
            "Baning users...",
            {
                canBeFailed: false
            },
            {
                header:"Ban checked users",
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
            "Restoring users...",
            {
                canBeFailed: false,
            },
            {
                header:"Restore checked users",
                message:"Are you sure?"
            },
            {
                messageText: "Elements "+elementsToUnlock.map(function(element){return element.name}).join(", ")+" are restored"
            },
            {
                messageText: "Nothing to restore"
            }
        );
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
                            this.viewProfile();
                            this.props.changeVisibility(false);
                        }}>
                            <View style={OptionsStyles.icon} >
                                <Icon name="user" size={40} color="#4b371b"/>
                                <Text style={OptionsStyles.iconText}>View</Text>
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
                                <Text style={OptionsStyles.iconText}>Restore</Text>
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