import React from 'react';
import {InputField} from 'react-native-form-generator';


export default class TextInput extends React.Component{
    constructor(props) {
        super(props);
    }

    changeInput(event){
        let value = event.nativeEvent.text;
        if(value !=="")
            this.props.changeSearchForm(
                this.props.indexOfSearchFields,
                {
                    "keys":this.props.keys,
                    "operation":this.props.operation,
                    "value":value
                }
             )
          }

    render(){
        return(
            <InputField
                onChange={this.changeInput.bind(this)}
                placeholder={this.props.name}
            />
        )
    }
}
