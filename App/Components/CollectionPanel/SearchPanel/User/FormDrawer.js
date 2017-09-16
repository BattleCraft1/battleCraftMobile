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
    DatePickerField,
} from 'react-native-form-generator';
import MainStyles from '../../../../Styles/MainStyles'

export default class FormDrawer extends Component {

    constructor(props) {
        super(props)
    }

    submitForm(){
        this.props.onClosePanel()
    }

    render() {
        return (
            <View style={[MainStyles.contentStyle, MainStyles.centering]}>
                <View>
                    <Text style={[MainStyles.textStyle, {fontSize: 26,}]}>Torunament Form</Text>
                </View>
                <ScrollView keyboardShouldPersistTaps='always' style={{paddingLeft:10,paddingRight:10}}>
                    <Form
                        ref='filterUser'>
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
                        <PickerField ref='province'
                                     label='Province'
                                     options={{
                                         "": '',
                                         d: 'Dolnośląskie',
                                         c: 'Kujawsko-pomorskie',
                                         l: ' Lubelskie',
                                         f: 'Łódzkie',
                                         e: 'Małopolskie',
                                         k: ' Mazowieckie',
                                     }}/>
                        <InputField
                            ref='city'
                            placeholder='City'/>


                    </Form>
                    <Button title="Filter"  color='#4b371b' onPress={this.submitForm.bind(this)}/>
                </ScrollView>
            </View>
        );
    }
}

module.export = FormDrawer;