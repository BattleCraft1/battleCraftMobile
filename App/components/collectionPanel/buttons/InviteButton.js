import React from 'react';
import {
    View,
    Button,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../redux/actions/index';

class InviteButton extends React.Component {

    invite(){
        this.props.setRelatedEntity(this.props.page.checkedElementsNames,
            this.props.entityPanel.relatedEntity.relatedEntityType,
            this.props.entityPanel.relatedEntity.relatedEntityCriteria);
        this.props.clearCheckedElements();
        this.props.showEntityPanel(true);

    }

    render() {
        return (
            <View style={{flex:1, marginRight: 3}}>
                <Button
                    title={"Invite"}
                    color='#4b371b'
                    onPress={()=>this.invite()}/>
            </View>
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        entityPanel:state.entityPanel,
        page: state.page
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( InviteButton );