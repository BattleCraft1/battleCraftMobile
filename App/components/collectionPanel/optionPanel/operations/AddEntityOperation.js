import React from 'react';
import OperationButton from './operationButton/OperationButton'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../redux/actions/index';

class AddEntityOperation extends React.Component {
    render() {
        return (
            <OperationButton
                name = "Add"
                icon = {"plus"}
                operation = {()=>{
                    this.props.addEntity(this.props.collectionType.slice(0, -1));
                    this.props.onClosePanel();
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
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( AddEntityOperation );