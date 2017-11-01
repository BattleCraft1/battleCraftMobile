import React from 'react';
import {
    View,
    Button,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../redux/actions/index';

class AddEntityButton extends React.Component {

    render() {
        return (
            <View style={{flex:1}}>
                <Button
                    title={"Add "+this.props.entityType}
                    color='#4b371b'
                    onPress={()=>this.props.addEntity(this.props.entityType)}/>
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

export default connect( mapStateToProps, mapDispatchToProps )( AddEntityButton );