import React from 'react';
import {InputField} from 'react-native-form-generator';
import {
    Text,
    View
} from 'react-native';

export default class NumberInput extends React.Component{
    constructor(props) {
        super(props);
    }

    changeInput(value){
        let result = {};
        if(value!=="" && !isNaN(parseInt(value)))
            result = {
                "keys":this.props.keys,
                "operation":this.props.operation,
                "value":[parseInt(value)]
            };
        this.props.changeSearchForm(
            this.props.indexOfSearchFields,
            result
        );
    }

    render(){
        return(
            <View>
                <Text>{this.props.name}</Text>
                <InputField
                    onValueChange={(value)=>this.changeInput(value)}
                    keyboardType = 'numeric'
                    placeholder = {this.props.placeholder}
                />
            </View>
        )
    }
}
