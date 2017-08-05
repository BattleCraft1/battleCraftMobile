/**
 * Created by FBegiello on 17.07.2017.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Button
} from 'react-native';
import FadeView from './Components/FadeView'
import Drawer from 'react-native-drawer'

export default class ListScreen extends Component {

    constructor(props) {
        super(props) //type of list needed in props
        this.closeControlPanel = this.closeControlPanel.bind(this);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
        this.state = {
            dataSource: ds.cloneWithRows(['Placeholder']),
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
    ];


    convertData(){
        var tempData=this.dataIncoming //get JSON from server here

        this.setState({ dataSource: this.state.dataSource.cloneWithRows(tempData) });
    }


    renderRow(rowData){
        return (
            <View style={[tableStyles.row]}>
                <Text style={[tableStyles.sectionHeader,styles.smallWhiteStyle]}>{rowData.name}</Text>
                <Text style={[tableStyles.row,styles.smallWhiteStyle]}>{rowData.province}</Text>
                <Text style={[tableStyles.row,styles.smallWhiteStyle]}>{rowData.city}</Text>
                <Text style={[tableStyles.row,styles.smallWhiteStyle]}>{rowData.game}</Text>
                <Text style={[tableStyles.row,styles.smallWhiteStyle]}>{rowData.players}</Text>
                <Text style={[tableStyles.row,styles.smallWhiteStyle]}>{rowData.date}</Text>
            </View>);
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

                    content={<DrawerContent onClosePanel={this.closeControlPanel}/>}
                >
                    <View style={[styles.contentStyle, styles.centering, {flex: 1}]}>
                        <Button title="Open filters tab" color='#4b371b' onPress={this.openControlPanel}/>

                        <ListView styles={tableStyles.table}
                                  dataSource={this.state.dataSource}
                                  renderHeader={(headerData) => <Text style={[tableStyles.header, styles.bigWhiteStyle]}>List {this.props.listType}</Text>}
                                  renderRow={this.renderRow}/>
                    </View>
                </Drawer>
            </FadeView>
        );
    }
}



class DrawerContent extends Component {

    constructor() {
        super()
    }

    render() {
        return (
            <View style={[styles.contentStyle, styles.centering]}>
                <View>
                    <Text style={[styles.textStyle, {fontSize: 26,}]}>Drawer</Text>
                </View>
                <View>
                    <Text style={styles.smallWhiteStyle}>List of filters here</Text>
                </View>

                <Button title="Close"  color='#4b371b' onPress={this.props.onClosePanel}/>
            </View>
        );
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
