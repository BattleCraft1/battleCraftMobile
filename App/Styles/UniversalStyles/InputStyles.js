/**
 * Created by FBegiello on 15.11.2017.
 */

import {
    StyleSheet,
} from 'react-native';
import BaseColours from "../../main/consts/BaseColours"

const styles = StyleSheet.create({

    inputCard:{
        borderColor:BaseColours.background.darkBrown,
            borderWidth:3,
            padding:3,
            marginBottom: 5,
            backgroundColor:BaseColours.background.mediumBrown
    },
    inputText:{
        backgroundColor:BaseColours.background.lightBrown,
            borderColor:BaseColours.border.top,
            borderWidth:2,
            padding:3,
            marginBottom: 3,
            alignItems: 'center',
            justifyContent:'center',
    },

});
export default styles;