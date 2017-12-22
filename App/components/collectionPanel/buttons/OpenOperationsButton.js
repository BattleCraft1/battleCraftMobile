import React from 'react';
import {
    View,
    Button,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../redux/actions/index';

class OpenOperationsButton extends React.Component {

    render() {
        return (
            <View style={{flex:1, marginRight: 3}}>
                <Button title={"Options"} color='#4b371b'
                        onPress={()=>{this.props.playSound('toggle'); this.props.action()}}/>
            </View>
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {};
}

export default connect( mapStateToProps, mapDispatchToProps )( OpenOperationsButton );