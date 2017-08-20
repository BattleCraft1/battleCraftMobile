import React, { Component } from 'react';
import {
    View
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../Redux/actions/index';
import { bindActionCreators } from 'redux';

class LoadingSpinner extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
                <Spinner visible={!this.props.loading.dataFetched} textContent={this.props.loading.message} textStyle={{color: '#E0BA51'}} />
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        loading: state.loading
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( LoadingSpinner );
