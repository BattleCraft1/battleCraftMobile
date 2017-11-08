/**
 * Created by FBegiello on 30.10.2017.
 */

import {
    StyleSheet
} from 'react-native';
import BaseColours from "../Main/consts/BaseColours"

const styles = StyleSheet.create({
    turnHeader:{
        justifyContent: 'center',
        alignItems: 'center',
        height:55,
        backgroundColor: BaseColours.misc.deepRed,
        borderWidth: 3,
        borderColor: BaseColours.border.top,
        padding:5
    },
    battleWindow:{
        minWidth:460,
        maxWidth:500,
        borderWidth:5,
        borderColor: BaseColours.background.darkBrown,
        marginBottom: 3,
    },
    scoreRow:{
            flexDirection:'row',
    },
    scoreContainer: {
        flex:1,
        flexDirection:'row',
        backgroundColor: BaseColours.background.lightBrown,
        alignItems:'center',
        justifyContent:'center'
    },

    scoreboard:{
        width:80,
        height:80,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
    },

    playerHeader:{
        flexDirection:'row',
        padding:3,
        borderWidth:3,
    },
    player1Text:{
        flex:1,
        paddingLeft: 5,
        textAlign:"left",
    },
    player2Text:{
        flex:1,
        paddingRight: 5,
        textAlign:"right",
    },
    avatarContener:{
        width:110,
        height:110,
        alignItems:'center',
        justifyContent:'center'
    },
    avatarSize:{
        width: 100,
        height: 100
    },

});

export default styles;
