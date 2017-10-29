import React from 'react';
import {PickerField} from 'react-native-form-generator';

export default class GameInput extends React.Component{
    constructor(props) {
        super(props);
    }

    changeInput(value){
        let result = value;
        if(value==="")
            result = this.props.value;

        this.props.changeSearchForm(
            this.props.indexOfSearchFields,
            {
                "keys":this.props.keys,
                "operation":this.props.operation,
                "value":[result]
            }
        );
    }

    render(){
        return(
            <PickerField
                value={this.props.value}
                onValueChange={(value)=>this.changeInput(value)}
                label={this.props.name}
                options={this.props.options}/>
        )
    }
}
