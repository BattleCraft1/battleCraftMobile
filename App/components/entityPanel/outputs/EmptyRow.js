/**
 * Created by FBegiello on 20.10.2017.
 */
import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

import TableStyles from '../../../Styles/TableStyles'
import MainStyles from '../../../Styles/MainStyles'
import ListColours from '../../../main/consts/ListColours'

export default class EmptyRow extends Component{
    render(){
        return(
            <View style={[TableStyles.row, {flexDirection: 'row'}]}>
                <View style={{backgroundColor: ListColours.users.NEW, flex: 1}}>
                    <Text style={[MainStyles.smallWhiteStyle, {padding:3}]}>EMPTY</Text>
                </View>
            </View>
        );
    }
}
