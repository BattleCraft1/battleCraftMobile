/**
 * Created by FBegiello on 06.08.2017.
 */

import {
    StyleSheet,
} from 'react-native';
import BaseColours from "../main/consts/BaseColours"

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#000',
    },
    centering:{
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    textStyle:{
        fontFamily:'arial',
        textShadowColor: '#000000',
        textShadowOffset: {width: -1, height: -1},
        color: '#fff',
    },
    borderStyle:{
        borderTopColor: BaseColours.border.top,
        borderRightColor: BaseColours.border.right,
        borderBottomColor: BaseColours.border.bottom,
        borderLeftColor: BaseColours.border.left,
    },
    contentStyle: {
        flex: 1,
        padding: 5,
        marginTop: 1,
        justifyContent: 'center',
        borderColor: BaseColours.background.darkBrown,
        borderWidth: 5,
        backgroundColor: BaseColours.background.mediumBrown,
    },
    bigWhiteStyle: {
        fontFamily:'arial',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    smallWhiteStyle: {
        fontFamily:'arial',
        color: '#fff',
        fontSize: 17,
    },
    verySmallWhiteStyle: {
        fontFamily:'arial',
        color: '#fff',
        fontSize: 15,
    },
    buttonsPanelStyle:{
        marginTop:20,
        padding:3,
        flexDirection:'row',
        backgroundColor: BaseColours.background.mediumBrown
    }
});

export default styles;