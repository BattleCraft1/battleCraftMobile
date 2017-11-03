import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    Image,
    TouchableHighlight
} from 'react-native';

import TableStyles from '../../../../../Styles/TableStyles'
import MainStyles from '../../../../../Styles/MainStyles'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../../redux/actions';

import findGameName from '../../../../../main/functions/findGameName'
import {serverName} from "../../../../../main/consts/serverName";

class Rows extends Component{

    constructor(props) {
        super(props);

        this.renderRow = this.renderRow.bind(this);

        let dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(['Placeholder'])
        };
    }

    showUser(name){
        this.props.getEntity("user",name);
    }

    renderRow(index, rowData) {
        return (
            <View key={rowData.name} style={[TableStyles.row]}>
                <View style={[TableStyles.sectionHeader]}>
                    <TouchableHighlight
                        style={{flex:1}}
                        onPress={() => this.showUser(rowData.name)}>
                        <Text numberOfLines={1} style={[MainStyles.smallWhiteStyle, {fontSize: 20}]}> {index+"."+rowData.name}</Text>
                    </TouchableHighlight>
                </View>
                <View style={[TableStyles.row, {flexDirection:'column'}]}>
                    <View style={{flexDirection:'row'}}>
                        <TouchableHighlight
                            style={TableStyles.avatar}
                            onPress={() => this.showUser(rowData.name)}>
                            <Image
                                style={{width: 60, height: 60}}
                                source={{uri:`${serverName}/get/user/avatar?username=${rowData.name}&${new Date().getTime()}`}} />
                        </TouchableHighlight>

                        <View style={{flex: 4, alignSelf: "stretch"}}>
                            <View style={[TableStyles.row]}>
                                <Text numberOfLines={1} style={[MainStyles.smallWhiteStyle]}> Points: {rowData.points}</Text>
                            </View>
                            <View style={[TableStyles.row]}>
                                <Text numberOfLines={1} style={[MainStyles.smallWhiteStyle]}> Province: {rowData.playerProvince}</Text>
                            </View>
                            <View style={[TableStyles.row]}>
                                <Text numberOfLines={1} style={[MainStyles.smallWhiteStyle]}> City: {rowData.playerCity}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[TableStyles.row]}>
                        <Text numberOfLines={1} style={[MainStyles.smallWhiteStyle]}> Tournaments count: {rowData.numberOfTournaments}</Text>
                    </View>
                    <View style={[TableStyles.row]}>
                        <Text numberOfLines={1} style={[MainStyles.smallWhiteStyle]}> Battles count: {rowData.numberOfBattles}</Text>
                    </View>
                </View>
            </View>);
    }

    render(){
        return(
            <ListView styles={TableStyles.table}
                      dataSource={this.state.dataSource.cloneWithRows(this.props.content)}
                      enableEmptySections={true}
                      renderHeader={(headerData) => <View style={TableStyles.header}>
                          <Text numberOfLines={1} style={[MainStyles.textStyle, {fontSize: 24}]}>{findGameName(this.props.pageRequest.searchCriteria)}</Text>
                      </View>}
                      renderRow={(rowData, sectionID, rowID) => this.renderRow(parseInt(rowID)+1,rowData)}/>
        );
    }
}


function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        pageRequest: state.pageRequest
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( Rows );