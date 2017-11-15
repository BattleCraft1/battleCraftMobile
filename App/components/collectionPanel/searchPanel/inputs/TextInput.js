import React from 'react';
import {InputField} from 'react-native-form-generator';
import {
    Text,
    View
} from 'react-native';

import MainStyles from 'battleCraftMobile/App/Styles/MainStyles'
import InputStyles from 'battleCraftMobile/App/Styles/InputStyles'

export default class TextInput extends React.Component{
    constructor(props) {
        super(props);
    }

    changeInput(value){
        if(value !=="")
            this.props.changeSearchForm(
                this.props.indexOfSearchFields,
                {
                    "keys":this.props.keys,
                    "operation":this.props.operation,
                    "value":[value]
                }
            );
        else
            this.props.changeSearchForm(
                this.props.indexOfSearchFields,
                {}
            )
    }

    render(){
        return(
            <View style={InputStyles.inputCard}>
                <View style={InputStyles.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>{this.props.name}</Text></View>
                <InputField
                    onValueChange={(value)=>this.changeInput(value)}
                    placeholder = {this.props.placeholder}
                />
            </View>
        )
    }
}
