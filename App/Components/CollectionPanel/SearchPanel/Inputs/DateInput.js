import React from 'react';
import {DatePickerField} from 'react-native-form-generator';

export default class DateInput extends React.Component{
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
            );
    }

    render(){
        return(
            <div>
                <span style={styles.optionLabel}>{this.props.name}:</span>
                <DatePickerField
                    onChange={this.changeInput.bind(this)}
                    minimumDate={new Date('1/1/1900')}
                    maximumDate={new Date()}
                    placeholder='Start date'
                    style={{backgroundColor:'#a58e60',}}/>
            </div>
        )
    }
}
