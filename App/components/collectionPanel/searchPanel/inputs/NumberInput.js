import React from 'react';
import {InputField} from 'react-native-form-generator';

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
            <InputField
                onValueChange={(value)=>this.changeInput(value)}
                keyboardType = 'numeric'
                placeholder={this.props.name}
            />
        )
    }
}
