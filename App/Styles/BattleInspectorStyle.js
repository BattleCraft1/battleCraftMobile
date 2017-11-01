/**
 * Created by FBegiello on 01.11.2017.
 */

import {
    StyleSheet,
    Dimensions
} from 'react-native';
import BaseColours from "../Main/consts/BaseColours"

const styles = StyleSheet.create({
    modal: {
        width: Dimensions.get('window').width*0.9,
        minHeight:300,
        maxHeight:800,
        padding: 10,
        flex:1,
        position: 'absolute',
        marginLeft: ((Dimensions.get('window').width*0.1-50)/2),

        backgroundColor: BaseColours.background.mediumBrown,
        borderColor: BaseColours.background.darkBrown,
        borderWidth: 5,

        flexDirection: 'column'
    },

    battleHeader:{
        backgroundColor: BaseColours.misc.deepRed,
        alignItems: 'center',
        borderWidth: 3,
        padding:3
    },

    playerCard:{
        backgroundColor: BaseColours.background.darkBrown,
        margin:3,
        padding:5
    },

    infoCard:{
        flex:1,
        flexDirection:'row' ,
        backgroundColor: BaseColours.background.lightBrown
    },
    dataColumn:{
        flex:1,
        borderColor: BaseColours.border.top,
        borderWidth:3,
        borderBottomWidth:0,
    },
    dataRow:{
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: BaseColours.border.top,
        borderBottomWidth:3,
        padding:3,
    },

    playerHeader:{
        backgroundColor: BaseColours.background.mediumBrown,
        alignItems: 'center',
        borderWidth: 3,
        padding:2,

    },

    avatar:{
        width:135,
        height:135,
    }

});

export default styles;