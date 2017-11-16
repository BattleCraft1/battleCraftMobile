/**
 * Created by FBegiello on 06.08.2017.
 */

import {
    StyleSheet,
} from 'react-native';
import BaseColours from "../../main/consts/BaseColours"

const styles = StyleSheet.create({
    navbarStyle: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 5,
        borderWidth: 5,
        backgroundColor: BaseColours.background.mediumBrown,
    },
    navbarTextStyle: {
        fontWeight: 'bold',
        fontSize: 26,
    },
    menuStyle: {
        position: 'absolute',
        left:0,
        borderWidth: 0,
        height: 255,
        backgroundColor: BaseColours.background.mediumBrown,
    },
    menuTextStyle: {
        textAlign: 'center',
        borderWidth: 3,
        backgroundColor: BaseColours.background.mediumBrown,

        fontSize: 18,
    },
    logoStyle: {
        width: 45,
        height: 45,
    },
    iconStyle: {
        width: 40,
        height: 40,
    },


});

export default styles;