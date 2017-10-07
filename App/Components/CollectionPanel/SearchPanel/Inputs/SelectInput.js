import React from 'react';
import {PickerField} from 'react-native-form-generator';

export default class SelectInput extends React.Component{
    constructor(props) {
        super(props);
    }

    changeInput(event){
        let value = event.nativeEvent.text;
        if(value!=="")
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
            <PickerField
                onChange={this.changeInput.bind(this)}
                label={this.props.name}
                options={this.props.options}/>
        )
    }
}
