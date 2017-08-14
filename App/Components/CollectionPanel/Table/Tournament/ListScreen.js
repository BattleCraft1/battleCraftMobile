import React, { Component } from 'react';
import {
    Text,
    View,
    ListView,
    Button,
    TouchableHighlight,
    Image,
} from 'react-native';
import FadeView from '../../../Common/FadeView'
import Drawer from 'react-native-drawer'
import FormDrawer from '../../SearchPanel/Game/FormDrawer'
import MainStyles from '../../../../Styles/MainStyles'
import TableStyles from '../../../../Styles/TableStyles'
import DrawerStyles from '../../../../Styles/DrawerStyles'

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
            dataSource: ds.cloneWithRows(['Placeholder'])
        };
    }

    componentDidMount(){
        this.getPageOfData();
    }

    getPageOfData(){
        fetch(serverName+`page/tournaments`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.props.pageRequest)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.props.setPage(responseJson);
                this.setState({dataSource: this.state.dataSource.cloneWithRows(this.props.page.content)});
            })
            .catch(error => {
                this.props.showNetworkErrorMessageBox(error);
            });
    }

    renderRow(rowData) {
        return (
            <View style={[TableStyles.row]}>
                <View style={[TableStyles.sectionHeader]}>
                    <Text style={[MainStyles.smallWhiteStyle, {fontSize: 24}]}> {rowData.name}</Text>
                    <TouchableHighlight onPress={this.onPressLogo}>
                        <Image
                            style={{ width: 40, height: 40,}}
                            source={require('../../../../../img/expandIconH.png')} />
                    </TouchableHighlight>
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
                    <Text style={[MainStyles.smallWhiteStyle]}> date: {dateFormat(rowData.dateOfStart,"dd-MM-yyyy hh:mm")}</Text>
                </View>
            </View>);
    }

    closeControlPanel(){
        this._drawer.close()
    }
    openControlPanel(){
        this._drawer.open()
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

                    content={<FormDrawer onClosePanel={this.closeControlPanel}/>}
                >
                    <View style={[MainStyles.contentStyle, MainStyles.centering, {flex: 1}]}>
                        <Button title="Open filters tab" color='#4b371b' onPress={()=>this.openControlPanel()}/>

                        <ListView styles={TableStyles.table}
                                  dataSource={this.state.dataSource}
                                  renderHeader={(headerData) => <View style={TableStyles.header}><Text style={MainStyles.bigWhiteStyle}>Tournaments List</Text></View>}
                                  renderRow={this.renderRow}/>
                        <Button title={"Add tournament"} color='#4b371b' onPress={()=>this.openControlPanel()}/>
                    </View>
                </Drawer>
            </FadeView>
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
        message: state.message
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( ListScreen );
