import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    Button
} from 'react-native';

import Checkbox from '../../../../Common/CheckBox/Checkbox'
import MultiCheckbox from '../../../../Common/CheckBox/MultiCheckbox'

import TableStyles from '../../../../../Styles/TableStyles'
import MainStyles from '../../../../../Styles/MainStyles'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../../Redux/actions';

import dateFormat from 'dateformat';

import {serverName} from '../../../../../Main/consts/serverName';

import { FileSystem } from 'expo';

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

    async downloadGameRules(gameName){
        const URL = serverName + `/get/game/` + gameName + `/rules`;
        const fileName = gameName+'.pdf';
        const direcotory = FileSystem.documentDirectory + fileName;

        let downloadGameRulesOperation = async () => {
        this.props.startLoading("Downloading game rules...");
        await FileSystem.downloadAsync(serverName, direcotory)
            .then(async (response) => {
                this.props.stopLoading();
                this.props.showSuccessMessageBox("file saved in: "+direcotory);
            })
            .catch(async (error) => {
                this.props.stopLoading();
                await this.props.showErrorMessageBox(error,downloadGameRulesOperation);
            });
        };

        await downloadGameRulesOperation();
    }



    renderRow(rowData) {
        return (
            <View style={[TableStyles.row]}>
                <View style={[TableStyles.sectionHeader]}>
                    <Text style={[MainStyles.smallWhiteStyle, {fontSize: 20}]}> {rowData.name}</Text>
                    <Checkbox name={rowData.name}/>
                </View>
                <View style={[TableStyles.row]}>
                    <Button onPress={async () => await this.downloadGameRules(rowData.name)} title={"Download rules"} color='#4b371b'/>
                </View>
                <View style={[TableStyles.row]}>
                    <Text style={[MainStyles.smallWhiteStyle]}> Tournaments number: {rowData.tournamentsNumber}</Text>
                </View>
                <View style={[TableStyles.row]}>
                    <Text style={[MainStyles.smallWhiteStyle]}> Creator: {rowData.creatorName}</Text>
                </View>
                <View style={[TableStyles.row]}>
                    <Text style={[MainStyles.smallWhiteStyle]}> Creation date: {dateFormat(rowData.dateOfStart,"dd-MM-yyyy hh:mm")}</Text>
                </View>
                <View style={[TableStyles.row]}>
                    <Text style={[MainStyles.smallWhiteStyle]}> Status: {
                        rowData.banned?"banned":
                            rowData.status.toLowerCase().split('_').join(' ')}</Text>
                </View>
            </View>);
    }

    render(){
        return(
            <ListView styles={TableStyles.table}
                      dataSource={this.state.dataSource.cloneWithRows(this.props.content)}
                      renderHeader={(headerData) => <View style={TableStyles.header}>
                          <Text style={MainStyles.bigWhiteStyle}>Games List</Text>
                          <MultiCheckbox/>
                      </View>}
                      renderRow={this.renderRow}/>
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        message: state.message,
        loading: state.loading
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( Rows );