/**
 * Created by FBegiello on 03.12.2017.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';
import BaseColours from "../../main/consts/BaseColours"

const styles = StyleSheet.create({

    buttonWrapper:{
        borderWidth:3,
        backgroundColor:BaseColours.background.mediumBrown
    },
    buttonBackground:{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    buttonStyle:{
        flex: 1,
        padding:5,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems:'center',
    }

});
export default styles;