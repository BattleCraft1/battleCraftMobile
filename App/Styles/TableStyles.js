/**
 * Created by FBegiello on 06.08.2017.
 */

import {
    StyleSheet,
} from 'react-native';
import BaseColours from "../main/consts/BaseColours"

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
    icon: {
        width: 30,
        height: 30,
        backgroundColor: BaseColours.misc.deepRed,
        borderTopColor: BaseColours.border.top,
        borderRightColor: BaseColours.border.right,
        borderBottomColor: BaseColours.border.bottom,
        borderLeftColor: BaseColours.border.left,
        borderWidth: 2,
        margin: 1,
        alignItems:'center'
    },
    iconsRow:{
        flexDirection: 'row'
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