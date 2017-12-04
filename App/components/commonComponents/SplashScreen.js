import React, { Component } from 'react';
import {
    Image,
    View
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/actions';

class SplashScreen extends Component {


    render() {
        return (
                <View style={{flex: 1}}>
                    <Image
                        style={{flex:1, width: this.props.dimension.width}}
                        source={require('../../../img/logoBig.png')} />
                </View>
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        dimension: state.dimension,
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( SplashScreen );
