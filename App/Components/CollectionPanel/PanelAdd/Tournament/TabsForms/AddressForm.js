/**
 * Created by FBegiello on 20.10.2017.
 */
import React, { Component } from 'react';
import {
    View,
    Button,
    ScrollView,
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
                    <Form ref="addressForm">
   
                    </Form>
                </ScrollView>
            </View>
        );
    }
}

