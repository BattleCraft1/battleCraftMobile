import React from 'react';
import {PickerField} from 'react-native-form-generator';

export default class SelectInput extends React.Component{

    render(){
        return(
            <PickerField
                onValueChange={(value)=>this.props.changeEntity(this.props.fieldName,value)}
                label={this.props.name}
                value = {this.props.value}
                editable={!this.props.disabled}
                options={this.props.options}/>
        )
    }
}
