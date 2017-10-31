import React from 'react';
import {
    View,
    Button,
} from 'react-native';

export default class OpenOperationsButton extends React.Component {

    render() {
        return (
            <View style={{flex:1}}>
                <View style={{flex:1, marginRight: 3}}>
                    <Button title={"Options"} color='#4b371b'
                            onPress={this.props.action.bind(this)}/></View>
            </View>
        );
    }
}
