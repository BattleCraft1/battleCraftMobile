import React from 'react';
import {InputField} from 'react-native-form-generator';
import {
    Text,
    View
} from 'react-native';


export default class TextInput extends React.Component{
    constructor(props) {
        super(props);
    }

    changeInput(value){
        if(value !=="")
            this.props.changeSearchForm(
                this.props.indexOfSearchFields,
                {
                    "keys":this.props.keys,
                    "operation":this.props.operation,
                    "value":[value]
                }
            );
        else
            this.props.changeSearchForm(
                this.props.indexOfSearchFields,
                {}
            )
    }

    render(){
        return(
            <View>
                <Text>{this.props.name}</Text>
                <InputField
                    onValueChange={(value)=>this.changeInput(value)}
                    placeholder = {this.props.placeholder}
                />
            </View>
        )
    }
}
