/* Created by FBegiello on 06.08.2017.*/

import BaseColours from "../Main/consts/BaseColours"

const styles = {

    tournamentHeader:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:  BaseColours.background.darkBrown,
        borderWidth: 3,
        padding:5,
        marginBottom:3
    },
    turnHeader:{
        justifyContent: 'center',
        alignItems: 'center',
        height:55,
        backgroundColor:  BaseColours.misc.deepRed,
        borderWidth: 3,
        borderColor: BaseColours.border.top,
        padding:5
    },
    pageWindow:{
        position:'absolute',
        right:0,
        top:0,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        backgroundColor: BaseColours.misc.deepRed,
        width:55,
        height:55,
        zIndex: 1000,
        padding:1

    },

};

export default styles;
