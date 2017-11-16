import React from 'react';
import EntityPanelInputsStyles from '../../../Styles/CollectionPanelStyles/EntityPanelInputsStyles'
import {
    Text,
    View
} from 'react-native';

export default class NumberInput extends React.Component{
    render(){
        return(
            <View style={[EntityPanelInputsStyles.inputStyle,{flexDirection:'column'}]}>
                <Text style={{flex:1}}>{this.props.name}</Text>
                <Text style={[EntityPanelInputsStyles.outputTextStyle,{flex:1}]}>{this.props.value}</Text>
            </View>
        )
    }
}
