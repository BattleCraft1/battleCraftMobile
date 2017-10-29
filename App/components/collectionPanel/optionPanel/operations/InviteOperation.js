import React from 'react';
import OperationButton from './operationButton/OperationButton'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../redux/actions/index';

class InviteOperation extends React.Component {

    inviteElements(){
        this.props.setRelatedEntity(this.props.page.checkedElementsNames,
            this.props.entityPanel.relatedEntity.relatedEntityType,
            this.props.entityPanel.relatedEntity.relatedEntityCriteria);
        this.props.clearCheckedElements();
        this.props.showEntityPanel(true);
    }

    render() {
        return (
            <OperationButton
                name = "Invite"
                icon = "envelope-open"
                operation = {this.inviteElements.bind(this)}
            />
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        entityPanel:state.entityPanel,
        page:state.page
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( InviteOperation );