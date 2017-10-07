import React from 'react';
import OperationButton from './operationButton/OperationButton'
import {serverName} from '../../../../main/consts/serverName';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../redux/actions/index';

class DegradeOperation extends React.Component {
    constructor(props) {
        super(props);
    }

    getFailureMessage(elementsWhichCannotBeDegrade){
        return "Users "+elementsWhichCannotBeDegrade
                .map(function(element){return element.name}).join(", ")+" are not degrade to Accepted " +
            "because if you want degrade user to Accepted he must by a Organizer"
    }

    getSuccessMessage(elementsToDegrade){
        return "Users "+elementsToDegrade.map(function(element){return element.name}).join(", ")+" are degrade to Accepted"
    }

    degradeElements(){
        let checkedElements = this.props.page.content.filter(element => element.checked===true);
        let elementsToDegrade = checkedElements.filter(element => element.status==='ORGANIZER');
        let elementsWhichCannotBeDegrade = checkedElements.filter(element => element.status!=='ORGANIZER');

        let showSuccessMessage = this.props.showSuccessMessageBox;
        let showFailureMessage = this.props.showFailMessageBox;
        let setPage = this.props.setPage;
        let showErrorMessage = this.props.showErrorMessageBox;
        let getFailureMessage = this.getFailureMessage;
        let getSuccessMessage = this.getSuccessMessage;
        let startLoading=this.props.startLoading;
        let stopLoading=this.props.stopLoading;

        if(elementsToDegrade.length>0) {
            let uniqueElementsToDegradeNames = elementsToDegrade.map(function(item) {
                return item.name;
            });
            let getPageAndModifyDataObjectsWrapper = {
                namesOfObjectsToModify: uniqueElementsToDegradeNames,
                getPageObjectsWrapper: this.props.pageRequest
            };

            let operationFunction = function(){
                startLoading("Degrading...");

                axios.post(serverName+`degrade/organizers`,
                    getPageAndModifyDataObjectsWrapper)
                    .then(res => {
                        stopLoading();
                        setPage(res.data);
                        if(elementsWhichCannotBeDegrade.length>0)
                            showFailureMessage(getFailureMessage(elementsWhichCannotBeDegrade));
                        else
                            showSuccessMessage(getSuccessMessage(elementsToDegrade));
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
                    header:"Degrade checked elements",
                    message:"Are you sure?",
                    onConfirmFunction: operationFunction
                }
            )
        }
        else{
            showFailureMessage("Nothing to degrade. You can only degrade Organizers")
            this.props.onClosePanel();
        }
    }

    render() {
        return (
            <OperationButton
                name = "Degrade"
                icon = "arrow-down"
                operation = {this.degradeElements.bind(this)}
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

export default connect( mapStateToProps, mapDispatchToProps )( DegradeOperation );