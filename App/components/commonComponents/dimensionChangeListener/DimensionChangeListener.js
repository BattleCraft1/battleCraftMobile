import React from 'react';
import {
    Dimensions,
    View
} from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../redux/actions/index';
import { bindActionCreators } from 'redux';

class DimensionChangeListener extends React.Component {
    constructor(props) {
        super(props);
        Dimensions.addEventListener('change', () => {
            let height = Dimensions.get('screen').height;
            let width = Dimensions.get('screen').width;
            let orientation = height >= width?'portrait':'landscape';
            console.log("height: "+height);
            console.log("width: "+width);
            console.log("orientation: "+orientation);
            this.props.changeDimension(height, width, orientation);
        });
    }

    render(){
        return (
            <View/>
        )
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( DimensionChangeListener );