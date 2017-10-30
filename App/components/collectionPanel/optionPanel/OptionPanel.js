import React, { Component } from 'react';
import {
    View,
    Button
} from 'react-native';

import Modal from 'react-native-modal';

import AcceptOperation from './operations/AcceptOperation'
import BanOperation from './operations/BanOperation'
import CancelAcceptOperation from './operations/CancelAcceptOperation'
import CancelInviteOperation from './operations/CancelInviteOperation'
import InviteOperation from './operations/InviteOperation'
import DeleteOperation from './operations/DeleteOperation'
import UnlockOperation from './operations/UnlockOperation'
import AdvanceOperation from './operations/AdvanceOperation'
import DegradeOperation from './operations/DegradeOperation'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../redux/actions';

import OptionsStyles from '../../../Styles/OptionsStyles'

const mapOfOperations = {
    "Ban":BanOperation,
    "Cancel":CancelAcceptOperation,
    "Delete":DeleteOperation,
    "Unlock":UnlockOperation,
    "Accept":AcceptOperation,
    "Advance":AdvanceOperation,
    "Degrade":DegradeOperation,
    "Invite":InviteOperation,
    "CancelInvite":CancelInviteOperation
};

class OptionPanel extends Component {
    groupOperationsInRows(operations){
        let groupedOperations = [];
        for(let i=0;i<operations.length/3;i++){
            let operationsGroup = [];
            if(i*3<operations.length) operationsGroup.push(operations[i*3]);
            if(i*3+1<operations.length) operationsGroup.push(operations[i*3+1]);
            if(i*3+2<operations.length) operationsGroup.push(operations[i*3+2]);
            groupedOperations.push(
                <View style={OptionsStyles.iconsRow} key={i}>
                    {operationsGroup}
                </View>
            )
        }
        return groupedOperations;
    }

    groupOperationsInRow(operations){
        return <View style={OptionsStyles.iconsRow} key={1}>
            {operations}
        </View>
    }

    calculateLeftMargin(isPortrait, numberOfElements){
        let elementWidth = 90;
        if(isPortrait){
            let numberOfElementsInRow = 3;
            return (this.props.dimension.width - numberOfElementsInRow*elementWidth)/2;
        }
        else{
            return (this.props.dimension.width -numberOfElements*elementWidth)/2;
        }
    }

    render() {
        let operations = [];

        this.props.possibleOperations.forEach(operation => {
            operations.push(
                React.createElement(
                    mapOfOperations[operation],
                    {
                        onClosePanel:this.props.onClosePanel.bind(this),
                        collectionType:this.props.collectionType,
                        key:operation
                    },
                    null
                )
            );
        });

        let isPortrait = this.props.dimension.orientation === 'portrait';

        return (
            <Modal isVisible={this.props.isVisible} backdropOpacity={0.3}>
                <View style={[OptionsStyles.modal,{marginLeft: this.calculateLeftMargin(isPortrait,operations.length)}]}>
                    {isPortrait? this.groupOperationsInRows(operations):this.groupOperationsInRow(operations)}
                    <Button
                        onPress={() => this.props.onClosePanel()}
                        title="Close"
                        color="#4b371b"
                    />
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
        possibleOperations: state.possibleOperations,
        dimension: state.dimension
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( OptionPanel );