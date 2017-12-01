import Expo, { SQLite } from 'expo';
import React from 'react';
import {
    View
} from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import getDatesDifferenceInDays from "../../../main/functions/getDatesDifferenceInDays";

import {serverName} from "../../../main/consts/serverName";
import axios from 'axios';

const db = SQLite.openDatabase({ name: 'tokens2.db' });

class AuthManager extends React.Component {
    componentDidMount() {

        this.props.startLoading("Checking authorization data...");

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

                tx.executeSql(
                    'select * from tokens2 where id=1',
                    [],
                    (ts,result) =>{
                        console.log("result array: ");
                        let rows = result.rows._array;
                        console.log(JSON.stringify(rows));
                        if(rows.length !== 0){
                            let authData = rows[0];
                            let today = new Date();
                            if(getDatesDifferenceInDays(new Date(authData.date),today)>14){
                                this.refreshToken(authData.token);
                            }
                            else{
                                this.props.setTokenAndRole(authData.token,authData.role);
                            }
                        }
                    },
                    (ts,error)  => {
                        console.log("error: ");
                        console.log(error)
                    }
                );
            },
            (ts,error)  => {
                console.log("error: ");
                console.log(error);
                this.props.stopLoading()
            },
            (ts,success) => this.props.stopLoading());
    }

    refreshToken(token){
        axios.get(serverName+"auth/refresh",
            {
                headers: {
                    "X-Auth-Token":token
                }
            }
        ).then(
            res => {
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
            }
        ).catch(
            error => {
                this.props.showNetworkErrorMessage(error);
            }
        )
    }

    updateTokenInDatabase(token,role,date){
        db.transaction(
            tx => {
                this.updateToken(tx,token,role,date);
            },
            (ts,error)  => {
                console.log("error: ");
                console.log(error)
            },
            (ts,success) => console.log(success))

    }

    updateToken(tx,token,role,date){
        tx.executeSql(
            `update tokens2 set token = ? ,role = ? ,date = ? where id = 1;`,
            [token,role,date],
            (ts,success) => console.log(success),
            (ts,error) => {
                console.log("error: ");
                console.log(error)
            }
        );
    }

    render(){
        return (
            <View/>
        )
    }

}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( AuthManager );