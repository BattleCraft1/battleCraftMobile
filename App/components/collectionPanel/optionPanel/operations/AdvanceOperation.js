import React from 'react';
import OperationButton from './operationButton/OperationButton'
import {serverName} from '../../../../main/consts/serverName';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../redux/actions/index';

class AdvanceOperation extends React.Component {

    getSuccessMessage(advancedElementsNames){
        return "Users "+advancedElementsNames.join(", ")+" are advanced to Organizer"
    }

    advanceElements(){
        let checkedElementsNames = this.props.page.checkedElementsNames;
        let checkPreviouslyCheckedElements = this.props.checkPreviouslyCheckedElements;

        let showSuccessMessage = this.props.showSuccessMessage;
        let showFailureMessage = this.props.showFailureMessage;
        let showNetworkErrorMessage = this.props.showNetworkErrorMessage;
        let getSuccessMessage = this.getSuccessMessage;

        let startLoading=this.props.startLoading;
        let stopLoading=this.props.stopLoading;
        let closePanel = this.props.onClosePanel;

        if(checkedElementsNames.length>0) {
            let GetPageAndModifyDataDTO = {
                namesOfObjectsToModify: checkedElementsNames,
                getPageObjectsDTO: this.props.pageRequest
            };

            let operationFunction = () => {
                startLoading("Advancing...");

                axios.post(serverName+`advance/players`, GetPageAndModifyDataDTO)
                    .then(res => {
                        stopLoading();
                        checkPreviouslyCheckedElements(res.data);
                        showSuccessMessage(getSuccessMessage(checkedElementsNames));
                        closePanel();
                    })
                    .catch(error => {
                        stopLoading();
                        showNetworkErrorMessage(error,operationFunction);
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
            showFailureMessage("Nothing to advance.");
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
        pageRequest: state.pageRequest
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( AdvanceOperation );