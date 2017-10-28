import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    ScrollView
} from 'react-native';

import AddStyle from '../../../../Styles/AddStyle'
import MainStyles from '../../../../Styles/MainStyles'
import TableStyles from '../../../../Styles/TableStyles'


import { Form } from 'react-native-form-generator';

export default class PanelContent extends Component {

    constructor(props) {
        super(props);

        this.state={
        }
    }


    render() {
        return (
            <View style={{flex:1}}>
                <View style={[AddStyle.formWindow, {flex:1, paddingTop: 10}]}>
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