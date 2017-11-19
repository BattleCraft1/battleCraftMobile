/**
 * Created by FBegiello on 30.10.2017.
 */

import {
    StyleSheet
} from 'react-native';
import BaseColours from "../../main/consts/BaseColours"

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
        borderWidth:5,
        borderColor: BaseColours.background.darkBrown,
        marginBottom: 3,
    },
    scoreRow:{
            flexDirection:'column',
    },
    scoreContainer: {
        flex:2,
        flexDirection:'column',
        backgroundColor: BaseColours.background.lightBrown,
        alignItems:'center',
        justifyContent:'center'
    },

    scoreboard:{
        alignSelf: "stretch",
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
    },

    playerHeader:{
        flexDirection:'row',
        padding:3,
        borderWidth:3,
    },
    playerHeaderScoreboard:{
        alignSelf: "stretch",
        flex:1,
        padding:2,
        borderWidth:2,
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
    userContainer:{
        padding:5,
        flexDirection:'row',
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    avatarSize:{
        flex:1,
        maxHeight:150
    },

});

export default styles;
