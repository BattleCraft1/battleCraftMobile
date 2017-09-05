import React, { Component } from 'react';
import {
    Text,
    View,
    ListView,
    Button,
    TouchableHighlight
} from 'react-native';
import Drawer from 'react-native-drawer'
import SearchDrawer from '../../SearchPanel/Tournament/FormDrawer'
import PageDrawer from '../../PagePanel/Tournament/FormDrawer'
import MainStyles from '../../../../Styles/MainStyles'
import TableStyles from '../../../../Styles/TableStyles'
import DrawerStyles from '../../../../Styles/DrawerStyles'
import Checkbox from '../../../Common/CheckBox/Checkbox'
import MultiCheckbox from '../../../Common/CheckBox/MultiCheckbox'
import PanelOptions from '../../PanelOptions/Tournaments/PanelOptions'
import GestureRecognizer from 'react-native-swipe-gestures';
import axios from 'axios';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../Redux/actions';

import {serverName} from '../../../../Main/consts/serverName'

import dateFormat from 'dateformat';

class ListScreen extends Component {

    constructor(props) {
        super(props);

        this.closeControlPanel = this.closeControlPanel.bind(this);
        this.openControlPanel = this.openControlPanel.bind(this);
        this.renderRow = this.renderRow.bind(this);

        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });

        this.state = {
            dataSource: ds.cloneWithRows(['Placeholder']),
            formDrawer: "",
            optionsVisible: false,
            formDrawerData: {},
            tournamentsEnums: []
        };
    }

    async componentDidMount(){
        //await this.getPageOfData();
        await this.getMockupPage();
    }

    async getMockupPage(){
        let getMockupPage=() => {
            this.props.stopLoading();
            this.props.setPage({
                "content": [
                    {
                        "tournamentStatus": "ACCEPTED",
                        "game": "Warhammer",
                        "maxPlayers": 6,
                        "freeSlots": 4,
                        "province": "lubelskie",
                        "city": "Lublin",
                        "name": "Tournament1",
                        "dateOfStart": 1483880700000,
                        "playersNumber": 2,
                        "banned": false
                    },
                    {
                        "tournamentStatus": "NEW",
                        "game": "Cyber punk",
                        "maxPlayers": 6,
                        "freeSlots": 4,
                        "province": "podlaskie",
                        "city": "Białystok",
                        "name": "Tournament10",
                        "dateOfStart": 1535306700000,
                        "playersNumber": 2,
                        "banned": false
                    },
                    {
                        "tournamentStatus": "NEW",
                        "game": "Star wars",
                        "maxPlayers": 8,
                        "freeSlots": 6,
                        "province": "lubelskie",
                        "city": "Zamość",
                        "name": "Tournament2",
                        "dateOfStart": 1518185460000,
                        "playersNumber": 2,
                        "banned": false
                    },
                    {
                        "tournamentStatus": "NEW",
                        "game": "Warhammer 40k",
                        "maxPlayers": 6,
                        "freeSlots": 4,
                        "province": "dolnośląskie",
                        "city": "Wrocław",
                        "name": "Tournament3",
                        "dateOfStart": 1489331700000,
                        "playersNumber": 2,
                        "banned": true
                    },
                    {
                        "tournamentStatus": "FINISHED",
                        "game": "Cyber punk",
                        "maxPlayers": 10,
                        "freeSlots": 8,
                        "province": "małopolskie",
                        "city": "Kraków",
                        "name": "Tournament4",
                        "dateOfStart": 1524673500000,
                        "playersNumber": 2,
                        "banned": false
                    },
                    {
                        "tournamentStatus": "ACCEPTED",
                        "game": "Heroes",
                        "maxPlayers": 8,
                        "freeSlots": 6,
                        "province": "śląskie",
                        "city": "Katowice",
                        "name": "Tournament5",
                        "dateOfStart": 1494674640000,
                        "playersNumber": 2,
                        "banned": false
                    },
                    {
                        "tournamentStatus": "FINISHED",
                        "game": "Lord of the rings",
                        "maxPlayers": 6,
                        "freeSlots": 4,
                        "province": "zachodiopomorskie",
                        "city": "Szczecin",
                        "name": "Tournament6",
                        "dateOfStart": 1541931180000,
                        "playersNumber": 2,
                        "banned": true
                    },
                    {
                        "tournamentStatus": "ACCEPTED",
                        "game": "Warhammer",
                        "maxPlayers": 4,
                        "freeSlots": 2,
                        "province": "wielkopolskie",
                        "city": "Poznań",
                        "name": "Tournament7",
                        "dateOfStart": 1512126360000,
                        "playersNumber": 2,
                        "banned": false
                    },
                    {
                        "tournamentStatus": "FINISHED",
                        "game": "Star wars",
                        "maxPlayers": 20,
                        "freeSlots": 18,
                        "province": "opolskie",
                        "city": "Opole",
                        "name": "Tournament8",
                        "dateOfStart": 1527898320000,
                        "playersNumber": 2,
                        "banned": false
                    },
                    {
                        "tournamentStatus": "ACCEPTED",
                        "game": "Warhammer 40k",
                        "maxPlayers": 8,
                        "freeSlots": 6,
                        "province": "łódzkie",
                        "city": "Łódź",
                        "name": "Tournament9",
                        "dateOfStart": 1499966220000,
                        "playersNumber": 2,
                        "banned": false
                    }
                ],
                "last": true,
                "totalElements": 10,
                "totalPages": 1,
                "size": 10,
                "number": 0,
                "sort": [
                    {
                        "direction": "ASC",
                        "property": "name",
                        "ignoreCase": false,
                        "nullHandling": "NATIVE",
                        "ascending": true,
                        "descending": false
                    }
                ],
                "first": true,
                "numberOfElements": 10
            });
        };
        getMockupPage();
    }

    async getPageOfData(){
        console.log(this.props.pageRequest);
        let getPageOfDataOperation=async () => {
            this.props.startLoading("Fetching tournaments data...");
            await axios.post(serverName+`page/tournaments`,this.props.pageRequest)
                .then(async (res) => {
                    this.props.stopLoading();

                    this.props.setPage(res.data);

                    let pageRequest = this.props.pageRequest;
                    pageRequest.pageRequest.page=this.props.page.number;
                    pageRequest.pageRequest.size=this.props.page.size;
                    this.props.setPageRequest(pageRequest);

                    if(this.state.tournamentsEnums.length===0)
                    await this.getAllTournamentsEnums();
                })
                .catch(async (error) => {
                    this.props.stopLoading();
                    await this.props.showErrorMessageBox(error,getPageOfDataOperation);
                });
        };
        await getPageOfDataOperation();
        this.forceUpdate();
    }

    async getAllTournamentsEnums() {
        this.props.startLoading("Fetching tournaments data...");
        await axios.get(serverName + `get/tournaments/enums`)
            .then(res => {
                this.props.stopLoading();
                this.setState({tournamentsEnums: res.data});
            })
            .catch(error => {
                this.props.stopLoading();
                this.props.showErrorMessageBox(error);
            });
    }

    changeVisibilityOptionsModal(isVisible){
        this.setState({optionsVisible:isVisible});
    }

    renderRow(rowData) {
        return (
            <View style={[TableStyles.row]}>
                <View style={[TableStyles.sectionHeader]}>
                    <Text style={[MainStyles.smallWhiteStyle, {fontSize: 24}]}> {rowData.name}</Text>
                    <Checkbox name={rowData.name}/>
                </View>
                <View style={[TableStyles.row]}>
                    <Text style={[MainStyles.smallWhiteStyle]}> province: {rowData.province}</Text>
                </View>
                <View style={[TableStyles.row]}>
                    <Text style={[MainStyles.smallWhiteStyle]}> city: {rowData.city}</Text>
                </View>
                <View style={[TableStyles.row]}>
                    <Text style={[MainStyles.smallWhiteStyle]}> game: {rowData.game}</Text>
                </View>
                <View style={[TableStyles.row]}>
                    <Text style={[MainStyles.smallWhiteStyle]}> players: {rowData.playersNumber}/{rowData.maxPlayers}</Text>
                </View>
                <View style={[TableStyles.row]}>
                    <Text style={[MainStyles.smallWhiteStyle]}> date start: {dateFormat(rowData.dateOfStart,"dd-MM-yyyy hh:mm")}</Text>
                </View>
                <View style={[TableStyles.row]}>
                    <Text style={[MainStyles.smallWhiteStyle]}> date end: {dateFormat(rowData.dateOfEnd,"dd-MM-yyyy hh:mm")}</Text>
                </View>
                <View style={[TableStyles.row]}>
                    <Text style={[MainStyles.smallWhiteStyle]}> status: {
                        rowData.banned?"banned":
                            rowData.tournamentStatus.toLowerCase().split('_').join(' ')}</Text>
                </View>
            </View>);
    }

    closeControlPanel(){
        this._drawer.close()
    }
    openControlPanel(){
        this._drawer.open()
    }

    previousPage(event){
        let pageRequest=this.props.pageRequest;
        if(pageRequest.pageRequest.page-1>=0){
            pageRequest.pageRequest.page-=1;
            this.props.setPageRequest(pageRequest);
            this.getPageOfData();
        }
    }

    nextPage(event){
        let pageRequest=this.props.pageRequest;
        if(pageRequest.pageRequest.page+1<this.props.page.totalPages){
            pageRequest.pageRequest.page+=1;
            this.props.setPageRequest(pageRequest);
            this.getPageOfData();
        }
    }

    setFormDrawerData(formDrawerData){
        this.setState({formDrawerData: formDrawerData});
    }

    render() {
        let formDrawer;
        if(this.state.formDrawer==='page')
            formDrawer = <PageDrawer getPageOfData={this.getPageOfData.bind(this)}
                                     onClosePanel={this.closeControlPanel.bind(this)}/>;
        else if(this.state.formDrawer==='search')
            formDrawer= <SearchDrawer getPageOfData={this.getPageOfData.bind(this)}
                                      onClosePanel={this.closeControlPanel.bind(this)}
                                      formData={this.state.formDrawerData}
                                      setFormData={this.setFormDrawerData.bind(this)}
                                        tournamentsEnums={this.state.tournamentsEnums}/>;

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
                content={formDrawer}
            >
                <View style={[MainStyles.contentStyle, MainStyles.centering, {flex: 1}]}>

                    <Button title="Open search tab" color='#4b371b' onPress={()=>{
                        this.setState({formDrawer:'search'});
                        this.openControlPanel()}}/>
                    <Button title="Open page tab" color='#4b371b' onPress={()=>{
                        this.setState({formDrawer:'page'});
                        this.openControlPanel()}}/>
                    <Button
                        title={(this.props.pageRequest.pageRequest.page+1) +"/"+
                        (this.props.page.totalPages===undefined?0:this.props.page.totalPages)}
                        color='#4b371b'
                        onPress={() => {}}
                    />

                <View style={{flex:1}}>
                    <GestureRecognizer
                        onSwipeLeft={(event) => this.previousPage(event)}
                        onSwipeRight={(event) => this.nextPage(event)}
                        config={{
                            velocityThreshold: 0.1,
                            directionalOffsetThreshold: 30
                        }}
                    >
                        <ListView styles={TableStyles.table}
                                  dataSource={this.state.dataSource.cloneWithRows(this.props.page.content)}
                                  renderHeader={(headerData) => <View style={TableStyles.header}>
                                      <Text style={MainStyles.bigWhiteStyle}>Tournaments List</Text>
                                      <MultiCheckbox/>
                                  </View>}
                                  renderRow={this.renderRow}/>
                    </GestureRecognizer>
                </View>
                    <Button title={"Options"} color='#4b371b' onPress={()=>this.setState({optionsVisible:true})}/>
                </View>
                <PanelOptions
                    changeVisibility={this.changeVisibilityOptionsModal.bind(this)}
                    isVisible={this.state.optionsVisible}
                    getPage={this.getPageOfData.bind(this)}
                />
            </Drawer>
        );
    }
};

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        page: state.page,
        pageRequest: state.pageRequest,
        message: state.message,
        confirmation: state.confirmation,
        loading: state.loading
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( ListScreen );
