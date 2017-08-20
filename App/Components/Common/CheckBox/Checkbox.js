import React from 'react';
import CheckBox from 'react-native-check-box'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../Redux/actions/index';

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked : false
        };
    }

    componentDidMount(){
        let element=this.props.page.content.filter(element => element.name===this.props.name);
        this.setState({checked: element.checked});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.page!==undefined && nextProps.page !== this.props.page) {
            let element=nextProps.page.content.filter(element => element.name===this.props.name)[0];
            if(element!==undefined)
            this.setState({checked: element.checked});
        }
    }

    render(){
        return(
        <CheckBox
            style={{flex: 1, padding: 10}}
            isChecked={this.state.checked}
            onClick={() => {
                let checked=this.state.checked;
                checked=!checked;
                this.setState({checked:checked});
                this.props.checkElement(this.props.name, checked);
            }}
        />
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        page: state.page,
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( Checkbox );
