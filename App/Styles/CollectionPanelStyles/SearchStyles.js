/**
 * Created by FBegiello on 25.10.2017.
 */

import {
    StyleSheet,
} from 'react-native';
import BaseColours from "../../main/consts/BaseColours"

const styles = StyleSheet.create({

    headerStyle:{
        borderTopColor: BaseColours.border.top,
        borderRightColor: BaseColours.border.right,
        borderBottomColor: BaseColours.border.bottom,
        borderLeftColor: BaseColours.border.left,
        borderWidth: 3,
        marginBottom:5,
        backgroundColor: BaseColours.misc.deepRed,
        alignItems: 'center',
    },

});

export default styles;