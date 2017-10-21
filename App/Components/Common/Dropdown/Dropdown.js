/**
 * Created by FBegiello on 21.10.2017.
 */

import React, { Component } from 'react';
import {
    View,
    TouchableHighlight,
    Text,
} from 'react-native';
import DropdownStyles from '../../../Styles/DropdownStyles'
import MainStyles from '../../../Styles/MainStyles'


export default class Dropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownVisible: true
        }
    }

    toggleDropdownVisibility(){
        this.setState({dropdownVisible: !this.state.dropdownVisible})
    }
    setVisibility(val){
        this.setState({dropdownVisible: val})
    }


    renderListElement(elementText){
        return (
            <View>
                <TouchableHighlight onPress={()=>{}}>
                    <Text>{elementText}</Text>
                </TouchableHighlight>
            </View>
        );
    }

    render(){
        let dropdownContent = {};
        for (var i=0;i<this.props.ListElements.length;i++)
        {
            dropdownContent+=this.renderListElement(this.props.ListElements[i]);
        }

        if(this.state.dropdownVisible)
            return(
                <View style={DropdownStyles.dropdownContainerStyle}>
                    <Text> fadsfsadf </Text>
                </View>
            )
        else return null;
    }
}