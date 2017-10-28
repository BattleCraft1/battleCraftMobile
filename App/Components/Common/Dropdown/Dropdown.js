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
            dropdownVisible: false,
            selectedVal: null,
        }
    }

    toggleDropdownVisibility(){
        this.setState({dropdownVisible: !this.state.dropdownVisible})
    }

    setVisibility(val){
        if(val!==this.dropdownVisible)this.setState({dropdownVisible: val})
    }

    menuSelect(val){
        this.setVisibility(false);
        this.props.navigate(val);
    }


    renderListElement(elementText){
        return (
            <View style={DropdownStyles.dropdownOptionStyle}>
                <TouchableHighlight underlayColor="#4b371b" onPress={()=>{this.menuSelect(elementText)}}>
                    <Text style={MainStyles.bigWhiteStyle}>{elementText}</Text>
                </TouchableHighlight>
            </View>
        );
    }

    render(){
        let dropdownContent=[];
        for (let i=0;i<this.props.listElements.length;i++)
        {
            dropdownContent.push(this.renderListElement(this.props.listElements[i]));
        }

        if(this.state.dropdownVisible)
            return(
                    <View style={DropdownStyles.dropdownContainerStyle}>
                        {dropdownContent}
                    </View>
            )
        else return null;
    }
}
