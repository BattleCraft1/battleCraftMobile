import React from 'react';
import {PickerField} from 'react-native-form-generator';
import {
    Text,
    View
} from 'react-native';
import MainStyles from 'battleCraftMobile/App/Styles/UniversalStyles/MainStyles'
import InputStyles from 'battleCraftMobile/App/Styles/UniversalStyles/InputStyles'

export default class GameInput extends React.Component{
    constructor(props) {
        super(props);
    }

    changeInput(value){
        let result = value;
        if(value==="")
            result = this.props.value;

        this.props.changeSearchForm(
            this.props.indexOfSearchFields,
            {
                "keys":this.props.keys,
                "operation":this.props.operation,
                "value":[result]
            }
        );
    }

    render(){
        return(
            <View style={InputStyles.inputCard}>
                <View style={InputStyles.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>{this.props.name}</Text></View>
                <PickerField
                    value={this.props.value}
                    onValueChange={(value)=>this.changeInput(value)}
                    options={this.props.options}/>
            </View>
        )
    }
}
