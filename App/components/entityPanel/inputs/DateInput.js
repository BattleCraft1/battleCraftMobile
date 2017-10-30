import React from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';

import {View,TouchableHighlight,Text} from 'react-native';

import dateFormat from 'dateformat';

import DateInputStyles from '../../../Styles/DateInputStyles'

export default class DateInput extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            isDatePickerVisible: false,
            isTimePickerVisible: false,
            dateValue : "",
            timeValue : ""
        };
    }

    componentDidMount() {
        this.setState({dateValue: dateFormat(this.props.value,"yyyy-mm-dd")});
        this.setState({timeValue: dateFormat(this.props.value,"HH:MM")});
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.value !== undefined &&
            nextProps.value !== this.props.value){
            this.setState({dateValue: dateFormat(nextProps.value,"yyyy-mm-dd")});
            this.setState({timeValue: dateFormat(nextProps.value,"HH:MM")});
        }
    }

    onTimeChange(value){
        this.setState({ isTimePickerVisible: false });
        let dateString = new Date(this.state.dateValue+" "+dateFormat(value));
        this.props.changeEntity(this.props.fieldName,dateString)
    }

    onDateChange(value){
        this.setState({ isDatePickerVisible: false });
        let dateString = new Date(dateFormat(value)+" "+this.state.timeValue);
        this.props.changeEntity(this.props.fieldName,dateString)
    }

    render(){
        return(
            <View>
                <Text>{this.props.name}</Text>
                <View style={DateInputStyles.inputMainView}>
                    <TouchableHighlight style={DateInputStyles.dateInputButton} onPress={() => this.setState({ isDatePickerVisible: true })}>
                        <Text style={{fontSize: 15}}>{this.state.dateValue}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={DateInputStyles.dateInputButton} onPress={() => this.setState({ isTimePickerVisible: true })}>
                        <Text style={{fontSize: 15}}>{this.state.timeValue}</Text>
                    </TouchableHighlight>
                </View>
                <DateTimePicker
                    mode='date'
                    minimumDate={new Date()}
                    isVisible={this.state.isTimePickerVisible}
                    onConfirm={this.onDateChange.bind(this)}
                    onCancel={() => this.setState({ isTimePickerVisible: false })}
                />
                <DateTimePicker
                    is24Hour={true}
                    mode='time'
                    minimumDate={new Date()}
                    isVisible={this.state.isDatePickerVisible}
                    onConfirm={this.onTimeChange.bind(this)}
                    onCancel={() => this.setState({ isDatePickerVisible: false })}
                />
            </View>
        )
    }
}
