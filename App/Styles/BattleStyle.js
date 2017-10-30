/**
 * Created by FBegiello on 30.10.2017.
 */

import BaseColours from "../Main/consts/BaseColours"

const styles = {

    battleWindow:{
        borderWidth:5,
        borderColor: BaseColours.background.darkBrown,
        marginBottom: 3,
    },

    scoreRow:{
            flexDirection:'row',
    },

    scoreContainer: {
        flex:1,
        backgroundColor: BaseColours.background.lightBrown,
        alignItems:'center',
        justifyContent:'center'
    },

    playerHeader:{
        padding:3,
        borderWidth:3,
    },
    player1Text:{
        paddingLeft: 5,
        textAlign:"left",
    },
    player2Text:{
        paddingRight: 5,
        textAlign:"right",
    },

    avatarSize:{
        width:120,
        height:120
    },

};

export default styles;
