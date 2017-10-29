import React from 'react';
import {InputField} from 'react-native-form-generator';


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
            <InputField
                onValueChange={(value)=>this.changeInput(value)}
                placeholder={this.props.name}
            />
        )
    }
}
