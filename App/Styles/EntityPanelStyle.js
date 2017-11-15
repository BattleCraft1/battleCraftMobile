/**
 * Created by FBegiello on 17.10.2017.
 */

import {
    StyleSheet,
    Dimensions
} from 'react-native';
import BaseColours from "../main/consts/BaseColours"

const styles = StyleSheet.create({
    modal: {
        padding: 5,
        position: 'absolute',
        backgroundColor: BaseColours.background.mediumBrown,
        borderColor: BaseColours.background.darkBrown,
        borderWidth: 5,
        flexDirection: 'column'
    },
    scrollView:{
        padding:3
    },
    navigation:{},
    title: {
        borderTopColor: BaseColours.border.top,
        borderRightColor: BaseColours.border.right,
        borderBottomColor: BaseColours.border.bottom,
        borderLeftColor: BaseColours.border.left,
        borderWidth: 3,
        backgroundColor: BaseColours.misc.deepRed,
        marginBottom: 1
    },

    formWindow:{
        borderColor: BaseColours.border.top,
        borderWidth: 3,
        padding: 5,
    },

    formHeader:{
        backgroundColor: BaseColours.background.darkBrown,
        borderColor: BaseColours.border.top,
        borderWidth: 3,
        borderBottomWidth: 0,
        alignItems: 'center'
    },

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

    playerHeader:{
        alignItems: 'center',
        justifyContent:'center',
        padding:3,
        margin:3,
        backgroundColor: BaseColours.background.darkBrown,
        borderTopColor: BaseColours.border.top,
        borderRightColor: BaseColours.border.right,
        borderBottomColor: BaseColours.border.bottom,
        borderLeftColor: BaseColours.border.left,
        borderWidth: 3,
    },

    button:{
        alignItems: 'center',
        justifyContent:'center',
        padding:5,
        flex: 1,
        margin: 2
    },
    participantsGroupButton:{
        alignItems: 'center',
        justifyContent:'center',
        padding:1,
        paddingTop:2,
        paddingBottom:2,
        flex: 1,
        margin: 1,
        backgroundColor: BaseColours.misc.deepRed
    },
    buttonRow:{
        flexDirection: 'row',
    },
    buttonText:{
        color:'white',
        fontSize:15
    }
});

export default styles;
