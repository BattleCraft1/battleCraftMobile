import React from 'react';
import {PickerField} from 'react-native-form-generator';

export default class SelectInput extends React.Component{
    constructor(props) {
        super(props);
    }

    changeInput(value){
        let result = {};
        if(value!=="")
            result = {
                "keys":this.props.keys,
                "operation":this.props.operation,
                "value":[value]
            };
        this.props.changeSearchForm(
            this.props.indexOfSearchFields,
            result
        );
    }

    render(){
        return(
            <PickerField
                onValueChange={(value)=>this.changeInput(value)}
                label={this.props.name}
                options={this.props.options}/>
        )
    }
}
