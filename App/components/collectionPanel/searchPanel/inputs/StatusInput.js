import React from 'react';
import {PickerField} from 'react-native-form-generator';

export default class TournamentStatus extends React.Component{
    constructor(props) {
        super(props);
    }

    changeInput(value){
        let result = {};
        if(value!==""){
            if(value==='BANNED')
                result = {
                    "keys":["banned"],
                    "operation":":",
                    "value":[true]
                };
            else
                result ={
                    "keys":["status"],
                    "operation":":",
                    "value":[value]
                };
        }

        this.props.changeSearchForm(
            "status",
            result
        );
    }

    render(){
        return(
            <PickerField
                onValueChange={(value)=>this.changeInput(value)}
                label='Status'
                options={this.props.options}/>
        )
    }
}
