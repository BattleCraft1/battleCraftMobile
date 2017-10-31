import React from 'react';
import {InputField} from 'react-native-form-generator';
import {
    Text,
    View
} from 'react-native';

export default class NumberInput extends React.Component{
    render(){
        return(
            <View>
                <Text>{this.props.name}</Text>
                <InputField
                    value = {this.props.value}
                    editable={false}
                />
            </View>
        )
    }
}
