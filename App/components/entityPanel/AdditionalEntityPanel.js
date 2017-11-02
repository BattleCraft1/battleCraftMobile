/**
 * Created by FBegiello on 17.10.2017.
 */


import React, { Component } from 'react';
import {
    View
} from 'react-native';

import TournamentPanel from './tournament/Panel';
import UserPanel from './user/Panel';

import { ActionCreators } from '../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


const panelTypeMap = {
    'tournament':TournamentPanel,
    'user':UserPanel
};

class AdditionalEntityPanel extends Component {

    createPanel(){
        let panelType = panelTypeMap[this.props.additionalEntityPanel.additionalEntityType];

        return panelType ? React.createElement(
            panelType,
            {
                navigate:()=>{},
                mode:'get',
                type:this.props.additionalEntityPanel.additionalEntityType,
                name:this.props.additionalEntityPanel.additionalEntityName,
                hidden:false,
                relatedEntity:{},
                disable:this.props.disableAdditionalEntityPanel.bind(this),
            },
            null) : <View/>
    }

    render() {
        return (this.props.additionalEntityPanel.additionalEntityName!=="" && this.createPanel());
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        additionalEntityPanel:state.additionalEntityPanel
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( AdditionalEntityPanel );