/**
 * Created by FBegiello on 23.11.2017.
 */

import React, { Component } from 'react';
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

class AccountDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playerNick: 'Logged in user login'
        }
    }

    logout(){
        //toDo - write logging out
    }

    openTab(tabID){
        //toDo - write open tabscriptt
    }

    renderButton(buttonText){
        return(
            <View style={[DetailsStyle.buttonWrapper]} key={buttonText} >
                <TouchableHighlight style={[DetailsStyle.button, MainStyles.borderStyle]} onPress={()=>this.openTab(buttonText)}>
                    <Text style={MainStyles.bigWhiteStyle}>{buttonText}</Text>
                </TouchableHighlight>
            </View>);
    }

    render() {
        let options=["Account details","Organized tournaments", "Participated tournaments", "Notifications",];

        let content=[];
        for (let i=0;i<options.length;i++)
        {
            content.push(this.renderButton(options[i]));
        }

        return (
            <ScrollView style={{flex:1}}>
                <View style={[DetailsStyle.header, MainStyles.borderStyle]}>
                    <Text style={[MainStyles.textStyle,{fontSize:28}]}>{this.state.playerNick}</Text>
                </View>
                <View style={DetailsStyle.avatarContainer}>
                    <View style={DetailsStyle.innerContainer}>
                        <Image style={DetailsStyle.avatar} source={require("battleCraftMobile/img/questionAvatar.png")}/>
                    </View>
                </View>
                <View style={[DetailsStyle.buttonsCard,{width:this.props.dimension.width*0.8}]}>
                    {content}
                </View>
                <View style={[DetailsStyle.buttonLogout]}>
                    <TouchableHighlight style={{flex:1}} onPress={()=>{}}>
                        <Text style={MainStyles.bigWhiteStyle}>Log out</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        );
    }
}


function mapStateToProps( state ) {
    return {
        dimension:state.dimension
    };
}

export default connect( mapStateToProps )( AccountDetails );
