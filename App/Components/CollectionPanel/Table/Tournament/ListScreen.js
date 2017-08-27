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
            formDrawer: "search",
            optionsVisible: false
        };
    }

    componentDidMount(){
        this.getPageOfData();
    }

    getPageOfData(){
        let getPageOfDataOperation=() => {
            this.props.startLoading("Fetching tournaments data...");
            fetch(serverName+`page/tournaments`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.props.pageRequest)
            })
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response);
                    }
                    return response.json()})
                .then((responseJson) => {
                    this.props.stopLoading();
                    this.props.setPage(responseJson);
                })
                .catch(error => {
                    this.props.stopLoading();
                    this.props.showErrorMessageBox(error,getPageOfDataOperation);
                });
        };
        getPageOfDataOperation();
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
        console.log("left");
        let pageRequest=this.props.pageRequest;
        if(pageRequest.pageRequest.page-1>=0){
            pageRequest.pageRequest.page-=1;
            this.props.setPageRequest(pageRequest);
            this.getPageOfData();
        }
    }

    nextPage(event){
        console.log("right");
        let pageRequest=this.props.pageRequest;
        if(pageRequest.pageRequest.page+1<this.props.page.totalPages){
            pageRequest.pageRequest.page+=1;
            this.props.setPageRequest(pageRequest);
            this.getPageOfData();
        }
    }

    render() {
        let formDrawer=<SearchDrawer getPageOfData={this.getPageOfData.bind(this)} onClosePanel={this.closeControlPanel.bind(this)}/>;
        if(this.state.formDrawer==='page')
            formDrawer=
                <PageDrawer getPageOfData={this.getPageOfData.bind(this)} onClosePanel={this.closeControlPanel.bind(this)}/>;


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
