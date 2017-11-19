import {
    StyleSheet,
} from 'react-native';
import BaseColours from "../../main/consts/BaseColours"

const styles = StyleSheet.create({
    modal: {
        flex:1,
        position: 'absolute',

        backgroundColor: BaseColours.background.mediumBrown,
        borderColor: BaseColours.background.darkBrown,
        borderWidth: 5,
        padding: 3,
        flexDirection: 'column'
    },
    icon: {
        width: 70,
        height: 70,
        backgroundColor: BaseColours.misc.deepRed,
        borderTopColor: BaseColours.border.top,
        borderRightColor: BaseColours.border.right,
        borderBottomColor: BaseColours.border.bottom,
        borderLeftColor: BaseColours.border.left,
        borderWidth: 3,
        margin: 2,
        padding:2,
        alignItems:'center'
    },
    buttonRow:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button:{
        marginTop:5,
        flex:1,
    },
    iconText:{
        color: '#ffffff',
        fontWeight: 'bold'
    },
});

export default styles;