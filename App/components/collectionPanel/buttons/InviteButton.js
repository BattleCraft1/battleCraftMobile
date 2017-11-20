import React from 'react';
import {
    View,
    Button,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../redux/actions/index';

class InviteButton extends React.Component {

    invite(){
        this.props.clearCheckedElements();
        this.props.showEntityPanel();
    }

    render() {
        return (
            <View style={{flex:1, marginRight: 3}}>
                <Button
                    title={"Add"}
                    color='#4b371b'
                    onPress={()=>this.invite()}/>
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

export default connect( mapStateToProps, mapDispatchToProps )( InviteButton );