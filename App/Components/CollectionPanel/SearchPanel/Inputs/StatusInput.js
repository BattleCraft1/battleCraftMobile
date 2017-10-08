import React from 'react';
import {PickerField} from 'react-native-form-generator';

export default class TournamentStatus extends React.Component{
    constructor(props) {
        super(props);
    }

    changeInput(value){
        if(value!==""){
            if(value==='BANNED')
                this.props.changeSearchForm(
                "status",
                    {
                        "keys":["banned"],
                        "operation":":",
                        "value":true
                    }
                );
            else
                this.props.changeSearchForm(
                    "status",
                    {
                        "keys":["status"],
                        "operation":":",
                        "value":value
                    }
                );
        }
        else
            this.props.changeSearchForm(
                "status",
                {}
            )
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
