import React from 'react';
import OperationButton from './operationButton/OperationButton'
import {serverName} from '../../../../Main/consts/serverName';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../Redux/actions/index';

class AdvanceOperation extends React.Component {
    constructor(props) {
        super(props);
    }

    getFailureMessage(elementsWhichCannotBeAdvance){
        return "Users "+elementsWhichCannotBeAdvance
                .map(function(element){return element.name}).join(", ")+" are not advance to Organizer " +
            "because if you want advance user to Organizer he must by a Accepted"
    }

    getSuccessMessage(elementsToAdvance){
        return "Users "+elementsToAdvance.map(function(element){return element.name}).join(", ")+" are advanced to Organizer"
    }

    advanceElements(){
        let checkedElements = this.props.page.content.filter(element => element.checked===true);
        let elementsToAdvance = checkedElements.filter(element => element.status==='ACCEPTED');
        let elementsWhichCannotBeAdvance = checkedElements.filter(element => element.status!=='ACCEPTED');

        let showSuccessMessage = this.props.showSuccessMessageBox;
        let showFailureMessage = this.props.showFailMessageBox;
        let setPage = this.props.setPage;
        let showErrorMessage = this.props.showErrorMessageBox;
        let getFailureMessage = this.getFailureMessage;
        let getSuccessMessage = this.getSuccessMessage;
        let startLoading=this.props.startLoading;
        let stopLoading=this.props.stopLoading;
        let closePanel = this.props.onClosePanel;

        if(elementsToAdvance.length>0) {
            let uniqueElementsToAdvanceNames = elementsToAdvance.map(function(item) {
                return item.name;
            });
            let getPageAndModifyDataObjectsWrapper = {
                namesOfObjectsToModify: uniqueElementsToAdvanceNames,
                getPageObjectsWrapper: this.props.pageRequest
            };

            let operationFunction = () => {
                startLoading("Advancing...");

                axios.post(serverName+`advance/users`,
                    getPageAndModifyDataObjectsWrapper)
                    .then(res => {
                        setPage(res.data);
                        stopLoading();
                        if(elementsWhichCannotBeAdvance.length>0){
                            showFailureMessage(getFailureMessage(elementsWhichCannotBeAdvance));
                        }
                        else{
                            showSuccessMessage(getSuccessMessage(elementsToAdvance));
                        }
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
                    header:"Advance checked elements",
                    message:"Are you sure?",
                    onConfirmFunction: operationFunction
                }
            )
        }
        else{
            showFailureMessage("Nothing to advance. Only Accepted users can be advanced.")
            closePanel();
        }
    }

    render() {
        return (
            <OperationButton
                name = "Advance"
                icon = "arrow-up"
                operation = {this.advanceElements.bind(this)}
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

export default connect( mapStateToProps, mapDispatchToProps )( AdvanceOperation );