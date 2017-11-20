/**
 * Created by FBegiello on 21.10.2017.
 */

import React, { Component } from 'react';
import {
    View,
    TouchableHighlight,
    Text,
    ScrollView
} from 'react-native';

import DropdownStyles from '../../../Styles/NavbarStyles/DropdownStyles'
import MainStyles from '../../../Styles/UniversalStyles/MainStyles'

import { ActionCreators } from '../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Dropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedVal: null,
        }
    }

    menuSelect(val){
        this.props.clearCheckedElements();
        this.props.closeEntityPanel();
        this.props.hideDropdown();
        this.props.navigate(val);
    }

    renderListElement(elementText){
        return (

            <TouchableHighlight style={DropdownStyles.dropdownOptionStyle} key={elementText}  onPress={()=>{this.menuSelect(elementText)}}>
                <View style={DropdownStyles.outerBorder}>
                    <View style={DropdownStyles.innerBorder}>
                        <Text style={MainStyles.bigWhiteStyle}>{elementText}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    render(){
        let dropdownContent=[];
        for (let i=0;i<this.props.listElements.length;i++)
        {
            dropdownContent.push(this.renderListElement(this.props.listElements[i]));
        }

        let isPortrait = this.props.dimension.orientation==='portrait';

        return(
            <View style={[DropdownStyles.dropdownContainerStyle,
                {height: isPortrait?470:this.props.dimension.height-60},
                {width: isPortrait?250:400}]}>
                {dropdownContent}
            </View>
        );

    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        dimension: state.dimension
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( Dropdown );
