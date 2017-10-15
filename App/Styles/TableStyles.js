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
        backgroundColor: BaseColours.background.darkBrown,
        borderColor:BaseColours.border.top,
        borderWidth: 2,
        borderTopWidth: 0,
    },
    header:{
        flexDirection: 'row',
        justifyContent:'center',
        backgroundColor: BaseColours.background.darkBrown,
        borderColor:BaseColours.border.top,
        borderWidth: 3,
        padding: 3,
    }
});


export default styles;