import {
    StyleSheet,
    Dimensions
} from 'react-native';
import BaseColours from "../main/consts/BaseColours"

const styles = StyleSheet.create({
    modal: {

        width: 255,
        padding: 10,
        flex:1,
        position: 'absolute',
        marginLeft: ((Dimensions.get('window').width-310)/2),

        backgroundColor: BaseColours.background.mediumBrown,
        borderColor: BaseColours.background.darkBrown,
        borderWidth: 5,

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
        alignItems:'center'
    },
    iconsRow:{
        flexDirection: 'row'
    },
    buttonRow:{
        flex: 1,
        flexDirection: 'row',
    },
    iconText:{
        color: '#ffffff',
        fontWeight: 'bold'
    },
});

export default styles;