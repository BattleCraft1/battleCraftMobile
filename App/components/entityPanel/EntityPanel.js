/**
 * Created by FBegiello on 17.10.2017.
 */


import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';


import Modal from 'react-native-modal';

import TournamentPanel from './tournament/Panel';
import GamePanel from './game/Panel';
import UserPanel from './user/Panel';

import MainStyle from '../../Styles/MainStyles';
import EntityPanelStyle from '../../Styles/EntityPanelStyle';

import { ActionCreators } from '../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


const panelTypeMap = {
    'tournament':TournamentPanel,
    'game':GamePanel,
    'user':UserPanel
};

class EntityPanel extends Component {

    createPanel(height){
        let panelType = panelTypeMap[this.props.entityPanel.entityType];

        return panelType ? React.createElement(
            panelType,
            {
                navigate: this.props.navigate,
                mode:this.props.entityPanel.mode,
                type:this.props.entityPanel.entityType,
                name:this.props.entityPanel.entityName,
                hidden:this.props.entityPanel.hidden,
                orientation:this.props.dimension.orientation,
                relatedEntity:this.props.entityPanel.relatedEntity,
                disable:this.props.closeEntityPanel.bind(this),
            },
            null) : <View/>
    }

    render() {
        let panel;
        let height = 0;
        if(this.props.entityPanel.mode!=='disabled'){
            height = this.props.dimension.orientation === 'portrait'?
                this.props.dimension.height*0.8:this.props.dimension.height*0.7;
            panel = this.createPanel(height);
        }
        return (
            this.props.entityPanel.mode !== 'disabled' &&
            <Modal isVisible={!this.props.entityPanel.hidden} backdropOpacity={0.3}>
                <View style={[EntityPanelStyle.modal,{
                        width: this.props.dimension.width*0.9,
                        height: height
                    }]}>
                    <View style={[EntityPanelStyle.title,{alignItems:'center'}]}>
                        <Text style={[MainStyle.textStyle,{fontSize: 22}]}>
                            {this.props.entityPanel.mode.charAt(0).toUpperCase()+this.props.entityPanel.mode.slice(1)+" "+this.props.entityPanel.entityType}
                        </Text>
                    </View>
                    {panel}
                </View>
            </Modal>
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        entityPanel:state.entityPanel,
        dimension: state.dimension
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( EntityPanel );