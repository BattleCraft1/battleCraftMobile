import React from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';

import {View,TouchableHighlight,Text} from 'react-native';

import dateFormat from 'dateformat';

import DateInputStyles from '../../../Styles/DateInputStyles'
import EntityPanelInputsStyles from '../../../Styles/EntityPanelInputsStyles'

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
        let dateString = new Date(this.state.dateValue+"T"+dateFormat(value,"HH:MM"));
        this.props.changeEntity(this.props.fieldName,dateString)
    }

    onDateChange(value){
        this.setState({ isDatePickerVisible: false });
        let dateString = new Date(dateFormat(value,"yyyy-mm-dd")+"T"+this.state.timeValue);
        this.props.changeEntity(this.props.fieldName,dateString)
    }

    render(){
        return(
            <View style={EntityPanelInputsStyles.inputStyle}>
                <Text>{this.props.name}</Text>
                <View style={DateInputStyles.dateInputMainView}>
                    <TouchableHighlight style={DateInputStyles.dateInputButton} onPress={() => this.setState({ isDatePickerVisible: true })}>
                        <Text style={{fontSize: 15}}>{this.state.dateValue}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={DateInputStyles.dateInputButton} onPress={() => this.setState({ isTimePickerVisible: true })}>
                        <Text style={{fontSize: 15}}>{this.state.timeValue}</Text>
                    </TouchableHighlight>
                </View>
                <DateTimePicker
                    datePickerModeAndroid='spinner'
                    mode='date'
                    minimumDate={new Date()}
                    isVisible={this.state.isDatePickerVisible}
                    onConfirm={this.onDateChange.bind(this)}
                    onCancel={() => this.setState({ isDatePickerVisible: false })}
                />
                <DateTimePicker
                    datePickerModeAndroid='spinner'
                    is24Hour={true}
                    mode='time'
                    minimumDate={new Date()}
                    isVisible={this.state.isTimePickerVisible}
                    onConfirm={this.onTimeChange.bind(this)}
                    onCancel={() => this.setState({ isTimePickerVisible: false })}
                />
            </View>
        )
    }
}
