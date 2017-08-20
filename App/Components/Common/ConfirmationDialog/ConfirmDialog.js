import React from 'react';
import {
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../Redux/actions/index';
import { bindActionCreators } from 'redux';

import Modal from 'react-native-modal';
import ConfirmationStyles from '../../../Styles/ConfirmationStyles'

class ConfirmDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    hideConfirmationDialog(){
        let confirmation=this.props.confirmation;
        confirmation.isShown=false;
        this.forceUpdate();
    }

    render(){
        return (
            <Modal
                isVisible={this.props.confirmation.isShown}
                backdropOpacity={0.3}
            >
                <View style={ ConfirmationStyles.modalContainer }>
                    <View style={ ConfirmationStyles.modalHeader }>
                        <Text style={ConfirmationStyles.modalHeaderText }>{this.props.confirmation.header}</Text>
                    </View>
                    <View style={ConfirmationStyles.modalBody}>
                        <Text style={ConfirmationStyles.modalBodyText }>{this.props.confirmation.message}</Text>
                    </View>
                    <View style={ConfirmationStyles.modalFooter} >

                        <View style={ConfirmationStyles.modalFooterButton}>
                            <TouchableHighlight
                                onPress={() => {
                                    this.props.confirmation.onConfirmFunction();
                                    this.hideConfirmationDialog();
                                }}>
                                    <Text style={{color:'#ffffff'}}>Confirm</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={ConfirmationStyles.spaceBetweenButtons}/>
                        <View style={ConfirmationStyles.modalFooterButton}>
                            <TouchableHighlight
                                onPress={() => {
                                    this.hideConfirmationDialog();
                                }}>
                                    <Text style={{color:'#ffffff'}}>Cancel</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        confirmation: state.confirmation,
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( ConfirmDialog );