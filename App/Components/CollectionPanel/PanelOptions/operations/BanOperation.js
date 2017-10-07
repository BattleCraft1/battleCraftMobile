import React from 'react';
import OperationButton from './operationButton/OperationButton'
import {serverName} from '../../../../Main/consts/serverName';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../Redux/actions/index';

class BanOperation extends React.Component {
    constructor(props) {
        super(props);
    }

    getSuccessMessage(elementsToBan){
        return "Elements "+elementsToBan.map(function(element){return element.name}).join(", ")+" are banned";
    }

    benElements(){
        let checkedElements = this.props.page.content.filter(element => element.checked===true);
        let elementsToBan = checkedElements.filter(element => element.banned===false);

        let showSuccessMessage = this.props.showSuccessMessageBox;
        let showFailureMessage = this.props.showFailMessageBox;
        let setPage = this.props.setPage;
        let showErrorMessage = this.props.showErrorMessageBox;
        let getSuccessMessage = this.getSuccessMessage;
        let startLoading=this.props.startLoading;
        let stopLoading=this.props.stopLoading;
        let collectionType = this.props.collectionType;

        if(elementsToBan.length>0) {
            let uniqueElementsToBanNames = elementsToBan.map(function(item) {
                return item.name;
            });
            let getPageAndModifyDataObjectsWrapper = {
                namesOfObjectsToModify: uniqueElementsToBanNames,
                getPageObjectsWrapper: this.props.pageRequest
            };

            let operationFunction = function(){
                startLoading("Banning...");

                axios.post(serverName+'ban/'+collectionType,
                    getPageAndModifyDataObjectsWrapper)
                    .then(res => {
                        stopLoading();
                        setPage(res.data);
                        showSuccessMessage(getSuccessMessage(elementsToBan));
                        this.props.onClosePanel();
                    })
                    .catch(error => {
                        stopLoading();
                        showErrorMessage(error,operationFunction);
                        this.props.onClosePanel();
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
            showFailureMessage("Nothing to ban. You can ban only not banned elements.")
            this.props.onClosePanel();
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
        confirmation: state.confirmation,
        message: state.message,
        loading: state.loading
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( BanOperation );