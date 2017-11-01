import React from 'react';
import {InputField} from 'react-native-form-generator';
import {
    Text,
    View
} from 'react-native';
import EntityPanelInputsStyles from '../../../Styles/EntityPanelInputsStyles'

export default class NumberInput extends React.Component{
    render(){
        return(
            <View style={EntityPanelInputsStyles.inputStyle}>
                <Text>{this.props.name}</Text>
                <InputField
                    onValueChange={(value)=>{this.props.changeEntity(this.props.fieldName,parseInt(value))}}
                    value = {this.props.value.toString()}
                    editable={!this.props.disabled}
                    placeholder={this.props.placeholder}
                    keyboardType = 'numeric'
                />
            </View>
        )
    }
}
