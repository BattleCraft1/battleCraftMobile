import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Button,
} from 'react-native';
import { Form,
    InputField,
    PickerField
} from 'react-native-form-generator';
import MainStyles from '../../../../Styles/MainStyles'
import {tournamentFields} from '../../../../Main/consts/fieldsOfObject'
import {kindOfSort} from '../../../../Main/consts/kindsOfSort'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../Redux/actions';

class FormDrawer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.refs.pageFormData.refs.pageNumber.setValue((this.props.page.number+1).toString());
        this.refs.pageFormData.refs.pageSize.setValue((this.props.pageRequest.pageRequest.size).toString());
        this.refs.pageFormData.refs.sortField.setValue(this.props.pageRequest.pageRequest.property);
        this.refs.pageFormData.refs.sortType.setValue(this.props.pageRequest.pageRequest.direction);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.pageRequest!==undefined &&
            nextProps.pageRequest !== this.props.pageRequest) {
            this.refs.pageFormData.refs.pageNumber.setValue((nextProps.pageRequest.pageRequest.page+1).toString());
            this.refs.pageFormData.refs.pageSize.setValue((nextProps.pageRequest.pageRequest.size).toString());
            this.refs.pageFormData.refs.sortField.setValue(nextProps.pageRequest.pageRequest.property);
            this.refs.pageFormData.refs.sortType.setValue(nextProps.pageRequest.pageRequest.direction);
        }
    }

    handlePageFormChanges(pageFormData){
        this.props.setFormData({
        pageNumber:pageFormData.pageNumber===undefined?this.props.pageRequest.pageRequest.page+1:pageFormData.pageNumber,
        pageSize:pageFormData.pageSize===undefined?this.props.pageRequest.pageRequest.size:pageFormData.pageSize,
        sortField:pageFormData.sortField===undefined?this.props.pageRequest.pageRequest.property:pageFormData.sortField,
        sortType:pageFormData.sortType===undefined?this.props.pageRequest.pageRequest.direction:pageFormData.sortType,
    });
        this.setState({pageFormData:pageFormData});
    }

    submitForm(){
        let pageNumber = parseInt(this.props.formData.pageNumber)-1;
        let pageSize = parseInt(this.props.formData.pageSize);
        let sortField = this.props.formData.sortField;
        let sortType = this.props.formData.sortType;

        let validationErrors = [];

        if(isNaN(pageNumber)){
            validationErrors.push("Page number must be numeric value");
        }
        else if(!(pageNumber<this.props.page.totalPages && pageNumber>=0))
        {
            validationErrors.push("Page "+this.state.pageFormData.pageNumber+" don't exist");
        }

        if(isNaN(pageSize)){
            validationErrors.push("Page size must be numeric value");
        }
        else if(!(pageSize<=10 && pageSize>=1))
        {
            validationErrors.push("Page size must be between 1 and 10");
        }

        if(!tournamentFields.hasOwnProperty(sortField))
        {
            validationErrors.push("Sort field has not valid value");
        }

        if(!kindOfSort.hasOwnProperty(sortType))
        {
            validationErrors.push("Sort type has not valid value");
        }

        if(validationErrors.length>0)
        {
            this.props.showFailMessageBox({
                messageText: validationErrors.join('\r\n')
            });
            this.props.onClosePanel();
        }
        else
        {
            let pageRequest=this.props.pageRequest;
            pageRequest.pageRequest.size=pageSize;
            pageRequest.pageRequest.page=pageNumber;
            pageRequest.pageRequest.property=sortField;
            pageRequest.pageRequest.direction=sortType;
            this.props.setPageRequest(pageRequest);

            this.props.getPageOfData();

            this.props.onClosePanel();
        }
    }

    render() {
        return (
            <View style={[MainStyles.contentStyle, MainStyles.centering]}>
                <ScrollView keyboardShouldPersistTaps='always' style={{paddingLeft:10,paddingRight:10}}>
                    <View>
                        <Text style={[MainStyles.textStyle, {fontSize: 26,}]}>Get Tournaments Page</Text>
                    </View>
                    <Form
                        ref='pageFormData'
                        onChange={(pageFormData) => {this.handlePageFormChanges(pageFormData)}}>
                        <InputField
                            ref="pageNumber"
                            keyboardType = 'numeric'
                            placeholder='Page number'
                        />
                        <InputField
                            ref="pageSize"
                            keyboardType = 'numeric'
                            placeholder='Page size'
                        />
                        <PickerField
                            ref="sortField"
                            label='Sort by field'
                            options={tournamentFields}/>
                        <PickerField
                            ref="sortType"
                            label='Sort type'
                            options={kindOfSort}/>
                        <Button title="Get page"  color='#4b371b' onPress={this.submitForm.bind(this)}/>
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
        pageRequest: state.pageRequest,
        message: state.message
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( FormDrawer );


