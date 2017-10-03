import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Button,
} from 'react-native';
import { Form,
    Separator,
    PickerField,
    InputField,
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
            provincesNames:{}
        };
    }

    componentDidMount() {
        this.setInitialFormData();
        this.setLastTypedData();
    }

    //may need roles conversion from tab
    setInitialFormData(){
        this.setState({provincesNames: convertArrayToObject(this.props.tournamentsEnums.provincesNames)});
    }

    setLastTypedData(){
        this.props.formData.username?
            this.refs.searchForm.refs.username.setValue(this.props.formData.username):undefined;
        this.props.formData.firstname?
            this.refs.searchForm.refs.firstname.setValue(this.props.formData.firstname):undefined;
        this.props.formData.surname?
            this.refs.searchForm.refs.surname.setValue(this.props.formData.surname):undefined;
        this.props.formData.role?
            this.refs.searchForm.refs.role.setValue(this.props.formData.role):undefined;
        this.props.formData.city?
            this.refs.searchForm.refs.city.setValue(this.props.formData.city):undefined;
        this.props.formData.province?
            this.refs.searchForm.refs.province.setValue(this.props.formData.province):undefined;
    }

    submitForm(){
        this.searchUsers();
        this.props.onClosePanel()
    }

    //may need fixes for keys
    searchUsers(){
        let pageRequest=this.props.pageRequest;
        pageRequest.searchCriteria=[];

        if(this.props.formData.username!==undefined && this.props.formData.username!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["username"],
                    "operation":":",
                    "value":this.props.formData.username
                }
            )}
        if(this.props.formData.firstname!==undefined && this.props.formData.firstname!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["firstname"],
                    "operation":":",
                    "value":this.props.formData.firstname
                }
            )}
        if(this.props.formData.surname!==undefined && this.props.formData.surname!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["surname"],
                    "operation":":",
                    "value":this.props.formData.surname
                }
            )}
        if(this.props.formData.role!==undefined && this.props.formData.role!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["role"],
                    "operation":":",
                    "value":this.props.formData.role
                }
            )}
        if(this.props.formData.province!==undefined && this.props.formData.province!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["address","province","location"],
                    "operation":":",
                    "value":this.props.formData.province
                }
            )}
        if(this.props.formData.city!==undefined && this.props.formData.city!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["address", "city"],
                    "operation":":",
                    "value":this.props.formData.city
                }
            )}

        this.props.setPageRequest(pageRequest);
        this.props.getPageOfData();
    }

    render() {
        return (
            <View style={[MainStyles.contentStyle, MainStyles.centering]}>
                <View>
                    <Text style={[MainStyles.textStyle, {fontSize: 26,}]}>Search users</Text>
                </View>
                <ScrollView keyboardShouldPersistTaps='always' style={{paddingLeft:10,paddingRight:10}}>
                    <Form
                        ref='searchForm'>
                        <InputField
                            ref='username'
                            placeholder='Username'
                        />
                        <InputField
                            ref='firstname'
                            placeholder='First name'
                        />
                        <InputField
                            ref='surname'
                            placeholder='Surname'
                        />

                        <Separator/>

                        <PickerField ref='role'
                                     label='User role'
                                     options={{
                                         "": '',
                                         norm: 'Normal',
                                         org: 'Organisator',
                                         adm: 'Admin',
                                     }}/>

                        <Separator/>
                        <PickerField
                            ref="province"
                            label='Province'
                            options={this.state.provincesNames}/>
                        <InputField
                            ref='city'
                            placeholder='City'/>

                        <Button title="Filter"  color='#4b371b' onPress={this.submitForm.bind(this)}/>
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