/* Created by FBegiello on 06.08.2017.*/

import BaseColours from "../../main/consts/BaseColours"

const styles = {

    staticWindow:{
        flexDirection: 'row',
        position:'absolute',
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
    pageWindow:{
        right:0,
    },
    randomizeWindow:{
        right:0,
        width:45,
        height:45,
    },
    diceIcon:{
        width:35,
        height:35
    }

};

export default styles;
