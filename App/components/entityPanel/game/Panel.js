import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    ScrollView
} from 'react-native';

import EntityPanelStyle from '../../../Styles/EntityPanelStyle'

import { Form } from 'react-native-form-generator';

export default class PanelContent extends Component {

    render() {
        return (
            <View style={{flex:1}}>
                <View style={[EntityPanelStyle.formWindow, {flex:1, paddingTop: 10}]}>
                    <Form ref="game">
                        <View>
                            <Text>Input game name here</Text>
                        </View>
                        <Button title={"Upload rules"} color='#4b371b' onPress={() => {}}/>
                    </Form>
                </View>
            </View>
        );
    }
}