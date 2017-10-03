import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Button,
} from 'react-native';
import { Form,
    Separator,
    InputField,
    PickerField,
    DatePickerField,
} from 'react-native-form-generator';
import MainStyles from '../../../../Styles/MainStyles'
import convertArrayToObject from '../../../../Main/functions/convertArrayToObject'
import {checkIfNotNull} from '../../../../Main/functions/checkIfNotNull'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../Redux/actions';

class FormDrawer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gamesStatus:{}
        };
    }

    componentDidMount() {
        this.setInitialFormData();
        this.setLastTypedData();
    }

    setInitialFormData(){
        let gamesStatus = this.props.gamesEnums.gamesStatus;
        gamesStatus.push("BANNED");
        this.setState({gamesStatus: convertArrayToObject(gamesStatus)});
    }

    setLastTypedData(){
        this.props.formData.name?
            this.refs.searchForm.refs.name.setValue(this.props.formData.name):undefined;
        this.props.formData.gamesStatus?
            this.refs.searchForm.refs.gamesStatus.setValue(this.props.formData.gamesStatus):undefined;
        this.props.formData.creator?
            this.refs.searchForm.refs.creator.setValue(this.props.formData.creator):undefined;
        this.props.formData.creationDate?
            this.refs.searchForm.refs.creationDate.setValue(this.props.formData.creationDate):undefined;
    }

    handleSearchFormChanges(searchForm){
        this.props.setFormData(searchForm);
    }

    submitForm(){
        this.searchGames();
        this.props.onClosePanel();
    }

    searchGames(){
        let pageRequest=this.props.pageRequest;
        pageRequest.searchCriteria=[];

        if(this.props.formData.name!==undefined && this.props.formData.name!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["name"],
                    "operation":":",
                    "value":this.props.formData.name
                }
            )}
        if(this.props.formData.gamesStatus!==undefined && this.props.formData.gamesStatus!==""){
            if(this.props.formData.gamesStatus==='BANNED')
                pageRequest.searchCriteria.push(
                    {
                        "keys":["banned"],
                        "operation":":",
                        "value":true
                    }
                );
            else
                pageRequest.searchCriteria.push(
                    {
                        "keys":["gamesStatus"],
                        "operation":":",
                        "value":this.props.formData.gamesStatus
                    }
                );
        }
        if(this.props.formData.creator!==undefined && this.props.formData.creator!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["creator"],
                    "operation":":",
                    "value":this.props.formData.creator
                }
            )}
        if(this.props.formData.creationDate!==undefined && this.props.formData.creationDate!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["creationDate"],
                    "operation":">",
                    "value":this.props.formData.creationDate
                }
            )}
        this.props.setPageRequest(pageRequest);
        this.props.getPageOfData();
    }

    render() {
        return (
            <View style={[MainStyles.contentStyle, MainStyles.centering]}>
                <ScrollView keyboardShouldPersistTaps='always' style={{paddingLeft:10,paddingRight:10}}>
                    <View>
                        <Text style={[MainStyles.textStyle, {fontSize: 26,}]}>Search game</Text>
                    </View>
                    <Form
                        ref='searchForm'
                        onChange={this.handleSearchFormChanges.bind(this)}>
                        <InputField
                            ref='name'
                            placeholder='Game name'
                        />
                        <PickerField
                            ref="tournamentStatus"
                            label='Status'
                            options={this.state.gamesStatus}/>

                        <Separator/>

                        <InputField
                            ref='creator'
                            placeholder='Creator name'
                        />
                        <DatePickerField ref='creationDate'
                                         minimumDate={new Date('1/1/1900')}
                                         maximumDate={new Date()}
                                         placeholder="Creation date start"
                                         style={{backgroundColor:'#a58e60',}}/>

                        <Button title="Filtruj"  color='#4b371b' onPress={this.submitForm.bind(this)}/>
                    </Form>
                </ScrollView>
            </View>
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        page: state.page,
        message: state.message,
        pageRequest: state.pageRequest,
        loading: state.loading
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( FormDrawer );