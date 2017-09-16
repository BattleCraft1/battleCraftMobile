import React, { Component } from 'react';
import {
    Text,
    View,
    ListView,
    Button,
    TouchableHighlight,
    Image
} from 'react-native';
import Drawer from 'react-native-drawer'
import FormDrawer from '../../SearchPanel/User/FormDrawer'
import MainStyles from '../../../../Styles/MainStyles'
import TableStyles from '../../../../Styles/TableStyles'
import DrawerStyles from '../../../../Styles/DrawerStyles'
import Checkbox from '../../../Common/CheckBox/Checkbox'
import MultiCheckbox from '../../../Common/CheckBox/MultiCheckbox'
import PanelOptions from '../../PanelOptions/Tournaments/PanelOptions'
import GestureRecognizer from 'react-native-swipe-gestures';
import axios from 'axios';

export default class ListScreen extends Component {

    constructor(props) {
        super(props); //type of list needed in props listType

        this.closeControlPanel = this.closeControlPanel.bind(this);
        this.openControlPanel = this.openControlPanel.bind(this);
        this.renderRow = this.renderRow.bind(this);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });

        this.state = {
            dataSource: ds.cloneWithRows(['Placeholder'])
        };
    }

    tempData={
            user1:{
                "login": "NaziOverlord88",
                "avatar": "",
                "firstname": "Adolf",
                "surname": "Hitler",
                "email": "adi1889@reichtag.de",
                "province": "lubelskie",
                "city": "Lublin",
            },
            user2:{
                "login": "LuftwaffeBomber",
                "avatar": "",
                "firstname": "Hermann",
                "surname": " Goering",
                "email": "herMANN@reichtag.de",
                "province": "lubelskie",
                "city": "Lublin",
            },
            user3:{
                "login": "TruthPreacher",
                "avatar": "",
                "firstname": "Joseph",
                "surname": "Goebbels",
                "email": "propaganda@reichtag.de",
                "province": "lubelskie",
                "city": "Lublin",
            },
            user4:{
                "login": "SS-SuperKommando",
                "avatar": "",
                "firstname": "Heinrich",
                "surname": " Himmler",
                "email": "waffenSS@reichtag.de",
                "province": "lubelskie",
                "city": "Lublin",
            }
    };

    convertData(){
        var tempData=[]; //get JSON from server here

        //stores incoming JSON in state
        this.setState({dataSource: this.state.dataSource.cloneWithRows(this.tempData)});
    }

    changeVisibilityOptionsModal(isVisible){
        this.setState({optionsVisible:isVisible});
    }

    renderRow(rowData) {

        let avatar = require('../../../../../img/userLogoDef.png');

        return (
            <View style={[TableStyles.row]}>
                <View style={[TableStyles.sectionHeader]}>
                    <Text style={[MainStyles.smallWhiteStyle, {fontSize: 24}]}> {rowData.login}</Text>
                    <Checkbox name={rowData.name}/>
                </View>

                <View style={[TableStyles.row, {flexDirection:'row'}]}>
                    <View>
                        <Image
                            style={{width: 148, height: 147}}
                            source={avatar} />
                    </View>
                    <View style={{flex: 1, alignSelf: "stretch"}}>
                        <View style={[TableStyles.row]}>
                            <Text style={[MainStyles.smallWhiteStyle]}> Name: {rowData.firstname}</Text>
                        </View>
                        <View style={[TableStyles.row]}>
                            <Text style={[MainStyles.smallWhiteStyle]}> Surname: {rowData.surname}</Text>
                        </View>
                        <View style={[TableStyles.row]}>
                            <Text style={[MainStyles.smallWhiteStyle]}> e-mail: {rowData.email}</Text>
                        </View>
                        <View style={[TableStyles.row]}>
                            <Text style={[MainStyles.smallWhiteStyle]}> Province: {rowData.province}</Text>
                        </View>
                        <View style={[TableStyles.row]}>
                            <Text style={[MainStyles.smallWhiteStyle]}> City: {rowData.city}</Text>
                        </View>
                    </View>
                </View>
            </View>);
    }

    closeControlPanel(){
        this._drawer.close()
    }

    openControlPanel(){
        this._drawer.open()
    }

    componentDidMount(){
        this.convertData();
    }

    render() {

        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="overlay"
                tapToClose={true}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                styles={DrawerStyles}
                closedDrawerOffset={0}
                tweenHandler={(ratio) => ({main: { opacity:(2-ratio)/2 }})}

                content={<FormDrawer onClosePanel={this.closeControlPanel}/>}
            >
                <View style={[MainStyles.contentStyle, MainStyles.centering, {flex: 1}]}>
                    <Button title="Open filters tab" color='#4b371b' onPress={()=>this.openControlPanel()}/>

                    <ListView styles={TableStyles.table}
                              dataSource={this.state.dataSource}
                              renderHeader={(headerData) => <View style={TableStyles.header}>
                                  <Text style={MainStyles.bigWhiteStyle}>Users List</Text></View>}
                              renderRow={this.renderRow}/>
                    <Button title={"Users Options"} color='#4b371b' onPress={()=>this.openControlPanel()}/>
                </View>
            </Drawer>
        );
    }
}


module.export = ListScreen;
