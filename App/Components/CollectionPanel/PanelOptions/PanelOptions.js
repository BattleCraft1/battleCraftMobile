import React, { Component } from 'react';
import {
    View,
    Button
} from 'react-native';

import Modal from 'react-native-modal';

import AcceptOperation from './operations/AcceptOperation'
import BanOperation from './operations/BanOperation'
import RejectOperation from './operations/RejectOperation'
import DeleteOperation from './operations/DeleteOperation'
import EditOperation from './operations/EditOperation'
import UnclokOperation from './operations/UnlockOperation'
import AdvanceOperation from './operations/AdvanceOperation'
import DegradeOperation from './operations/DegradeOperation'

import OptionsStyles from '../../../Styles/OptionsStyles'

import {possibleOperations} from '../../../Main/consts/possibleOperations'


export default class PanelOptions extends Component {
    groupOperations(operations){
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

    render() {
        let operations = [];

        const mapOfOperations = {
            "Ban":BanOperation,
            "Reject":RejectOperation,
            "Delete":DeleteOperation,
            "Edit":EditOperation,
            "Unlock":UnclokOperation,
            "Accept":AcceptOperation,
            "Advance":AdvanceOperation,
            "Degrade":DegradeOperation,
        };

        for(let possibleOperation in possibleOperations[this.props.collectionType])
        {

            operations.push(
                React.createElement(
                    mapOfOperations[possibleOperations[this.props.collectionType][possibleOperation]],
                    {collectionType:this.props.collectionType,
                        key:possibleOperation,
                        onClosePanel:this.props.onClosePanel.bind(this)
                    },
                    null
                )
            );
        }

        return (
            <Modal isVisible={this.props.isVisible} backdropOpacity={0.3}>
                <View style={OptionsStyles.modal}>
                    {this.groupOperations(operations)}
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