import React from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';

import {View,TouchableHighlight,Text} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import dateFormat from 'dateformat';

import DateInputStyles from '../../../../Styles/DateInputStyles'

export default class DateInput extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            isDateTimePickerVisible: false,
            value : ""
        };
    }

    changeInput(value){
        this.setState({ isDateTimePickerVisible: false });
        let result = {};

        if(value !==""){
            this.setState({value:dateFormat((value),"dd-MM-yyyy")});
            result = {
                "keys":this.props.keys,
                "operation":this.props.operation,
                "value":[value]
            };
            this.props.changeSearchForm(
                this.props.indexOfSearchFields,
                result
            );
        }
    }

    clearDate(){
        this.setState({value:""});
        this.props.changeSearchForm(this.props.indexOfSearchFields, {});
    }

    render(){
        return(
            <View>
                <Text>{this.props.name}</Text>
                <View style={DateInputStyles.dateInputMainView}>
                    <TouchableHighlight style={DateInputStyles.dateInputButton} onPress={() => this.setState({ isDateTimePickerVisible: true })}>
                        <Text style={{fontSize: 20}}>{this.state.value}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={DateInputStyles.clearButton} onPress={this.clearDate.bind(this)}>
                        <Icon name="remove" size={25}/>
                    </TouchableHighlight>
                </View>
                <DateTimePicker
                    mode='date'
                    minimumDate={new Date()}
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.changeInput.bind(this)}
                    onCancel={() => this.setState({ isDateTimePickerVisible: false })}
                />
            </View>
        )
    }
}
