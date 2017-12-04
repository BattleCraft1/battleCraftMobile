/**
 * Created by FBegiello on 03.12.2017.
 */

import React, { Component } from 'react';
import {
    TouchableHighlight,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../redux/actions/index';
import { bindActionCreators } from 'redux';

class SoundButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    playButtonPressed(){
        this.props.playSound('toggle');
        this.props.onPress();
    };

    render() {
        return (
            <TouchableHighlight style={{flex:1, backgroundColor: 'transparent',}} onPress={()=>this.playButtonPressed()}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: this.props.fontSize,}}>{this.props.text}</Text>
            </TouchableHighlight>
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( SoundButton );