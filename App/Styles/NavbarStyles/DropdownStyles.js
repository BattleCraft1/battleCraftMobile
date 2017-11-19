/**
 * Created by FBegiello on 21.10.2017.
 */
import {
    StyleSheet,
} from 'react-native';
import BaseColours from "../../main/consts/BaseColours"

const styles = StyleSheet.create({
    dropdownContainerStyle:{
        position: 'absolute',
        zIndex: 10000,
        top:60,
        right:0,
        backgroundColor: BaseColours.background.mediumBrown,
        borderColor: BaseColours.border.top,
        borderWidth: 3
    },
    dropdownOptionStyle:{
        flex: 1,
        marginTop:2,
        padding:10,
        minHeight:50,
        backgroundColor: BaseColours.background.darkBrown,
    },
    outerBorder:{
        flex:1,
        borderColor:BaseColours.border.top,
        backgroundColor: BaseColours.misc.deepRed,
        borderWidth:3,
        padding:3,
    },
    innerBorder:{
        flex:1,
        alignItems: 'center',
        justifyContent:'center',
        borderColor:BaseColours.border.top,
        borderWidth:3,
        padding: 5
    }
});

export default styles;

