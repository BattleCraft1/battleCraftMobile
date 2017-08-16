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

    convertData(){
        var tempData=[]; //get JSON from server here

        //stores incoming JSON in state
        this.setState({dataSource: this.state.dataSource.cloneWithRows(tempData)});
    }


    renderRow(rowData) {
        return (
            <View style={[TableStyles.row]}>
                <Text style={[TableStyles.row, MainStyles.smallWhiteStyle]}>Ranking row here</Text>
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
