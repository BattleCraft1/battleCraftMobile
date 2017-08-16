import React from 'react';
import {
    Text,
    View,
    Button
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
            console.log(this.props.confirmation.isShown);
        return (
            <View>
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
                                <Button
                                    style={ConfirmationStyles.modalFooterButton}
                                    onPress={() => {
                                        this.props.confirmation.onConfirmFunction();
                                        this.hideConfirmationDialog();
                                    }}
                                    title="Ok"
                                    color="#595959"
                                />
                                <Button
                                    style={ConfirmationStyles.modalFooterButton}
                                    onPress={() => {
                                        this.hideConfirmationDialog();
                                    }}
                                    title="Cancel"
                                    color="#595959"
                                />
                            </View>
                        </View>
                </Modal>
            </View>
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