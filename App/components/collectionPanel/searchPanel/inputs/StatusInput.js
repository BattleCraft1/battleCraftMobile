import React from 'react';
import {PickerField} from 'react-native-form-generator';
import {
    Text,
    View
} from 'react-native';
import MainStyles from 'battleCraftMobile/App/Styles/UniversalStyles/MainStyles'
import InputStyles from 'battleCraftMobile/App/Styles/UniversalStyles/InputStyles'

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
            <View style={InputStyles.inputCard}>
                <View style={InputStyles.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>Status:</Text></View>
                <PickerField
                    onValueChange={(value)=>this.changeInput(value)}
                    options={this.props.options}/>
            </View>
        )
    }
}
