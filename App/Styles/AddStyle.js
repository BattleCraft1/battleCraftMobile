/**
 * Created by FBegiello on 17.10.2017.
 */

import {
    StyleSheet,
    Dimensions
} from 'react-native';
import BaseColours from "../Main/consts/BaseColours"

const styles = StyleSheet.create({
    modal: {
        width: Dimensions.get('window').width*0.9,
        height:600,
        padding: 10,
        flex:1,
        position: 'absolute',
        marginLeft: ((Dimensions.get('window').width*0.1-50)/2),

        backgroundColor: BaseColours.background.mediumBrown,
        borderColor: BaseColours.background.darkBrown,
        borderWidth: 5,

        flexDirection: 'column'
    },
    title: {
        borderTopColor: BaseColours.border.top,
        borderRightColor: BaseColours.border.right,
        borderBottomColor: BaseColours.border.bottom,
        borderLeftColor: BaseColours.border.left,
        borderWidth: 3,
        backgroundColor: BaseColours.misc.deepRed,
        marginBottom: 1
    },
    button:{
        flex: 1,
        margin: 1
    },
    buttonRow:{
        flexDirection: 'row',
    },
});

export default styles;
