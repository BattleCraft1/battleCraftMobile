import React from 'react';
import OperationButton from './operationButton/OperationButton'
import {serverName} from '../../../../Main/consts/serverName';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../Redux/actions/index';

class AcceptOperation extends React.Component {
    constructor(props) {
        super(props);
    }

    getFailureMessage(elementsWhichCannotBeAccept){
        return "Elements " +
            elementsWhichCannotBeAccept.map(function(element){return element.name}).join(", ")+
            " are not accepted because you can accept only new elements and not banned"
    }

    getSuccessMessage(elementsToAccept){
        return "Elements "+elementsToAccept.map(function(element){return element.name}).join(", ")+" are accepted";
    }

    acceptElements(){
        let checkedElements = this.props.page.content.filter(element => element.checked===true);
        let elementsToAccept = checkedElements.filter(element =>
            element.status==="NEW" && (element.banned===false || element.banned===null));
        let elementsWhichCannotBeAccept =
            checkedElements.filter(element => element.status!=="NEW");

        let showSuccessMessage = this.props.showSuccessMessageBox;
        let showFailureMessage = this.props.showFailMessageBox;
        let setPage = this.props.setPage;
        let showErrorMessage = this.props.showErrorMessageBox;
        let operationFunction = this.props.showErrorMessageBox;
        let getFailureMessage = this.getFailureMessage;
        let getSuccessMessage = this.getSuccessMessage;
        let startLoading=this.props.startLoading;
        let stopLoading=this.props.stopLoading;
        let collectionType = this.props.collectionType;
        let closePanel = this.props.onClosePanel;

        if(elementsToAccept.length>0) {
            let uniqueElementsToBanNames = elementsToAccept.map(function(item) {
                return item.name;
            });
            let getPageAndModifyDataObjectsWrapper = {
                namesOfObjectsToModify: uniqueElementsToBanNames,
                getPageObjectsWrapper: this.props.pageRequest
            };

            let operationFunction = () => {
                startLoading("Accepting...");

                axios.post(serverName+`accept/`+collectionType,
                    getPageAndModifyDataObjectsWrapper)
                    .then(res => {
                        stopLoading();
                        setPage(res.data);
                        if(elementsWhichCannotBeAccept.length>0){

                            showFailureMessage(getFailureMessage(elementsWhichCannotBeAccept));
                        }
                        else{
                            showSuccessMessage(getSuccessMessage(elementsToAccept));
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
                    header:"Accept checked elements",
                    message:"Are you sure?",
                    onConfirmFunction: operationFunction
                }
            )
        }
        else{
            showFailureMessage("Nothing to accept. Only new elements can be accepted.")
            closePanel();
        }
    }

    render() {
        return (
            <OperationButton
                name = "Accept"
                icon = {"check"}
                operation = {this.acceptElements.bind(this)}
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

export default connect( mapStateToProps, mapDispatchToProps )( AcceptOperation );