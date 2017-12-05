import React from 'react';
import OperationButton from './operationButton/OperationButton'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../redux/actions/index';

class ReportOperation extends React.Component {


    render() {
        return (
            <OperationButton
                name = "Report"
                icon = {"envelope-open"}
                operation = {() => {
                    console.log(this.props.page.checkedElementsNames);
                    if(this.props.page.checkedElementsNames.length>0){
                        this.props.onClosePanel();
                        this.props.showReportPanel(true,this.props.collectionType,this.props.page.checkedElementsNames)
                    }
                    else{
                        this.props.showFailureMessage("Nothing to report");
                    }
                }}
            />
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        page:state.page
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( ReportOperation );