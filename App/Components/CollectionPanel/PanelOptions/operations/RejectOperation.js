import React from 'react';
import OperationButton from './operationButton/OperationButton'
import {serverName} from '../../../../main/consts/serverName';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../redux/actions/index';


class CancelAcceptOperation extends React.Component {
    constructor(props) {
        super(props);
    }

    getSuccessMessage(elementsToCancelAccept){
        return "Elements: "+elementsToCancelAccept.map(function(element){return element.name}).join(", ")+" are rejected";
    }

    getFailureMessage(elementsWithFailedCancellation){
        return "Elements "+elementsWithFailedCancellation
                .map(function(element){return element.name}).join(", ")+" are still accepted " +
            "because you can cancel acceptation only for accepted and not banned elements"
    }

    cancelAcceptElements(){
        let checkedElements = this.props.page.content.filter(element => element.checked===true);
        let elementsToCancelAccept = checkedElements.filter(element =>
            element.status==='ACCEPTED'  && element.banned===false);
        let elementsWithFailedCancellation = checkedElements.filter(element => element.status!=='ACCEPTED');

        let showSuccessMessage = this.props.showSuccessMessageBox;
        let showFailureMessage = this.props.showFailMessageBox;
        let collectionType = this.props.collectionType;
        let setPage = this.props.setPage;
        let showErrorMessage = this.props.showErrorMessageBox;
        let getFailureMessage = this.getFailureMessage;
        let getSuccessMessage = this.getSuccessMessage;
        let startLoading=this.props.startLoading;
        let stopLoading=this.props.stopLoading;

        if(elementsToCancelAccept.length>0) {
            let uniqueElementsToBanNames = elementsToCancelAccept.map(function(item) {
                return item.name;
            });
            let getPageAndModifyDataObjectsWrapper = {
                namesOfObjectsToModify: uniqueElementsToBanNames,
                getPageObjectsWrapper: this.props.pageRequest
            };

            let operationFunction = function(){
                startLoading("Rejecting...");

                axios.post(serverName+`cancel/accept/`+collectionType,
                    getPageAndModifyDataObjectsWrapper)
                    .then(res => {
                        stopLoading();
                        setPage(res.data);
                        if(elementsWithFailedCancellation.length>0)
                            showFailureMessage(getFailureMessage(elementsWithFailedCancellation));
                        else
                            showSuccessMessage(getSuccessMessage(elementsToCancelAccept));
                        this.props.onClosePanel();
                    })
                    .catch(error => {
                        stopLoading();
                        showErrorMessage(error,operationFunction);
                        this.props.onClosePanel();
                    })
            };

            this.props.showConfirmationDialog(
                {
                    header:"Reject checked elements",
                    message:"Are you sure?",
                    onConfirmFunction: operationFunction
                }
            )
        }
        else{
            showFailureMessage("Nothing to reject. You can cancel acceptation only for accepted and not banned elements.")
            this.props.onClosePanel();
        }
    }

    render() {
        return (
            <OperationButton
                name = "Reject"
                icon = "window-close"
                operation = {this.cancelAcceptElements.bind(this)}
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

export default connect( mapStateToProps, mapDispatchToProps )( CancelAcceptOperation );