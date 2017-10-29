/**
 * Created by FBegiello on 06.08.2017.
 */
import BaseColours from "../main/consts/BaseColours"

const styles = {
    drawer: {
        backgroundColor: BaseColours.background.mediumBrown,
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 3
    },
    main: {
        paddingLeft: 3
    },
    pageWindow:{
        position:'absolute',
        right:0,
        top:0,
        justifyContent: 'center',
        borderWidth: 3,
        backgroundColor: BaseColours.misc.deepRed,
        width:55,
        height:55,
        zIndex: 1000,
        padding:1

    }
};

export default styles;
