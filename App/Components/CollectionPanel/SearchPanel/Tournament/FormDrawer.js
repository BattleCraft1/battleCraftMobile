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

    handleFormChange(formData){
        this.setState({formData:formData});
        this.props.onFormChange && this.props.onFormChange(formData);
    }
    handleFormFocus(e, component){
    }

    submitForm(){
        /*
         Here goes code submitting filters
         formData in state is a JSON
         */
        this.props.onClosePanel()
    }

    printTorunamentForm(){
        return (
            <View style={[MainStyles.contentStyle, MainStyles.centering]}>
                <View>
                    <Text style={[MainStyles.textStyle, {fontSize: 26,}]}>Torunament Form</Text>
                </View>
                <ScrollView keyboardShouldPersistTaps='always' style={{paddingLeft:10,paddingRight:10}}>
                    <Form
                        ref='filterTorunament'
                        onFocus={this.handleFormFocus.bind(this)}
                        onChange={this.handleFormChange.bind(this)}>
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

    printGamesForm(){
        return (
            <View style={[MainStyles.contentStyle, MainStyles.centering]}>
                <View>
                    <Text style={[MainStyles.textStyle, {fontSize: 26,}]}>Games form</Text>
                </View>
                <ScrollView keyboardShouldPersistTaps='always' style={{paddingLeft:10,paddingRight:10}}>
                    <Form
                        ref='filterGames'
                        onFocus={this.handleFormFocus.bind(this)}
                        onChange={this.handleFormChange.bind(this)}>

                        <InputField
                            ref='game'
                            placeholder='Typ gry'/>

                    </Form>
                    <Button title="Filtruj"  color='#4b371b' onPress={this.submitForm.bind(this)}/>
                </ScrollView>
            </View>
        );
    }

    printRankingForm(){
        return (
            <View style={[MainStyles.contentStyle, MainStyles.centering]}>
                <View>
                    <Text style={[MainStyles.textStyle, {fontSize: 26,}]}>Ranking form</Text>
                </View>
                <ScrollView keyboardShouldPersistTaps='always' style={{paddingLeft:10,paddingRight:10}}>
                    <Form
                        ref='filterRanking'
                        onFocus={this.handleFormFocus.bind(this)}
                        onChange={this.handleFormChange.bind(this)}>

                        <InputField
                            ref='game'
                            placeholder='Typ gry'/>

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
                                         l: 'Lubelskie',
                                         f: 'Łódzkie',
                                         e: 'Małopolskie',
                                         k: 'Mazowieckie',
                                     }}/>

                    </Form>
                    <Button title="Filtruj"  color='#4b371b' onPress={this.submitForm.bind(this)}/>
                </ScrollView>
            </View>
        );
    }

    render() {
        switch (this.props.formType) {
            case 'tournament':
                return this.printTorunamentForm(this.props.panelType);
            case 'game':
                return this.printGamesForm(this.props.panelType);
            case 'ranking':
                return this.printRankingForm(this.props.panelType);
            default:
                return;
        }
    }
}

module.export = FormDrawer;