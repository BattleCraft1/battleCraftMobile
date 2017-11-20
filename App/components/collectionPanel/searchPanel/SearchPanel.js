import React from 'react';

import {
    View,
    Text,
    ScrollView
} from 'react-native';

import { Form } from 'react-native-form-generator';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../redux/actions';

import MainStyles from '../../../Styles/UniversalStyles/MainStyles'
import SearchStyles from '../../../Styles/CollectionPanelStyles/SearchStyles'

import isNotEmpty from '../../../main/functions/checkIfObjectIsNotEmpty'

import TournamentsFormInputs from './tournaments/FormInputs'
import GamesFormInputs from './games/FormInputs'
import UsersFormInputs from './users/FormInputs'
import RankingFormInputs from './ranking/FormInputs'


const searchFormInputsTypeMap = {
    "tournaments":TournamentsFormInputs,
    "users": UsersFormInputs,
    "games":GamesFormInputs,
    "ranking":RankingFormInputs
};

class SearchPanel extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            enums: {}
        }
    }

    search(inputs){
        let pageRequest=this.props.pageRequest;
        pageRequest.searchCriteria=[];
        for(let inputName in inputs){
            if(!isNotEmpty(inputs[inputName]))
                pageRequest.searchCriteria.push(
                    inputs[inputName]
                )
        }
        if(this.props.entityPanel.mode !== 'disabled'){
            pageRequest.searchCriteria.concat(this.props.entityPanel.relatedEntity.relatedEntityCriteria);
        }
        pageRequest.pageRequest.page = 0;
        pageRequest.pageRequest.size = 10;
        this.props.setPageRequest(pageRequest);
        this.props.getPage(this.props.collectionType);
        this.props.changeFilterColour(true);
        this.props.onClosePanel();
    }

    createSearchFormInputs(){
        return React.createElement(
            searchFormInputsTypeMap[this.props.collectionType],
            {
                search:this.search.bind(this),
                hide:this.props.onClosePanel.bind(this),
                entityPanelDisabled: this.props.entityPanel.mode === 'disabled'
            },
            null
        );
    }

    render(){

        let searchInputs = this.createSearchFormInputs();

        return (<View style={[MainStyles.contentStyle, MainStyles.stretch]}>
            <ScrollView keyboardShouldPersistTaps='always' style={{paddingLeft:10,paddingRight:10}}>
                <View style={SearchStyles.headerStyle}>
                    <Text style={[MainStyles.textStyle, {fontSize: 26}]}>Search</Text>
                </View>
                <Form ref='searchForm'>
                    {searchInputs}
                </Form>
            </ScrollView>
        </View>)
    }
}


function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        page: state.page,
        pageRequest: state.pageRequest,
        entityPanel: state.entityPanel
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( SearchPanel );