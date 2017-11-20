import React from 'react';
import {PickerField} from 'react-native-form-generator';
import {
    Text,
    View
} from 'react-native';
import MainStyles from 'battleCraftMobile/App/Styles/UniversalStyles/MainStyles'
import InputStyles from 'battleCraftMobile/App/Styles/UniversalStyles/InputStyles'

const typeMap = {
    "":"",
    "Duel":2,
    "Group":4
};

export default class SelectInput extends React.Component{
    constructor(props) {
        super(props);
    }

    changeInput(value){
        let result = {};
        if(value!=="")
            result = {
                "keys":this.props.keys,
                "operation":this.props.operation,
                "value":[typeMap[value]]
            };
        this.props.changeSearchForm(
            this.props.indexOfSearchFields,
            result
        );
    }

    render(){
        return(
            <View style={InputStyles.inputCard}>
                <View style={InputStyles.inputText}><Text style={[MainStyles.smallWhiteStyle, {fontWeight:'bold'}]}>{this.props.name}</Text></View>
                <PickerField
                    onValueChange={(value)=>this.changeInput(value)}
                    options={this.props.options}/>
            </View>
        )
    }
}
