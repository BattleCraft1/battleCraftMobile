/**
 * Created by FBegiello on 23.11.2017.
 */
import Expo, { SQLite } from 'expo';
import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Button,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';

import {serverName} from "../../../../main/consts/serverName";
import axios from 'axios';

import MainStyles from '../../../../Styles/UniversalStyles/MainStyles'
import InputStyles from '../../../../Styles/UniversalStyles/InputStyles'
import BaseColours from 'battleCraftMobile/App/main/consts/BaseColours'
import EntityPanelInputsStyles from '../../../../Styles/CollectionPanelStyles/EntityPanelInputsStyles'

import {InputField} from 'react-native-form-generator';

import ValidationErrorMessage from '../../../entityPanel/outputs/ValidationErrorMessage'
import CheckBox from 'react-native-check-box'

const db = SQLite.openDatabase({ name: 'tokens2.db' });

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username:"",
            usernameError:"",
            password:"",
            passwordError:"",
            rememberMe:false
        }
    }

    componentDidMount(){
        db.transaction(tx => {
            tx.executeSql(
                'create table if not exists tokens2 (id integer primary key not null, token text, role text, date date);',
                [],
                (ts,success) => console.log(success),
                (ts,error) => {
                    console.log("error: ");
                    console.log(error)
                }
            );
        })
    }

    login(){
        this.setState({usernameError:""});
        this.setState({passwordError:""});

        let usernameError = "";
        let passwordError = "";

        if(!this.state.username.match(new RegExp("^[A-ZĄĆĘŁŃÓŚŹŻa-zzżźćńółęąś0-9]{3,30}$")))
            usernameError = "Name must have between 3 to 30 chars";
        if(this.state.password.length<8 || this.state.password.length>32)
            passwordError = "Password should have more than 8 characters and less than 32";

        if(usernameError!=="" || passwordError!==""){
            this.setState({usernameError:usernameError});
            this.setState({passwordError:passwordError});
            return;
        }

        let authDTO = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.startLoading("Log in...");
        axios.post(serverName+"auth",authDTO)
            .then(res => {
                this.props.stopLoading();
                let role = res.data.role.replace("ROLE_","");
                role = role.toLocaleLowerCase();
                if(role === 'accepted'){
                    role = 'player'
                }
                else if(role === 'new'){
                    role = 'new user'
                }
                let date = new Date();
                this.props.setTokenAndRole(res.data.token,res.data.role);
                db.transaction(
                    tx => {
                        tx.executeSql(
                            'delete from tokens2 where id = 1',
                            [],
                            (ts,success) => {
                                if(this.state.rememberMe){
                                    this.updateTokenInDatabase(res.data.token,res.data.role,date);
                                }
                            },
                            (ts,error) => {
                                console.log("error: ");
                                console.log(error)
                            }
                        );
                    }
                );
                this.props.showSuccessMessage("You successfully log in with "+role+" permissions");
            })
            .catch(error => {
                this.props.stopLoading();
                this.props.showNetworkErrorMessage(error);
            });
    }

    updateTokenInDatabase(token,role,date){
        db.transaction(
            tx => {
                this.insertNewToken(tx,token,role,date);
            },
            (ts,error)  => {
                console.log("error: ");
                console.log(error)
            },
            (ts,success) => console.log(success))

    }

    insertNewToken(tx,token,role,date){
        tx.executeSql(
            `insert into tokens2 (id,token,role,date)  values (1,?,?,?)`,
            [token,role,date],
            (ts,success) => console.log(success),
            (ts,error) => {
                console.log("error: ");
                console.log(error)
            }
        );
    }

    render() {
        return (
            <ScrollView style={{flex:1}}>
                <View style={InputStyles.inputCard}>
                    <View style={InputStyles.inputText}>
                        <Text style={MainStyles.smallWhiteStyle}>Username</Text>
                    </View>

                    <View style={EntityPanelInputsStyles.inputStyle}>
                        <InputField
                            onValueChange={(value)=>{this.setState({username:value})}}
                            value = {this.state.username}
                            placeholder={"jarek123"}
                        />
                    </View>
                    <ValidationErrorMessage
                        validationErrorMessage={this.state.usernameError}/>
                </View>

                <View style={InputStyles.inputCard}>
                    <View style={InputStyles.inputText}>
                        <Text style={MainStyles.smallWhiteStyle}>Password</Text>
                    </View>

                    <View style={EntityPanelInputsStyles.inputStyle}>
                        <InputField
                            secureTextEntry={true}
                            onValueChange={(value)=>{this.setState({password:value})}}
                            value = {this.state.password}
                        />
                    </View>
                    <ValidationErrorMessage
                        validationErrorMessage={this.state.passwordError}/>
                </View>


                <View style={[InputStyles.inputCard,{flexDirection:'row',alignItems:'center'}]}>
                    <CheckBox
                        style={{width:55, height:55,justifyContent:'center',alignItems:'center'}}
                        isChecked={this.state.rememberMe}
                        onClick={() => {
                            let checked = !this.state.rememberMe;
                            this.setState({rememberMe:checked});
                        }}
                    />
                    <Text style={MainStyles.smallWhiteStyle}> Remember me</Text>
                </View>

                <View>
                    <Button title="Submit" color={BaseColours.background.darkBrown} style={{}} onPress={()=>{this.login()}}/>
                </View>

            </ScrollView>
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( LoginForm );
