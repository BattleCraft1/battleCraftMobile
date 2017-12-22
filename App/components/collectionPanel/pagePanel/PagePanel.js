import React, { Component } from 'react';

import {
    Text,
    View,
    ScrollView,
    Button,
} from 'react-native';

import { 
    Form,
    InputField,
    PickerField
} from 'react-native-form-generator';

import MainStyles from '../../../Styles/UniversalStyles/MainStyles'
import SearchStyles from '../../../Styles/CollectionPanelStyles/SearchStyles'


import {fieldsOfObjects} from '../../../main/consts/fieldsOfObject'
import {kindOfSort} from '../../../main/consts/kindsOfSort'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../redux/actions/index';

class PagePanel extends Component {
    constructor(props) {
        super(props);

        this.state={
            pageFormData:{
            page:(this.props.page.number+1).toString(),
            size:(this.props.page.numberOfElements).toString(),
            property:this.props.pageRequest.pageRequest.property,
            direction:this.props.pageRequest.pageRequest.direction
            }
        }
    }

    componentDidMount(){
        this.refs.pageForm.refs.page.setValue((this.props.page.number+1).toString());
        this.refs.pageForm.refs.size.setValue((this.props.page.numberOfElements).toString());
        this.refs.pageForm.refs.property.setValue(this.props.pageRequest.pageRequest.property);
        this.refs.pageForm.refs.direction.setValue(this.props.pageRequest.pageRequest.direction);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.page !== undefined &&
            nextProps.page !== this.props.page &&
            nextProps.pageRequest !== undefined &&
            nextProps.pageRequest !== this.props.pageRequest) {
            this.refs.pageForm.refs.page.setValue((nextProps.page.number+1).toString());
            this.refs.pageForm.refs.size.setValue((nextProps.page.numberOfElements).toString());
            this.refs.pageForm.refs.property.setValue(nextProps.pageRequest.pageRequest.property);
            this.refs.pageForm.refs.direction.setValue(nextProps.pageRequest.pageRequest.direction);
        }
    }

    handlePageFormChanges(pageForm){
        this.setState( {
            pageFormData :pageForm
        });
    }

    submitForm(){
        let number = parseInt(this.state.pageFormData.page)-1;
        let size = parseInt(this.state.pageFormData.size);
        let property = this.state.pageFormData.property;
        let direction = this.state.pageFormData.direction;

        let validationErrors = [];

        if(isNaN(number)){
            validationErrors.push("Page number must be numeric value");
        }
        else if(number<0)
        {
            validationErrors.push("Page "+number+" don't exist");
        }

        if(isNaN(size)){
            validationErrors.push("Page size must be numeric value");
        }
        else if(!(size<=10 && size>=1))
        {
            validationErrors.push("Page size must be between 1 and 10");
        }

        if(!fieldsOfObjects[this.props.collectionType].hasOwnProperty(property))
        {
            validationErrors.push("Sort field has not valid value");
        }

        if(!kindOfSort.hasOwnProperty(direction))
        {
            validationErrors.push("Sort type has not valid value");
        }

        if(validationErrors.length>0)
        {
            this.props.showFailureMessage(validationErrors.join('\r\n'));
            this.props.onClosePanel();
        }
        else
        {
            let pageRequest=this.props.pageRequest;
            pageRequest.pageRequest.size=size;
            pageRequest.pageRequest.page=number;
            pageRequest.pageRequest.property=property;
            pageRequest.pageRequest.direction=direction;
            this.props.setPageRequest(pageRequest);

            this.props.getPage(this.props.collectionType);

            this.props.onClosePanel();
        }
    }

    render() {
        return (
            <View style={[MainStyles.contentStyle, MainStyles.stretch]}>
                <ScrollView keyboardShouldPersistTaps='always' style={{paddingLeft:10,paddingRight:10}}>
                    <View style={SearchStyles.headerStyle}>
                        <Text style={[MainStyles.textStyle, {fontSize: 26,}]}>Get page</Text>
                    </View>
                    <Form
                        ref='pageForm'
                        onChange={this.handlePageFormChanges.bind(this)}>
                        <InputField
                            ref="page"
                            keyboardType = 'numeric'
                            placeholder='Page number'
                        />
                        <InputField
                            ref="size"
                            keyboardType = 'numeric'
                            placeholder='Page size'
                        />
                        <PickerField
                            ref="property"
                            label='Sort by field:'
                            options={fieldsOfObjects[this.props.collectionType]}
                        />
                        <PickerField
                            ref="direction"
                            label='Sort type:'
                            options={kindOfSort}
                        />
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
        pageRequest: state.pageRequest
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( PagePanel );


