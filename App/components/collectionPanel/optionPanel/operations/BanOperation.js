import React from 'react';
import OperationButton from './operationButton/OperationButton'
import {serverName} from '../../../../main/consts/serverName';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../redux/actions/index';

class BanOperation extends React.Component {

    getSuccessMessage(BannedElementsNames){
        return "Elements "+BannedElementsNames.join(", ")+" are banned";
    }

    benElements(){
        let checkedElementsNames = this.props.page.checkedElementsNames;
        let collectionType = this.props.collectionType;
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
                startLoading("Banning...");

                axios.post(serverName+'ban/'+collectionType, GetPageAndModifyDataDTO,
                    {
                        headers: {
                            "X-Auth-Token":this.props.security.token
                        }
                    })
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
                    });

            };

            this.props.showConfirmationDialog(
                {
                    header:"Ban checked elements",
                    message:"Are you sure?",
                    onConfirmFunction: operationFunction
                }
            )
        }
        else{
            showFailureMessage("Nothing to ban.");
            closePanel();
        }
    }

    render() {
        return (
            <OperationButton
                name = "Ban"
                icon = "ban"
                operation = {this.benElements.bind(this)}
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
        security: state.security
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( BanOperation );