import React from 'react';
import {
    View,
    Button,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../redux/actions/index';

class CancelInviteButton extends React.Component {

    cancelInvite(){
        this.props.setRelatedEntity(this.props.entityPanel.relatedEntity.relatedEntityNames,
            this.props.entityPanel.relatedEntity.relatedEntityType,"");
        this.props.clearCheckedElements();
        this.props.showEntityPanel(true);
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Button
                    title={"Cancel"}
                    color='#4b371b'
                    onPress={()=>this.cancelInvite()}/>
            </View>
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        entityPanel:state.entityPanel
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( CancelInviteButton );