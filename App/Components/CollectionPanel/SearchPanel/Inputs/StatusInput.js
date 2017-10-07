import React from 'react';
import {PickerField} from 'react-native-form-generator';

export default class TournamentStatus extends React.Component{
    constructor(props) {
        super(props);
    }

    changeInput(event){
        let value = event.nativeEvent.text;
        if(value!==""){
            if(this.status.value==='BANNED')
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
    }

    render(){
        return(
            <PickerField
                onChange={this.changeInput.bind(this)}
                label='Status'
                options={this.props.options}/>
        )
    }
}
