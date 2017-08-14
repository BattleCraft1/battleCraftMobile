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
                        ref='filterTorunament'>
                        <InputField
                            ref='name'
                            placeholder='Nazwa turnieju'
                        />
                        <InputField
                            ref='game'
                            placeholder='Typ gry'/>
                        <PickerField ref='class'
                                     label='Klasa'
                                     options={{
                                         "": '',
                                         local: 'Local',
                                         challenger: 'Challenger',
                                         master: 'Master'
                                     }}/>
                        <Separator/>
                        <DatePickerField ref='dateStart'
                                         minimumDate={new Date('1/1/1900')}
                                         maximumDate={new Date()}
                                         placeholder='Data od'
                                         style={{backgroundColor:'#a58e60',}}/>
                        <DatePickerField ref='dateEnd'
                                         minimumDate={new Date('1/1/1900')}
                                         maximumDate={new Date()}
                                         placeholder='Data do'
                                         style={{backgroundColor:'#a58e60',}}/>
                        <Separator/>
                        <InputField
                            ref='city'
                            placeholder='Miasto'/>
                        <PickerField ref='province'
                                     label='Województwo'
                                     options={{
                                         "": '',
                                         d: 'Dolnośląskie',
                                         c: 'Kujawsko-pomorskie',
                                         l: ' Lubelskie',
                                         f: 'Łódzkie',
                                         e: 'Małopolskie',
                                         k: ' Mazowieckie',
                                     }}/>


                    </Form>
                    <Button title="Filtruj"  color='#4b371b' onPress={this.submitForm.bind(this)}/>
                </ScrollView>
            </View>
        );
    }
}

module.export = FormDrawer;