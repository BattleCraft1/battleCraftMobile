import React from 'react';
import {InputField} from 'react-native-form-generator';
import EntityPanelInputsStyles from '../../../Styles/CollectionPanelStyles/EntityPanelInputsStyles'
import {
    Text,
    View
} from 'react-native';

export default class NumberInput extends React.Component{
    render(){
        return(
            <View style={EntityPanelInputsStyles.inputStyle}>
                <Text>{this.props.name}</Text>
                <InputField
                    multiline={true}
                    onValueChange={(value)=>{this.props.changeEntity(this.props.fieldName,value)}}
                    value = {this.props.value}
                    placeholder={this.props.placeholder}
                    editable={!this.props.disabled}
                />
            </View>
        )
    }
}
