import React, { Component } from 'react';
import {
    Image,
    View
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/actions';

import SoundButton from 'battleCraftMobile/App/components/commonComponents/CustomButtons/SoundButton'

class SplashScreen extends Component {


    render() {
        return (
                <View style={{flex: 1}}>
                    <SoundButton text="adads" onPress={()=>{console.log("Press");}}/>
                </View>
        );
    }
}

/*
 <SoundButton onPress={()=>{}} text="fsdf" fontSize={40}/>
 <Image
 style={{flex:1, width: this.props.dimension.width}}
 source={require('../../../img/logoBig.png')} />
 */

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        dimension: state.dimension,
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( SplashScreen );
