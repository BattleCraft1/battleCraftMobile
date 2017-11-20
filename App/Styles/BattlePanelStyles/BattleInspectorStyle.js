/**
 * Created by FBegiello on 01.11.2017.
 */

import {
    StyleSheet,
    Dimensions
} from 'react-native';
import BaseColours from "../../main/consts/BaseColours"

const styles = StyleSheet.create({
    modal: {
        padding: 10,
        flex:1,
        position: 'absolute',
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
    vsCard:{
        backgroundColor: BaseColours.misc.deepRed,
        flexDirection:'row',
        alignSelf: 'center',
        borderWidth:3,
        margin:3,
        padding:5
    },

    infoCard:{
        justifyContent: 'center',
        alignItems: 'center',
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
        flex:1
    },
    playerHeader:{
        flexDirection:'row',
        backgroundColor: BaseColours.background.mediumBrown,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        padding:2,
    },
    avatarContainerStyle:{
        justifyContent:'center',
        alignItems:'center',
        borderTopColor: BaseColours.border.top,
        borderRightColor: BaseColours.border.right,
        borderBottomColor: BaseColours.border.bottom,
        borderLeftColor: BaseColours.border.left,
        backgroundColor:BaseColours.misc.deepRed,
        borderWidth:5,
        padding: 3,
        width:130,
        height:130
    },
    avatarInList:{
        resizeMode:'contain',
        width:90,
        height:90,
    },
    avatar:{
        resizeMode:'contain',
        width:120,
        height:120,
    },
    avatar2x2:{
        width:68,
        height:68,
    }

});

export default styles;
