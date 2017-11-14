/**
 * Created by FBegiello on 14.11.2017.
 */

import {
    StyleSheet,
} from 'react-native';

import BaseColours from "battleCraftMobile/App/main/consts/BaseColours"

const styles = StyleSheet.create({
    messageBackground:{
        flexDirection: 'row',
        backgroundColor: BaseColours.background.lightBrown,
        borderColor: BaseColours.misc.deepRed,
        borderWidth: 3,
        borderStyle:  'dashed',
        padding: 3,
    },

    warningContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },

    iconStyle:{
        justifyContent:'center',
        alignItems:'center',
        padding: 3,
    },

    warningText:{
        fontSize:18,
        color: BaseColours.misc.deepRed,
        fontWeight : 'bold'
    }

});

export default styles;
