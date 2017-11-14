import React from 'react';
import {
    Text,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import BaseColours from "battleCraftMobile/App/main/consts/BaseColours"
import ValidationStyles from 'battleCraftMobile/App/Styles/ValidationStyles'

export default class ValidationErrorMessage extends React.Component{

    render(){
        if(this.props.validationErrorMessage!=="") {
            return (
                <View style={ValidationStyles.messageBackground}>
                    <View style={ValidationStyles.iconStyle}><Icon name={"exclamation-circle"} size={32} color={BaseColours.misc.deepRed}/></View>
                    <View style={ValidationStyles.warningContainer}><Text style={ValidationStyles.warningText}>{this.props.validationErrorMessage}</Text></View>
                </View>
            )
        }
        else
        {
            return(<View/>)
        }
    }
}
