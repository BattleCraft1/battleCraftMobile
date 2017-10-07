import React from 'react';

import {
    View,
    Text,
    ScrollView
} from 'react-native';

import { Form } from 'react-native-form-generator';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../Redux/actions';

import MainStyles from '../../../Styles/MainStyles'

import {serverName} from "../../../Main/consts/serverName";

import axios from 'axios';

import isNotEmpty from './../../../main/functions/checkIfObjectIsNotEmpty'

import TournamentsFormInputs from 'Tournament/FormInputs'
import GamesFormInputs from 'Game/FormInputs'
import UsersFormInputs from 'User/FormInputs'
import RankingFormInputs from 'Ranking/FormInputs'

class SearchPanel extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            enums: {}
        }
    }

    async componentDidMount(){
        await this.getEnums(this.props.collectionType)
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.collectionType!==undefined && nextProps.collectionType !== this.props.collectionType) {
            await this.getEnums(nextProps.collectionType);
        }
    }

    async getEnums(collectionType){
        this.props.startLoading("Fetching data...");
        await axios.get(serverName+`get/`+collectionType+`/enums`)
            .then(res => {
                this.props.stopLoading();
                this.setState({enums:res.data});
            })
            .catch(error => {
                this.props.stopLoading();
                this.props.showErrorMessageBox(error);
            });
    }

    search(inputs){
        let pageRequest=this.props.pageRequest;
        pageRequest.searchCriteria=[];
        for(let inputName in inputs){
            if(isNotEmpty(inputs[inputName]))
                pageRequest.searchCriteria.push(
                    inputs[inputName]
                )
        }
        pageRequest.pageRequest.size = 10;
        this.props.setPageRequest(pageRequest);
        this.props.getPage(this.props.collectionType);
        this.props.onClosePanel();
    }

    prepareSearchInputs(){
        let searchFormInputs = "";
        if(isNotEmpty(this.state.enums))
            switch(this.props.collectionType){
                case 'tournaments':
                    searchFormInputs=
                    <TournamentsFormInputs
                        enums = {this.state.enums}
                        search = {this.search.bind(this)}
                        hide = {this.props.onClosePanel.bind(this)}
                    />;
                    break;
                case 'users':
                    searchFormInputs=
                        <UsersFormInputs
                            enums = {this.state.enums}
                            search = {this.search.bind(this)}
                            hide = {this.props.onClosePanel.bind(this)}
                        />;
                    break;
                case 'games':
                    searchFormInputs=
                        <GamesFormInputs
                            enums = {this.state.enums}
                            search = {this.search.bind(this)}
                            hide = {this.props.onClosePanel.bind(this)}
                        />;
                    break;
                case 'ranking':
                    searchFormInputs=
                        <RankingFormInputs
                            enums = {this.state.enums}
                            search = {this.search.bind(this)}
                            hide = {this.props.onClosePanel.bind(this)}
                        />;
                    break;
            }
        return searchFormInputs;
    }

    render(){
        let searchInputs = this.prepareSearchInputs();
        return (<View style={[MainStyles.contentStyle, MainStyles.centering]}>
            <ScrollView keyboardShouldPersistTaps='always' style={{paddingLeft:10,paddingRight:10}}>
                <View>
                    <Text style={[MainStyles.textStyle, {fontSize: 26,}]}>Search</Text>
                </View>
                <Form
                    ref='searchForm'>
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
        search: state.search,
        loading: state.loading
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( SearchPanel );