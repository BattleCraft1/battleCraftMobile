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
import MainStyles from '../../../Styles/MainStyles'
import MessageStyle from '../../../Styles/MessageStyle'

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
                <View style={ MessageStyle.modalContainer }>
                    <View style={ MessageStyle.modalHeader }>
                        <Text style={[MainStyles.textStyle,{fontSize: 21, justifyContent:'center'}]}>{this.props.confirmation.message}</Text>
                    </View>
                    <View style={MessageStyle.modalBody}>
                        <Text style={MainStyles.smallWhiteStyle }>{this.props.confirmation.header}</Text>
                    </View>
                    <View style={MessageStyle.modalFooter} >

                        <View style={MessageStyle.modalFooterButton}>
                            <TouchableHighlight
                                onPress={() => {
                                    this.props.confirmation.onConfirmFunction();
                                    this.hideConfirmationDialog();
                                }}>
                                    <Text style={[MainStyles.smallWhiteStyle, MainStyles.centering]}>Confirm</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={MessageStyle.modalFooterButton}>
                            <TouchableHighlight
                                onPress={() => {
                                    this.hideConfirmationDialog();
                                }}>
                                    <Text style={[MainStyles.smallWhiteStyle, MainStyles.centering]}>Cancel</Text>
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