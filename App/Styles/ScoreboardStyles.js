/**
 * Created by FBegiello on 15.11.2017.
 */

import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import BaseColours from "../main/consts/BaseColours"

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
    scoreboardHeader:{
        backgroundColor: BaseColours.misc.deepRed,
        borderTopColor: BaseColours.border.top,
        borderRightColor: BaseColours.border.right,
        borderBottomColor: BaseColours.border.bottom,
        borderLeftColor: BaseColours.border.left,
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
        padding:3,
    },
    scoreboardRow:{
        flexDirection:'row',
        flex:1
    },
    positionNumber:{
        width:43,
        height:43,
        backgroundColor: BaseColours.misc.deepRed,
        padding:3,
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopColor: BaseColours.border.top,
        borderRightColor: BaseColours.border.right,
        borderBottomColor: BaseColours.border.bottom,
        borderLeftColor: BaseColours.border.left,
    },
    positionNumber2x2:{
        width:43,
        height:86,
    },
    dataCard:{
        flex:1,
        flexDirection:'row',
        borderWidth: 3,
        borderColor: BaseColours.border.top,
    },
    avatarContainer:{
        width:37,
        height:37,
        backgroundColor: BaseColours.background.lightBrown,
        borderColor: BaseColours.border.top,
        borderRightWidth: 3,
    },
    textContainer:{
        padding:3,
        paddingLeft:10,
        justifyContent: 'flex-start',
        alignItems: 'center',
    }


});

export default styles;