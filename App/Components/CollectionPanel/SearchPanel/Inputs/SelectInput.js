import React from 'react';
import {PickerField} from 'react-native-form-generator';

export default class SelectInput extends React.Component{
    constructor(props) {
        super(props);
    }

    changeInput(value){
        if(value!=="")
            this.props.changeSearchForm(
                this.props.indexOfSearchFields,
                {
                    "keys":this.props.keys,
                    "operation":this.props.operation,
                    "value":value
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
            <PickerField
                onValueChange={(value)=>this.changeInput(value)}
                label={this.props.name}
                options={this.props.options}/>
        )
    }
}
