import React from 'react';
import {DatePickerField} from 'react-native-form-generator';

export default class DateInput extends React.Component{
    constructor(props) {
        super(props);
    }

    changeInput(value){
        let result = {};
        if(value !=="")
            result = {
                "keys":this.props.keys,
                "operation":this.props.operation,
                "value":value
            };
        this.props.changeSearchForm(
            this.props.indexOfSearchFields,
            result
        );
    }

    render(){
        return(
            <DatePickerField
                onValueChange={(value)=>this.changeInput(value)}
                minimumDate={new Date('1/1/1900')}
                maximumDate={new Date('1/1/2100')}
                placeholder={this.props.name}
                style={{backgroundColor:'#a58e60',}}/>
        )
    }
}
