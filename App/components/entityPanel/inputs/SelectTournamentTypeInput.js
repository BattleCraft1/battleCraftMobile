import React from 'react';
import {PickerField} from 'react-native-form-generator';

const typeMap = {
    "":"",
    "Duel":2,
    "Group":4
};

export default class SelectInput extends React.Component{

    render(){
        return(
            <PickerField
                onValueChange={(value)=>this.props.changeEntity(this.props.fieldName,typeMap[value])}
                label={this.props.name}
                value = {this.props.value}
                disabled={this.props.disabled}
                options={this.props.options}/>
        )
    }
}
