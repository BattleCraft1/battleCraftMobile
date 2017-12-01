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

import {InputField} from 'react-native-form-generator';
import {serverName} from "../../../main/consts/serverName";
import axios from "axios";

class ReportPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reportContent:""
        }
    }

    sendReport(){
        console.log("elements");
        console.log(this.props.reportPanel.objectNames);
        let reportDTO = {
            objectNames: this.props.reportPanel.objectNames,
            objectType:this.props.reportPanel.objectType,
            reportMessage:this.state.reportContent
        };
        this.props.startLoading("Sending report...");
        axios.post(serverName+`report`,reportDTO,
            {
                headers: {
                    "X-Auth-Token":this.props.security.token
                }
            })
            .then(res => {
                this.props.stopLoading();
                this.props.showReportPanel(false,"",[]);
                this.props.showSuccessMessage(this.getSuccessMessage(this.props.reportPanel.objectNames));
            })
            .catch(error => {
                this.props.stopLoading();
                this.props.showReportPanel(false,"",[]);
                this.props.showNetworkErrorMessage(error);
            });
    }

    getSuccessMessage(reportedElementsNames){
        return "Elements "+reportedElementsNames.join(", ")+" are reported to ban";
    }

    render(){
        return (
            <Modal
                isVisible={this.props.reportPanel.isShown}
                backdropOpacity={0.3}
            >
                <View style={ [MessageStyle.modalContainer,{marginLeft: ((this.props.dimension.width-340)/2),}] }>
                    <View style={ MessageStyle.modalHeader }>
                        <Text style={[MainStyles.textStyle,{fontSize: 21, justifyContent:'center'}]}>Report elements</Text>
                    </View>
                    <View style={MessageStyle.reportModalBody}>
                        <View/>
                            <InputField
                                style={{flex:1}}
                                multiline={true}
                                onValueChange={(value)=>{this.setState({reportContent:value})}}
                                value = {this.state.reportContent}
                                placeholder="Reasons of report"
                            />
                    </View>
                    <View style={MessageStyle.modalFooter} >

                        <View style={MessageStyle.modalFooterButton}>
                            <TouchableHighlight
                                onPress={() => {
                                    this.sendReport();
                                }}>
                                <Text style={[MainStyles.smallWhiteStyle, MainStyles.stretch]}>Confirm</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={MessageStyle.modalFooterButton}>
                            <TouchableHighlight
                                onPress={() => {
                                    this.props.showReportPanel(false,"",[]);
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
        reportPanel: state.reportPanel,
        security: state.security,
        dimension: state.dimension
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( ReportPanel );