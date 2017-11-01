import React from 'react';
import {PickerField} from 'react-native-form-generator';
import EntityPanelInputsStyles from '../../../Styles/EntityPanelInputsStyles'
import {
    Text,
    View
} from 'react-native';

const typeMap = {
    "Duel":2,
    "Group":4
};

export default class SelectInput extends React.Component{

    render(){
        return(
            <View style={EntityPanelInputsStyles.inputStyle}>
                <PickerField
                    onValueChange={(value)=>this.props.changeEntity(this.props.fieldName,typeMap[value])}
                    label={this.props.name}
                    value = {this.props.value===2?"Duel":"Group"}
                    editable={!this.props.disabled}
                    options={this.props.options}/>
            </View>
        )
    }
}
