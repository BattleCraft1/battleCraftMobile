import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../redux/actions/index';
import CheckBox from 'react-native-check-box'

class MultiCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked : false
        };
    }

    componentDidMount(){
        if(this.props.page.content.length===0)
        {
            this.setState({checked : false});
            return;
        }
        let uncheckedElements=this.props.page.content.filter(element => element.checked===false);
        if(uncheckedElements.length>0)
            this.setState({checked: false});
        else
            this.setState({checked: true});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.page!==undefined && nextProps.page !== this.props.page) {
            let uncheckedElements=nextProps.page.content.filter(element => element.checked===false);
            if(uncheckedElements.length>0)
                this.setState({checked: false});
            else
                this.setState({checked: true});
        }
    }

    changeRelatedEntities(checked){
        let relatedEntities = this.props.entityPanel.relatedEntity.relatedEntities;
        if(!checked || this.props.entityPanel.relatedEntity.relatedEntityLimit>=relatedEntities.length+this.props.page.content.length){
            if(this.props.entityPanel.relatedEntity.relatedEntityType==="participatedTournaments"){
                this.props.checkAllElements(this.props.element.name, checked);
                this.setState({checked:checked});
                if(checked){
                    relatedEntities.concat(this.props.page.checkedElementsNames.map(checkedElement => {
                        return{
                            name: checkedElement.name,
                            playersOnTableCount: checkedElement.playersOnTableCount
                        }}));
                }
                else{
                    relatedEntities = relatedEntities.filter(relatedEntity =>
                        this.props.page.checkedElementsNames.contains(relatedEntity.name))
                }
                this.props.changeRelatedEntities(relatedEntities);
            }
            else{
                this.setState({checked:checked});
                this.props.checkAllElements(checked);
                if(checked){
                    relatedEntities = relatedEntities.concat(this.props.page.checkedElementsNames);
                }
                else{
                    relatedEntities = relatedEntities.diff(this.props.page.checkedElementsNames);
                }
                this.props.changeRelatedEntities(relatedEntities);
            }
        }
        else{
            this.props.showFailureMessage("You can choose only "+this.props.entityPanel.relatedEntity.relatedEntityLimit+" elements");
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
                    if(this.props.entityPanel.mode!=='disabled'){
                        this.changeRelatedEntities(checked);
                    }
                    else{
                        this.props.checkAllElements(checked);
                        this.setState({checked:checked});
                    }
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
        entityPanel: state.entityPanel,
        page: state.page
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( MultiCheckbox );

