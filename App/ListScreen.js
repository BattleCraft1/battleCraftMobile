/**
 * Created by FBegiello on 17.07.2017.
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    ListView,
    ScrollView,
    Button,
    TouchableHighlight,
    Image
} from 'react-native';
import FadeView from './Components/FadeView'
import Drawer from 'react-native-drawer'
import FormDrawer from './Components/FormDrawer'
import { Form,
    Separator,
    PickerField,
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
        this.openControlPanel = this.openControlPanel.bind(this);
        this.renderRow = this.renderRow.bind(this);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });

        this.state = {
            dataSource: ds.cloneWithRows(['Placeholder']),
            rowLabels: [],
            drawerForm: 'filter',
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
                        <View style={[TableStyles.sectionHeader]}>
                            <Text style={[MainStyles.smallWhiteStyle, {fontSize: 24}]}> {rowData.name}</Text>
                            <TouchableHighlight onPress={this.onPressLogo}>
                                <Image
                                    style={{ width: 40, height: 40,}}
                                    source={require('../img/expandIconH.png')} />
                            </TouchableHighlight>
                        </View>
                        <View style={[TableStyles.row]}><Text style={[MainStyles.smallWhiteStyle]}> {this.state.rowLabels[1]}: {rowData.province}</Text></View>
                        <View style={[TableStyles.row]}><Text style={[MainStyles.smallWhiteStyle]}> {this.state.rowLabels[2]}: {rowData.city}</Text></View>
                        <View style={[TableStyles.row]}><Text style={[MainStyles.smallWhiteStyle]}> {this.state.rowLabels[3]}: {rowData.game}</Text></View>
                        <View style={[TableStyles.row]}><Text style={[MainStyles.smallWhiteStyle]}> {this.state.rowLabels[4]}: {rowData.players}</Text></View>
                        <View style={[TableStyles.row]}><Text style={[MainStyles.smallWhiteStyle]}> {this.state.rowLabels[5]}: {rowData.date}</Text></View>
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

    closeControlPanel(){
        this._drawer.close()
    }
    openControlPanel(drawerForm){
        this.setState({drawerForm: drawerForm})
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
                    openDrawerOffset={0.2}
                    panCloseMask={0.2}
                    styles={DrawerStyles}
                    closedDrawerOffset={0}
                    tweenHandler={(ratio) => ({main: { opacity:(2-ratio)/2 }})}

                    content={<FormDrawer panelType={this.state.drawerForm} formType={this.props.listType} onClosePanel={this.closeControlPanel}/>}
                >
                    <View style={[MainStyles.contentStyle, MainStyles.centering, {flex: 1}]}>
                        <Button title="Open filters tab" color='#4b371b' onPress={()=>this.openControlPanel('filter')}/>

                        <ListView styles={TableStyles.table}
                                  dataSource={this.state.dataSource}
                                  renderHeader={(headerData) => <View style={TableStyles.header}><Text style={MainStyles.bigWhiteStyle}>List {this.props.listType}</Text></View>}
                                  renderRow={this.renderRow}/>
                        <Button title={"Dodaj "+this.props.listType} color='#4b371b' onPress={()=>this.openControlPanel('add')}/>
                    </View>
                </Drawer>
            </FadeView>
        );
    }
}


module.export = ListScreen;
