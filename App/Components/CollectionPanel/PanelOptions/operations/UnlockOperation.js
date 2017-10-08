import React from 'react';
import OperationButton from './operationButton/OperationButton'
import {serverName} from '../../../../Main/consts/serverName';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../Redux/actions/index';


class UnlockOperation extends React.Component {
    constructor(props) {
        super(props);
    }

    getSuccessMessage(elementsToUnlock){
        return "Elements "+elementsToUnlock.map(function(element){return element.name}).join(", ")+" are unlock";
    }

    unlockElements(){
        let checkedElements = this.props.page.content.filter(element => element.checked===true);
        let elementsToUnlock = checkedElements.filter(element => element.banned===true);

        let showSuccessMessage = this.props.showSuccessMessageBox;
        let showFailureMessage = this.props.showFailMessageBox;
        let collectionType = this.props.collectionType;
        let setPage = this.props.setPage;
        let showErrorMessage = this.props.showErrorMessageBox;
        let getSuccessMessage = this.getSuccessMessage;
        let closePanel = this.props.onClosePanel;
        let startLoading=this.props.startLoading;
        let stopLoading=this.props.stopLoading;

        if(elementsToUnlock.length>0) {
            let uniqueElementsToBanNames = elementsToUnlock.map(function(item) {
                return item.name;
            });
            let getPageAndModifyDataObjectsWrapper = {
                namesOfObjectsToModify: uniqueElementsToBanNames,
                getPageObjectsWrapper: this.props.pageRequest
            };

            let operationFunction = () => {
                startLoading("Unlocking...");

                axios.post(serverName+`unlock/`+collectionType,
                    getPageAndModifyDataObjectsWrapper)
                    .then(res => {
                        stopLoading();
                        setPage(res.data);
                        showSuccessMessage(getSuccessMessage(elementsToUnlock));
                        closePanel();
                    })
                    .catch(error => {
                        stopLoading();
                        showErrorMessage(error);
                        closePanel();
                    })
            };
            this.props.showConfirmationDialog(
                {
                    header:"Unlock checked elements",
                    message:"Are you sure?",
                    onConfirmFunction: operationFunction
                }
            )
        }
        else{
            showFailureMessage("Nothing to unlock. Only banned elements can be unlock.")
            closePanel();
        }
    }

    render() {
        return (
            <OperationButton
                name = "Unlock"
                icon = "unlock"
                operation = {this.unlockElements.bind(this)}
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

export default connect( mapStateToProps, mapDispatchToProps )( UnlockOperation );