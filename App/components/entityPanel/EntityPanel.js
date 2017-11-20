/**
 * Created by FBegiello on 17.10.2017.
 */


import React, { Component } from 'react';
import {
    View
} from 'react-native';

import TournamentPanel from './tournament/Panel';
import GamePanel from './game/Panel';
import UserPanel from './user/Panel';

import { ActionCreators } from '../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


const panelTypeMap = {
    'tournament':TournamentPanel,
    'game':GamePanel,
    'user':UserPanel
};

class EntityPanel extends Component {

    createPanel(){
        let panelType = panelTypeMap[this.props.entityPanel.entityType];

        return panelType ? React.createElement(
            panelType,
            {
                navigate: this.props.navigate,
                mode:this.props.entityPanel.mode,
                type:this.props.entityPanel.entityType,
                name:this.props.entityPanel.entityName,
                hidden:this.props.entityPanel.hidden,
                relatedEntity:this.props.entityPanel.relatedEntity,
                disable:this.props.closeEntityPanel.bind(this),
            },
            null) : <View/>
    }

    render() {
        return (this.props.entityPanel.mode!=='disabled' && this.createPanel());
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

export default connect( mapStateToProps, mapDispatchToProps )( EntityPanel );