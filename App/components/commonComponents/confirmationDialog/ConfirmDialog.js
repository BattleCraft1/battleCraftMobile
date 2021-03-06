import React from 'react';
import {
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../redux/actions/index';
import { bindActionCreators } from 'redux';

import Modal from 'react-native-modal';
import MainStyles from '../../../Styles/UniversalStyles/MainStyles'
import MessageStyle from '../../../Styles/UniversalStyles/MessageStyle'

class ConfirmDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <Modal
                isVisible={this.props.confirmation.isShown}
                backdropOpacity={0.3}
            >
                <View style={ [MessageStyle.modalContainer,{marginLeft: ((this.props.dimension.width-340)/2),}] }>
                    <View style={ MessageStyle.modalHeader }>
                        <Text style={[MainStyles.textStyle,{fontSize: 21, justifyContent:'center'}]}>{this.props.confirmation.header}</Text>
                    </View>
                    <View style={MessageStyle.modalBody}>
                        <Text style={MainStyles.smallWhiteStyle }>{this.props.confirmation.message}</Text>
                    </View>
                    <View style={MessageStyle.modalFooter} >

                        <View style={MessageStyle.modalFooterButton}>
                            <TouchableHighlight
                                onPress={() => {
                                    this.props.playSound('toggle');
                                    this.props.confirmation.onConfirmFunction();
                                    this.props.hideConfirmationDialog();
                                }}>
                                    <Text style={[MainStyles.smallWhiteStyle, MainStyles.stretch]}>Confirm</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={MessageStyle.modalFooterButton}>
                            <TouchableHighlight
                                onPress={() => {
                                    this.props.playSound('toggle');
                                    this.props.hideConfirmationDialog();
                                }}>
                                    <Text style={[MainStyles.smallWhiteStyle, MainStyles.stretch]}>Cancel</Text>
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
        dimension: state.dimension
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( ConfirmDialog );