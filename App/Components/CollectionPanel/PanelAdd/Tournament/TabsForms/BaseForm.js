/**
 * Created by FBegiello on 20.10.2017.
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Button
} from 'react-native';

import {Form} from 'react-native-form-generator';


import TableStyles from '../../../../../Styles/TableStyles'
import MainStyles from '../../../../../Styles/MainStyles'
import ListColours from '../../../../../Main/consts/ListColours'

export default class AddresForm extends Component{

    constructor(props) {
        super(props);

    }


    render(){
        return(
            <View>
                <ScrollView>
                    <Form ref="baseForm">
                        <View style={{flex:1}}>

                        </View>
                        <Button title={"Save base info"} color='#4b371b' onPress={()=>{/*todo - save input from form to state and pass to main component*/}}/>
                    </Form>
                </ScrollView>
            </View>
        );
    }
}

