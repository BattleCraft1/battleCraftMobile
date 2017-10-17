/**
 * Created by FBegiello on 17.10.2017.
 */


import React, { Component } from 'react';
import {
    View,
    Text,
    Button,

} from 'react-native';

import Modal from 'react-native-modal';

import TournamentPanelContent from './Tournament/PanelContent';

import MainStyle from '../../../Styles/MainStyles';
import AddStyle from '../../../Styles/AddStyle';

export default class PanelAdd extends Component {

    constructor(props) {
        super(props);
    }

    setContent(){
        switch (this.props.collectionType) {
            case "tournaments":
                return <TournamentPanelContent/>;
            default:
                return <View style={{flex: 1}}/>;
        }
    }

    actionButton() {
        //handle action

        //close panel
    }

    render() {
        let content = this.setContent();

        return (
            <Modal isVisible={this.props.isVisible} backdropOpacity={0.3}>
                <View style={AddStyle.modal}>
                    <View style={[AddStyle.title,{alignItems:'center'}]}>
                        <Text style={[MainStyle.textStyle,{fontSize: 22}]}>Add {this.props.collectionType.slice(0, -1)}</Text>
                    </View>

                    {content}

                    <View style={AddStyle.buttonRow}>
                        <View style={AddStyle.button}><Button title={"Close"} color='#721515' onPress={() => this.props.onClosePanel()}/></View>
                        <View style={AddStyle.button}><Button title={this.props.action} color='#721515' onPress={() => this.actionButton}/></View>
                    </View>
                </View>
            </Modal>
        );
    }
}