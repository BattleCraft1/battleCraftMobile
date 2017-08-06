/**
 * Created by FBegiello on 17.07.2017.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    ScrollView,
    Button
} from 'react-native';
import FadeView from './Components/FadeView'
import Drawer from 'react-native-drawer'
import { Form,
    Separator,
    InputField,
    DatePickerField,
} from 'react-native-form-generator';

export default class ListScreen extends Component {

    constructor(props) {
        super(props) //type of list needed in props listType

        this.closeControlPanel = this.closeControlPanel.bind(this);
        this.renderRow = this.renderRow.bind(this);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });

        this.state = {
            dataSource: ds.cloneWithRows(['Placeholder']),
            rowLabels: [],
        };
    }

    dataIncoming = [
        {
            name: "Tournament 1",
            province: "Shithole 1",
            city:"City 1",
            game:"Game 1",
            players:"123",
            date: "Date 1"
        },
        {
            name: "Tournament 2",
            province: "Shithole 2",
            city:"City 2",
            game:"game 2",
            players:"234",
            date: "Date 2"
        },
        {
            name: "Tournament 3",
            province: "Shithole 3",
            city:"City 3",
            game:"Game 3",
            players:"123",
            date: "Date 3"
        },
        {
            name: "Tournament 4",
            province: "Shithole 4",
            city:"City 4",
            game:"game 4",
            players:"234",
            date: "Date 4"
        },
    ];


    convertData(){
        var tempData=this.dataIncoming //get JSON from server here

        this.setState({rowLabels: Object.keys(tempData[0])})
        this.setState({ dataSource: this.state.dataSource.cloneWithRows(tempData)});
    }


    renderRow(rowData) {

        switch(this.props.listType) {

            case 'tournament':
                return (
                    <View style={[tableStyles.row]}>
                        <Text style={[tableStyles.sectionHeader, styles.smallWhiteStyle]}>{rowData.name}</Text>
                        <Text style={[tableStyles.row, styles.smallWhiteStyle]}>{this.state.rowLabels[1]}: {rowData.province}</Text>
                        <Text style={[tableStyles.row, styles.smallWhiteStyle]}>{this.state.rowLabels[2]}: {rowData.city}</Text>
                        <Text style={[tableStyles.row, styles.smallWhiteStyle]}>{this.state.rowLabels[3]}: {rowData.game}</Text>
                        <Text style={[tableStyles.row, styles.smallWhiteStyle]}>{this.state.rowLabels[4]}: {rowData.players}</Text>
                        <Text style={[tableStyles.row, styles.smallWhiteStyle]}>{this.state.rowLabels[5]}: {rowData.date}</Text>
                    </View>);
            case 'game':
                return (
                    <View style={[tableStyles.row]}>
                        <Text style={[tableStyles.row, styles.smallWhiteStyle]}>Game row here</Text>
                    </View>);
            case 'ranking':
                return (
                    <View style={[tableStyles.row]}>
                        <Text style={[tableStyles.row, styles.smallWhiteStyle]}>Ranking row here</Text>
                    </View>);
        }
    }

    closeControlPanel = () => {
        this._drawer.close()
    }
    openControlPanel = () => {
        this._drawer.open()
    }

    componentDidMount(){

        this.convertData();
    }

    render() {

        return (
            <FadeView style={{flex:1}}>
                <Drawer
                    ref={(ref) => this._drawer = ref}
                    type="overlay"
                    tapToClose={true}
                    openDrawerOffset={0.3}
                    panCloseMask={0.2}
                    styles={drawerStyles}
                    closedDrawerOffset={0}
                    tweenHandler={(ratio) => ({main: { opacity:(2-ratio)/2 }})}

                    content={<DrawerContent formType={this.props.listType} onClosePanel={this.closeControlPanel}/>}
                >
                    <View style={[styles.contentStyle, styles.centering, {flex: 1}]}>
                        <Button title="Open filters tab" color='#4b371b' onPress={this.openControlPanel}/>

                        <ListView styles={tableStyles.table}
                                  dataSource={this.state.dataSource}
                                  renderHeader={(headerData) => <Text style={[tableStyles.header,styles.bigWhiteStyle]}>List {this.props.listType}</Text>}
                                  renderRow={this.renderRow}/>
                    </View>
                </Drawer>
            </FadeView>
        );
    }
}



class DrawerContent extends Component {

    constructor(props) {
        super(props)
    }

    handleFormChange(formData){
        this.setState({formData:formData})
        this.props.onFormChange && this.props.onFormChange(formData);
    }
    handleFormFocus(e, component){
    }


    printTorunamentForm(){
        return (
            <View style={[styles.contentStyle, styles.centering]}>
                <View>
                    <Text style={[styles.textStyle, {fontSize: 26,}]}>Torunament Form</Text>
                </View>
                <ScrollView keyboardShouldPersistTaps='always' style={{paddingLeft:10,paddingRight:10}}>
                    <Form
                        ref='filterTorunament'
                        onFocus={this.handleFormFocus.bind(this)}
                        onChange={this.handleFormChange.bind(this)}>

                        <InputField
                            ref='name'
                            label='Nazwa turnieju'
                            placeholder='First Name'/>
                        <InputField
                            ref='province'
                            label='Prowincja'
                            placeholder='First Name'/>
                        <InputField
                            ref='city'
                            label='Miasto'
                            placeholder='First Name'/>
                        <InputField
                            ref='game'
                            label='Typ gry'
                            placeholder='First Name'/>
                        <InputField
                            ref='players'
                            label='Liczba graczy'
                            placeholder='First Name'/>
                        <DatePickerField ref='date'
                                         minimumDate={new Date('1/1/1900')}
                                         maximumDate={new Date()}
                                         placeholder='Date'/>

                    </Form>
                    <Button title="Close"  color='#4b371b' onPress={this.props.onClosePanel}/>
                </ScrollView>
            </View>
        );
    }
    printGamesForm(){
        return (
            <View style={[styles.contentStyle, styles.centering]}>
                <View>
                    <Text style={[styles.textStyle, {fontSize: 26,}]}>Games form</Text>
                </View>
                <ScrollView keyboardShouldPersistTaps='always' style={{paddingLeft:10,paddingRight:10}}>
                    <Form
                        ref='filterGames'
                        onFocus={this.handleFormFocus.bind(this)}
                        onChange={this.handleFormChange.bind(this)}>
                    </Form>
                    <Button title="Close"  color='#4b371b' onPress={this.props.onClosePanel}/>
                </ScrollView>
            </View>
        );
    }
    printRankingtForm(){
        return (
            <View style={[styles.contentStyle, styles.centering]}>
                <View>
                    <Text style={[styles.textStyle, {fontSize: 26,}]}>Ranking form</Text>
                </View>
                <ScrollView keyboardShouldPersistTaps='always' style={{paddingLeft:10,paddingRight:10}}>
                    <Form
                        ref='filterRanking'
                        onFocus={this.handleFormFocus.bind(this)}
                        onChange={this.handleFormChange.bind(this)}>
                    </Form>
                    <Button title="Close"  color='#4b371b' onPress={this.props.onClosePanel}/>
                </ScrollView>
            </View>
        );
    }

    render() {

        switch (this.props.formType) {
            case 'tournament':
                return this.printTorunamentForm();
            case 'game':
                return this.printGamesForm();
            case 'ranking':
                return this.printRankingtForm();
            default:
                return (
                    <View style={[styles.contentStyle, styles.centering]}>
                        <View>
                            <Text style={[styles.textStyle, {fontSize: 26,}]}>Error</Text>
                        </View>
                    </View>);
        }
    }
}



const drawerStyles = {
    drawer: {
        backgroundColor: '#805D2C',
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 3
    },
    main: {
        paddingLeft: 3
    },
}

const tableStyles = {
    table:{
        alignSelf: "stretch"
    },
    row:{
        backgroundColor:'#a58e60',
        borderColor:'#e3ca86',
        borderWidth: 2,
        borderTopWidth: 0,
    },
    sectionHeader:{
        backgroundColor:'#4b371b',
        borderColor:'#e3ca86',
        borderTopWidth: 2,
        borderTopWidth: 0,
    },
    header:{
        backgroundColor:'#4b371b',
        borderColor:'#e3ca86',
        borderWidth: 3,
        padding: 2,
    }
}

const styles = StyleSheet.create({
    centering:{
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    textStyle:{
        fontFamily:'arial, helvetica, sans-serif',
        textShadowColor: '#000000',
        textShadowOffset: {width: -1, height: -1},
        color: '#fff',
    },
    borderStyle:{
        borderTopColor: '#e3ca86',
        borderRightColor: '#4b371b',
        borderBottomColor: '#E0BA51',
        borderLeftColor: '#ecdbac',
    },
    contentStyle: {
        flex: 0.9,
        padding: 5,
        marginTop: 1,
        justifyContent: 'center',
        borderColor: '#4b371b',
        borderWidth: 5,
        backgroundColor: '#805D2C',
    },
    bigWhiteStyle: {
        fontFamily:'arial, helvetica, sans-serif',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 26,
    },
    smallWhiteStyle: {
        fontFamily:'arial, helvetica, sans-serif',
        color: '#fff',
        fontSize: 20,
    },
    icon: {
        width: 24,
        height: 24,
    },
});

module.export = ListScreen;
