/**
 * Created by FBegiello on 23.11.2017.
 */

import React, { Component } from 'react';
import {SQLite} from "expo";
import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableHighlight
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../redux/actions';

import {serverName} from "../../../main/consts/serverName";
import axios from 'axios';

import MainStyles from '../../../Styles/UniversalStyles/MainStyles'
import DetailsStyle from '../../../Styles/AccountStyles/DetailsStyle'
import BaseColours from 'battleCraftMobile/App/main/consts/BaseColours'
import InputStyles from "../../../Styles/UniversalStyles/InputStyles";

import ChangePasswordPopup from './ChangePasswordPopup/ChangePasswordPopup'
import CreateAdminPopup from './../NoAuthPanel/RegisterPopup/RegisterPopup'

const db = SQLite.openDatabase({ name: 'tokens2.db' });

class AccountPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accountData:{
                role:"",
                username:"",
                showChangePasswordPopup:false,
                showCreateAdminPopup:false
            }
        }
    }

    async componentDidMount() {
        await this.getAccountDetails();
    }

    async componentWillReceiveProps(nextProps){
        if (nextProps.entityPanel.mode === 'disabled' &&
            this.props.entityPanel.mode !== 'disabled') {
            await this.getAccountDetails();
        }
    }

    async getAccountDetails(){
        let getAccountDetailsOperation = async () => {
            this.props.startLoading("Fetching account data...");
            await axios.get(serverName+'auth/account',
                {
                    headers: {
                        "X-Auth-Token":this.props.security.token
                    }
                })
                .then(async (res) =>{
                    console.log("aaaa");
                        this.props.stopLoading();
                        this.setState({accountData:res.data});
                    }
                )
                .catch(async (error) =>{
                        this.props.stopLoading();
                        this.props.showNetworkErrorMessage(error,getAccountDetailsOperation);
                    }
                )
        };

        await getAccountDetailsOperation();
    }

    editProfile(){
        this.props.editEntity("user",this.state.accountData.username);
    }

    changePassword(){
        this.setState({showChangePasswordPopup:true})
    }

    logout(){
        db.transaction(
            tx => {
                tx.executeSql(
                    'delete from tokens2 where id = 1',
                    [],
                    (ts,success) => {
                        console.log("success: ");
                        console.log(success)
                    },
                    (ts,error) => {
                        console.log("error: ");
                        console.log(error)
                    }
                );
            }
        );
        this.props.setTokenAndRole("","");
    }

    createRoleButtons(){
        let buttons = [];

        if(this.state.accountData.role === 'ROLE_ADMIN'){
            buttons.push(
                <View style={[DetailsStyle.buttonWrapper]} key="createAdminAccount" >
                    <TouchableHighlight style={[DetailsStyle.button, MainStyles.borderStyle]} onPress={()=>{this.setState({showCreateAdminPopup:true})}}>
                        <Text style={MainStyles.bigWhiteStyle}>Create administrator</Text>
                    </TouchableHighlight>
                </View>
            )
        }

        if(this.state.accountData.role === 'ROLE_ORGANIZER' || this.state.accountData.role === 'ROLE_ACCEPTED'){
            buttons.push(
                <View style={[DetailsStyle.buttonWrapper]} key="playedTournaments" >
                    <TouchableHighlight style={[DetailsStyle.button, MainStyles.borderStyle]} onPress={()=>{this.props.navigate('Played')}}>
                        <Text style={MainStyles.bigWhiteStyle}>Played tournaments</Text>
                    </TouchableHighlight>
                </View>
            )
        }
        if(this.state.accountData.role === 'ROLE_ORGANIZER'){
            buttons.push(
                <View style={[DetailsStyle.buttonWrapper]} key="organizedTournaments" >
                    <TouchableHighlight style={[DetailsStyle.button, MainStyles.borderStyle]} onPress={()=>{this.props.navigate('Organized')}}>
                        <Text style={MainStyles.bigWhiteStyle}>Organized tournaments</Text>
                    </TouchableHighlight>
                </View>
            )
        }

        return buttons;
    }

    createRole(role){
        let roleName = role.replace("ROLE_","");
        roleName = roleName.toUpperCase();
        if(roleName === 'ACCEPTED'){
            return 'PLAYER';
        }
        return roleName;
    }

    render() {
        return (
            <ScrollView style={{flex:1}}>
                <View style={[DetailsStyle.header, MainStyles.borderStyle]}>
                    <Text numberOfLines={1} style={[MainStyles.textStyle,{fontSize:28}]}>{this.state.accountData.username}</Text>
                </View>
                <View style={DetailsStyle.avatarContainer}>
                    <View style={DetailsStyle.innerContainer}>
                        <Image style={DetailsStyle.avatar}
                               source={{uri:`${serverName}/get/user/avatar?username=${this.state.accountData.username}&${new Date().getTime()}`}}/>
                    </View>
                    <View style={InputStyles.inputText}>
                        <Text style={MainStyles.smallWhiteStyle}>{this.createRole(this.state.accountData.role)}</Text>
                    </View>
                </View>
                <View style={[DetailsStyle.buttonsCard,{width:this.props.dimension.width*0.8}]}>
                    <View style={[DetailsStyle.buttonWrapper]} key="editProfile" >
                        <TouchableHighlight style={[DetailsStyle.button, MainStyles.borderStyle]} onPress={()=>{this.editProfile()}}>
                            <Text style={MainStyles.bigWhiteStyle}>Edit profile</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={[DetailsStyle.buttonWrapper]} key="changePassword" >
                        <TouchableHighlight style={[DetailsStyle.button, MainStyles.borderStyle]} onPress={()=>{this.changePassword()}}>
                            <Text style={MainStyles.bigWhiteStyle}>Change password</Text>
                        </TouchableHighlight>
                    </View>
                    {this.createRoleButtons()}
                    <View style={[DetailsStyle.buttonWrapper]} key="logout" >
                        <TouchableHighlight style={[DetailsStyle.button, MainStyles.borderStyle]} onPress={()=>{this.logout()}}>
                            <Text style={MainStyles.bigWhiteStyle}>Log out</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                {this.state.showChangePasswordPopup && <ChangePasswordPopup disable={() => this.setState({showChangePasswordPopup: false})}/>}
                {this.state.showCreateAdminPopup && <CreateAdminPopup userKind={"admin"} disable={() => this.setState({showCreateAdminPopup: false})}/>}
            </ScrollView>
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        dimension:state.dimension,
        security:state.security,
        entityPanel: state.entityPanel
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( AccountPanel );
