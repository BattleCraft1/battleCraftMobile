import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Button,
    TouchableHighlight
} from 'react-native';

import Checkbox from '../../../../commonComponents/checkBox/Checkbox'
import MultiCheckbox from '../../../../commonComponents/checkBox/MultiCheckbox'
import ListColours from '../../../../../main/consts/ListColours'

import TableStyles from '../../../../../Styles/CollectionPanelStyles/TableStyles'
import MainStyles from '../../../../../Styles/UniversalStyles/MainStyles'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../../redux/actions';

import dateFormat from 'dateformat';

import {serverName} from '../../../../../main/consts/serverName';

import { FileSystem } from 'expo';

class Rows extends Component{

    constructor(props) {
        super(props);

        this.renderRow = this.renderRow.bind(this);
    }

    async downloadGameRules(gameName){
        const URL = serverName + `/get/game/rules?gameName=${gameName}`;
        const fileName = gameName+'.pdf';
        const directory = FileSystem.documentDirectory + fileName;

        let downloadGameRulesOperation = async () => {
        this.props.startLoading("Downloading game rules...");
        await FileSystem.downloadAsync(serverName, directory)
            .then(async (response) => {
                this.props.stopLoading();
                this.props.showSuccessMessage("file saved in: "+directory);
            })
            .catch(async (error) => {
                this.props.stopLoading();
                await this.props.showNetworkErrorMessage(error,downloadGameRulesOperation);
            });
        };

        await downloadGameRulesOperation();
    }

    printStatus(data){
        if(data.banned===true)
            return "banned";
        else if(data.status!==undefined)
            return data.status.toLowerCase().split('_').join(' ');
        else
            return "";
    }

    backgroundColourCheck(rowData){
        switch(this.printStatus(rowData)){
            case 'new': return ListColours.games.NEW;
            case 'accepted': return ListColours.games.ACCEPTED;
            case 'banned': return ListColours.games.BANNED;
            default: return ListColours.games.NEW;
        }
    }

    createGamesList(){
        if(this.props.content.length===0){
            return <View style={[TableStyles.row]}><Text numberOfLines={1} style={[MainStyles.smallWhiteStyle]}>Empty</Text></View>;
        }
        else{
            return this.props.content.map(game => this.renderRow(game));
        }
    }

    editEntity(element){
        this.props.editEntity("game",element.name);
    }

    renderRow(rowData) {
        let backgroundColour = this.backgroundColourCheck(rowData);

        return (
            <View key={rowData.name}  style={[TableStyles.row]}>
                <View style={[TableStyles.sectionHeader]}>
                    <TouchableHighlight
                        style={{flex:1}}
                        onPress={() => this.editEntity(rowData)}>
                        <Text numberOfLines={1} style={[MainStyles.smallWhiteStyle, {fontSize: 20}]}> {rowData.name}</Text>
                    </TouchableHighlight>
                    <Checkbox element = {rowData} checked = {rowData.checked}/>
                </View>
                <View style={[TableStyles.row]}>
                    <Button onPress={async () => await this.downloadGameRules(rowData.name)} title={"Download rules"} color='#4b371b'/>
                </View>
                <View style={[TableStyles.row]}>
                    <Text numberOfLines={1} style={[MainStyles.smallWhiteStyle]}> Tournaments number: {rowData.tournamentsNumber}</Text>
                </View>
                <View style={[TableStyles.row]}>
                    <Text numberOfLines={1} style={[MainStyles.smallWhiteStyle]}> Creation date: {dateFormat(rowData.dateOfStart,"dd-MM-yyyy hh:mm")}</Text>
                </View>
                <View style={[TableStyles.row, {backgroundColor: backgroundColour}]}>
                    <Text numberOfLines={1} style={[MainStyles.smallWhiteStyle]}> Status: {this.printStatus(rowData)}</Text>
                </View>
            </View>);
    }

    render(){
        return(
                <ScrollView styles={TableStyles.table}>
                    <View style={TableStyles.header}>
                        <Text style={[MainStyles.textStyle, {fontSize: 24}]}>Games</Text>
                        <MultiCheckbox/>
                    </View>
                    {this.createGamesList()}
                </ScrollView>
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        message: state.message,
        loading: state.loading,
        page: state.page
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( Rows );