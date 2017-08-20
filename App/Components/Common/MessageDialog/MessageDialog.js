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
import MessageStyles from '../../../Styles/MessageStyle'

class MessageDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    hideMessageDialog(){
        let message=this.props.message;
        message.isShown=false;
        this.forceUpdate();
    }

    render(){
        return (
            <Modal
                isVisible={this.props.message.isShown}
                backdropOpacity={0.3}
            >
                <View style={ MessageStyles.modalContainer }>
                    <View style={ MessageStyles.modalHeader }>
                        <Text style={MessageStyles.modalHeaderText }>{this.props.message.messageType}</Text>
                    </View>
                    <View style={MessageStyles.modalBody}>
                        <Text style={MessageStyles.modalBodyText }>{this.props.message.messageText}</Text>
                    </View>
                    <View style={MessageStyles.modalFooter} >

                        <View style={MessageStyles.modalFooterButton}>
                            <TouchableHighlight
                                onPress={() => {
                                    this.hideMessageDialog();
                                }}>
                                <Text style={{color:'#ffffff'}}>Ok</Text>
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
        message: state.message,
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( MessageDialog );