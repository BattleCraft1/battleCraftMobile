import React from 'react';
import {PickerField} from 'react-native-form-generator';
import {
    Text,
    View
} from 'react-native';
import EntityPanelInputsStyles from '../../../Styles/CollectionPanelStyles/EntityPanelInputsStyles'

export default class SelectInput extends React.Component{

    render(){
        return(
            <View style={EntityPanelInputsStyles.inputStyle}>
                <PickerField
                    onValueChange={(value)=>{
                        if(this.props.disabled) return;
                        this.props.changeEntity(this.props.fieldName,value)}}
                    label={this.props.name}
                    value = {this.props.value}
                    enabled={!this.props.disabled}
                    options={this.props.options}/>
            </View>
        )
    }
}
