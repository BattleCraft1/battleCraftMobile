import React from 'react';
import {
    View,
    Button
} from 'react-native';
import Exponent, {DocumentPicker} from 'expo';

export default class GameRulesInput extends React.Component{

    uploadGameRules = async () => {
        let pickerResult = await DocumentPicker.getDocumentAsync({
            type: 'application/pdf'
        });
        if (!pickerResult.cancelled) {
            this.props.changeEntity(this.props.fieldName,pickerResult.uri);
        }
    };

    render(){
        return(
            <View style={{alignItems:'center',justifyContent:'center',marginTop:10}}>
                <Button
                    title="Upload Rules"
                    color='#4b371b'
                    onPress = {this.uploadGameRules}
                />
            </View>
        )
    }
}
