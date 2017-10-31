import React from 'react';
import {
    Text,
    View
} from 'react-native';

export default class ValidationErrorMessage extends React.Component{

    render(){
        return(
            <View >
                {
                    this.props.validationErrorMessage!=="" &&
                    <Text style={{textColor:'red',marginTop:2,marginBottom:2}}>{this.props.validationErrorMessage}</Text>
                }
            </View>
        )
    }
}
