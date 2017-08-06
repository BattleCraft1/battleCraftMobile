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
import MainStyles from './Styles/MainStyles'
import TableStyles from './Styles/TableStyles'
import DrawerStyles from './Styles/DrawerStyles'

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
                    <View style={[TableStyles.row]}>
                        <Text style={[TableStyles.sectionHeader, MainStyles.smallWhiteStyle]}>{rowData.name}</Text>
                        <Text style={[TableStyles.row, MainStyles.smallWhiteStyle]}>{this.state.rowLabels[1]}: {rowData.province}</Text>
                        <Text style={[TableStyles.row, MainStyles.smallWhiteStyle]}>{this.state.rowLabels[2]}: {rowData.city}</Text>
                        <Text style={[TableStyles.row, MainStyles.smallWhiteStyle]}>{this.state.rowLabels[3]}: {rowData.game}</Text>
                        <Text style={[TableStyles.row, MainStyles.smallWhiteStyle]}>{this.state.rowLabels[4]}: {rowData.players}</Text>
                        <Text style={[TableStyles.row, MainStyles.smallWhiteStyle]}>{this.state.rowLabels[5]}: {rowData.date}</Text>
                    </View>);
            case 'game':
                return (
                    <View style={[TableStyles.row]}>
                        <Text style={[TableStyles.row, MainStyles.smallWhiteStyle]}>Game row here</Text>
                    </View>);
            case 'ranking':
                return (
                    <View style={[TableStyles.row]}>
                        <Text style={[TableStyles.row, MainStyles.smallWhiteStyle]}>Ranking row here</Text>
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
                    styles={DrawerStyles}
                    closedDrawerOffset={0}
                    tweenHandler={(ratio) => ({main: { opacity:(2-ratio)/2 }})}

                    content={<DrawerContent formType={this.props.listType} onClosePanel={this.closeControlPanel}/>}
                >
                    <View style={[MainStyles.contentStyle, MainStyles.centering, {flex: 1}]}>
                        <Button title="Open filters tab" color='#4b371b' onPress={this.openControlPanel}/>

                        <ListView styles={TableStyles.table}
                                  dataSource={this.state.dataSource}
                                  renderHeader={(headerData) => <Text style={[TableStyles.header,MainStyles.bigWhiteStyle]}>List {this.props.listType}</Text>}
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
                            ref='province'
                            placeholder='Prowincja'/>
                        <InputField
                            ref='city'
                            placeholder='Miasto'/>
                        <InputField
                            ref='game'
                            placeholder='Typ gry'/>
                        <InputField
                            ref='players'
                            placeholder='Liczba graczy'/>
                        <DatePickerField ref='date'
                                         minimumDate={new Date('1/1/1900')}
                                         maximumDate={new Date()}
                                         placeholder='Data'/>

                    </Form>
                    <Button title="Close"  color='#4b371b' onPress={this.props.onClosePanel}/>
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
                    </Form>
                    <Button title="Close"  color='#4b371b' onPress={this.props.onClosePanel}/>
                </ScrollView>
            </View>
        );
    }
    printRankingtForm(){
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
                return ;
        }
    }
}



module.export = ListScreen;
