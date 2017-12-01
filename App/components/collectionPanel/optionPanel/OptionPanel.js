import React, { Component } from 'react';
import {
    View,
    Button
} from 'react-native';

import Modal from 'react-native-modal';

import AcceptOperation from './operations/AcceptOperation'
import BanOperation from './operations/BanOperation'
import CancelAcceptOperation from './operations/CancelAcceptOperation'
import DeleteOperation from './operations/DeleteOperation'
import UnlockOperation from './operations/UnlockOperation'
import AdvanceOperation from './operations/AdvanceOperation'
import DegradeOperation from './operations/DegradeOperation'
import AddEntityOperation from './operations/AddEntityOperation'
import ReportOperation from './operations/ReportOperation'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../redux/actions';

import OptionsStyles from '../../../Styles/CollectionPanelStyles/OptionsStyles'

const mapOfOperations = {
    "Ban":BanOperation,
    "Cancel":CancelAcceptOperation,
    "Delete":DeleteOperation,
    "Unlock":UnlockOperation,
    "Accept":AcceptOperation,
    "Advance":AdvanceOperation,
    "Degrade":DegradeOperation,
    "Add":AddEntityOperation,
    "Report":ReportOperation
};

class OptionPanel extends Component {
    groupOperationsThreeInRows(operations){
        let groupedOperations = [];
        for(let i=0;i<operations.length/3;i++){
            let operationsGroup = [];
            if(i*3<operations.length) operationsGroup.push(operations[i*3]);
            if(i*3+1<operations.length) operationsGroup.push(operations[i*3+1]);
            if(i*3+2<operations.length) operationsGroup.push(operations[i*3+2]);
            groupedOperations.push(
                <View style={OptionsStyles.buttonRow} key={i}>
                    {operationsGroup}
                </View>
            )
        }
        return groupedOperations;
    }

    groupOperationsFourInRows(operations){
        let groupedOperations = [];
        for(let i=0;i<operations.length/4;i++){
            let operationsGroup = [];
            if(i*4<operations.length) operationsGroup.push(operations[i*4]);
            if(i*4+1<operations.length) operationsGroup.push(operations[i*4+1]);
            if(i*4+2<operations.length) operationsGroup.push(operations[i*4+2]);
            if(i*4+3<operations.length) operationsGroup.push(operations[i*4+3]);
            groupedOperations.push(
                <View style={OptionsStyles.buttonRow} key={i}>
                    {operationsGroup}
                </View>
            )
        }
        return groupedOperations;
    }

    calculateLeftMargin(isPortrait, numberOfElements){
        let elementWidth = 90;
        if(numberOfElements>2){
            if(isPortrait){
                let numberOfElementsInRow = 3;
                return (this.props.dimension.width - numberOfElementsInRow*elementWidth)/2;
            }
            else{
                let numberOfElementsInRow = 4;
                return (this.props.dimension.width -numberOfElementsInRow*elementWidth)/2;
            }
        }
        else{
            return (this.props.dimension.width - numberOfElements*elementWidth)/2;
        }
    }

    render() {
        let operations = [];

        this.props.possibleOperations.forEach(operation => {
            let operationElement = mapOfOperations[operation];
            if(operationElement !== undefined)
            operations.push(
                React.createElement(
                    operationElement,
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
                    <View>
                    {isPortrait? this.groupOperationsThreeInRows(operations):this.groupOperationsFourInRows(operations)}
                    </View>
                    <View style={OptionsStyles.button}><Button onPress={() => this.props.onClosePanel()} title="Close" color="#4b371b"/></View>
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