import React from 'react';
import OperationButton from './operationButton/OperationButton'
import {serverName} from '../../../../Main/consts/serverName';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../Redux/actions/index';


class DeleteOperation extends React.Component {
    constructor(props) {
        super(props);
    }

    getSuccessMessage(elementsToDelete){
        return "Elements "+elementsToDelete.map(function(element){return element.name}).join(", ")+" are deleted";
    }

    getFailureMessage(elementsWhichCannotBeDeleted){
        return "Elements "+elementsWhichCannotBeDeleted
                .map(function(element){return element.name}).join(", ")+" are not deleted " +
            "because if you want delete element you must ban it firstly"
    }

    deleteElements(){
        let checkedElements = this.props.page.content.filter(element => element.checked===true);
        let elementsToDelete = checkedElements.filter(element => element.banned===true || (element.hasOwnProperty('firstname') && element.status ==="NEW"));
        let elementsWhichCannotBeDeleted = checkedElements.filter(element => !element.banned && (!element.hasOwnProperty('firstname') || element.status !=="NEW"));
        this.props.checkAllElements(false);

        let showSuccessMessage = this.props.showSuccessMessageBox;
        let showFailureMessage = this.props.showFailMessageBox;
        let collectionType = this.props.collectionType;
        let setPage = this.props.setPage;
        let showErrorMessage = this.props.showErrorMessageBox;
        let getFailureMessage = this.getFailureMessage;
        let getSuccessMessage = this.getSuccessMessage;
        let startLoading=this.props.startLoading;
        let stopLoading=this.props.stopLoading;
        let closePanel = this.props.onClosePanel;

        if(elementsToDelete.length>0) {
            let uniqueElementsToBanNames = elementsToDelete.map(function(item) {
                return item.name;
            });
            let getPageAndModifyDataObjectsWrapper = {
                namesOfObjectsToModify: uniqueElementsToBanNames,
                getPageObjectsWrapper: this.props.pageRequest
            };

            let operationFunction = () => {
                startLoading("Deleting...");

                axios.post(serverName+`delete/`+collectionType,
                    getPageAndModifyDataObjectsWrapper)
                    .then(res => {
                        stopLoading();
                        setPage(res.data);
                        if(elementsWhichCannotBeDeleted.length>0)
                            showFailureMessage(getFailureMessage(elementsWhichCannotBeDeleted));
                        else
                            showSuccessMessage(getSuccessMessage(elementsToDelete));
                        closePanel();
                    })
                    .catch(error => {
                        stopLoading();
                        showErrorMessage(error,operationFunction);
                        closePanel();
                    })
            };

            this.props.showConfirmationDialog(
                {
                    header:"Delete checked elements",
                    message:"Are you sure?",
                    onConfirmFunction: operationFunction
                }
            )
        }
        else{
            showFailureMessage("Nothing to delete. You can delete only banned elements.")
            closePanel();
        }
    }

    render() {
        return (
            <OperationButton
                name = "Delete"
                icon = "remove"
                operation = {this.deleteElements.bind(this)}
            />
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        page: state.page,
        pageRequest: state.pageRequest,
        confirmation: state.confirmation,
        message: state.message,
        loading: state.loading
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( DeleteOperation );