/**
 * Created by FBegiello on 06.08.2017.
 */

import {
    StyleSheet,
} from 'react-native';
import BaseColours from "../Main/consts/BaseColours"

const styles = StyleSheet.create({
    table:{
        alignSelf: "stretch"
    },
    row:{
        backgroundColor: BaseColours.background.lightBrown,
        borderColor:BaseColours.border.top,
        borderWidth: 2
    },
    sectionHeader:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor: BaseColours.background.darkBrown,
        borderColor:BaseColours.border.top,
        borderWidth: 2,
        borderTopWidth: 0,
        paddingLeft:10,
        height:50,
    },
    header:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: BaseColours.misc.deepRed,
        borderColor:BaseColours.border.top,
        borderWidth: 3,
        padding: 3,
        height:55,
    },
});


export default styles;