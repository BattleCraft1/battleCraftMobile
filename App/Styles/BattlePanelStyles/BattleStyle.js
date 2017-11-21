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
        borderWidth: 3,
        borderColor: BaseColours.border.top,
        padding:5
    },
    battleWindow:{
        borderWidth:5,
        borderColor: BaseColours.background.darkBrown,
        marginBottom: 3,
        alignSelf:'stretch'
    },
    scoreRow:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    scoreContainer: {
        flex:1,
        flexDirection:'row',
        backgroundColor: BaseColours.background.lightBrown,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
    },
    scoreContainer2x2: {
        flex:1,
        flexDirection:'column',
        backgroundColor: BaseColours.background.lightBrown,
        alignItems:'center',
        justifyContent:'center'
    },
    scoreboard:{
        padding:5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
    },
    playerHeader:{
        flex:1,
        flexDirection:'row',
        alignItems: 'center',
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
    avatarContainer:{
        padding:5,
        alignItems:'center',
        justifyContent:'center'
    },
    avatarSize:{
        backgroundColor: BaseColours.background.lightBrown,
        resizeMode:'contain',
    },
    iconVS:{
        flex:1,
        maxHeight: 80,
        maxWidth: 80,
        padding:5,
        resizeMode:'contain'
    }

});

export default styles;
