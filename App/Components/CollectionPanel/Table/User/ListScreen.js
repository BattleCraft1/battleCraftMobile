import React, { Component } from 'react';
import {
    Text,
    View,
    ListView,
    Button,
    Image
} from 'react-native';
import Drawer from 'react-native-drawer'
import SearchDrawer from '../../SearchPanel/User/FormDrawer'
import PageDrawer from '../../PagePanel/User/FormDrawer'
import MainStyles from '../../../../Styles/MainStyles'
import TableStyles from '../../../../Styles/TableStyles'
import DrawerStyles from '../../../../Styles/DrawerStyles'
import Checkbox from '../../../Common/CheckBox/Checkbox'
import MultiCheckbox from '../../../Common/CheckBox/MultiCheckbox'
import PanelOptions from '../../PanelOptions/User/PanelOptions'
import GestureRecognizer from 'react-native-swipe-gestures';
import axios from 'axios';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../Redux/actions';

import {serverName} from '../../../../Main/consts/serverName'

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
            usersEnums: []
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
                        "name": "NaziOverlord88",
                            "avatar": "",
                            "firstname": "Adolf",
                            "surname": "Hitler",
                            "email": "adi1889@reichtag.de",
                            "province": "lubelskie",
                            "city": "Lublin",
                    },
                    {
                        "name": "LuftwaffeBomber",
                            "avatar": "",
                            "firstname": "Hermann",
                            "surname": " Goering",
                            "email": "herMANN@reichtag.de",
                            "province": "lubelskie",
                            "city": "Lublin",
                    },
                    {
                        "name": "TruthPreacher",
                            "avatar": "",
                            "firstname": "Joseph",
                            "surname": "Goebbels",
                            "email": "propaganda@reichtag.de",
                            "province": "lubelskie",
                            "city": "Lublin",
                    },
                    {
                        "name": "SS-SuperKommando",
                            "avatar": "",
                            "firstname": "Heinrich",
                            "surname": " Himmler",
                            "email": "waffenSS@reichtag.de",
                            "province": "lubelskie",
                            "city": "Lublin",
                    }
                ],
                "last": true,
                "totalElements": 4,
                "totalPages": 1,
                "size": 4,
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
                "numberOfElements": 4
            });
        };
        getMockupPage();
    }

    async getPageOfData(){
        console.log(this.props.pageRequest);
        let getPageOfDataOperation=async () => {
            this.props.startLoading("Fetching users data...");
            await axios.post(serverName+`page/users`,this.props.pageRequest)
                .then(async (res) => {
                    this.props.stopLoading();

                    this.props.setPage(res.data);

                    let pageRequest = this.props.pageRequest;
                    pageRequest.pageRequest.page=this.props.page.number;
                    pageRequest.pageRequest.size=this.props.page.numberOfElements;
                    this.props.setPageRequest(pageRequest);

                    if(this.state.usersEnums.length===0)
                        await this.getAllUsersEnums();
                })
                .catch(async (error) => {
                    this.props.stopLoading();
                    await this.props.showErrorMessageBox(error,getPageOfDataOperation);
                });
        };
        await getPageOfDataOperation();
        this.forceUpdate();
    }

    async getAllUsersEnums() {
        this.props.startLoading("Fetching users data...");
        await axios.get(serverName + `get/users/enums`)
            .then(res => {
                this.props.stopLoading();
                this.setState({usersEnums: res.data});
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

        let avatar;
        if(rowData.avatar!==undefined && rowData.avatar!=="")
            avatar = rowData.avatar; //check if avatar is present in database
        else
            avatar = require('../../../../../img/userLogoDef.png'); //else display placeholder

        return (
            <View style={[TableStyles.row]}>
                <View style={[TableStyles.sectionHeader]}>
                    <Text style={[MainStyles.smallWhiteStyle, {fontSize: 24}]}> {rowData.name}</Text>
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
                    <View style={{marginBottom:3}}>
                        <Button title="Open search tab" color='#4b371b'onPress={()=>{
                            this.setState({formDrawer:'search'});
                            this.openControlPanel()}}/>
                    </View>
                    <View style={{marginBottom:3}}>
                        <Button title="Open page tab" color='#4b371b' onPress={()=>{
                            this.setState({formDrawer:'page'});
                            this.openControlPanel()}}/>
                    </View>
                    <View>
                        <Button
                            title={(this.props.pageRequest.pageRequest.page+1) +"/"+
                            (this.props.page.totalPages===undefined?0:this.props.page.totalPages)}
                            color='#4b371b'
                            onPress={() => {}}
                        />
                    </View>

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
                                          <Text style={MainStyles.bigWhiteStyle}>Users List</Text>
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
}

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