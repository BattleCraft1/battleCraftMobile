import React from 'react';
import CheckBox from 'react-native-check-box'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../redux/actions/index';

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked : false
        };
    }

    componentDidMount(){
        this.setState({checked: this.props.checked});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.checked!==undefined && nextProps.checked !== this.props.checked) {
            this.setState({checked: nextProps.checked});
        }
    }

    render(){
        return(
        <CheckBox
            style={{padding: 10}}
            isChecked={this.state.checked}
            onClick={() => {
                let checked=this.state.checked;
                checked=!checked;
                this.setState({checked:checked});
                this.props.checkElement(this.props.elementName, checked);
            }}
        />
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {};
}

export default connect( mapStateToProps, mapDispatchToProps )( Checkbox );
