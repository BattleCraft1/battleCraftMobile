import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    ScrollView
} from 'react-native';

import AddStyle from '../../../../Styles/AddStyle'

export default class PanelContent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex:1}}>
                <View>
                    <View style={AddStyle.buttonRow}>
                        <View style={AddStyle.button}><Button title={"Card 1"} color='#4b371b' onPress={() => {}}/></View>
                        <View style={AddStyle.button}><Button title={"Card 2"} color='#4b371b' onPress={() => {}}/></View>
                    </View>
                    <View style={AddStyle.buttonRow}>
                        <View style={AddStyle.button}><Button title={"Card 3"} color='#4b371b' onPress={() => {}}/></View>
                        <View style={AddStyle.button}><Button title={"Card 4"} color='#4b371b' onPress={() => {}}/></View>
                    </View>
                </View>

                <ScrollView keyboardShouldPersistTaps='always' style={{paddingLeft:10,paddingRight:10}}>
                    <Text>dfkgj87u39u3429ij m94ijdfgm9 0i934k9esjf, 908</Text>
                </ScrollView>
            </View>
        );
    }
}