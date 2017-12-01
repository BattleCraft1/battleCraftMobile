import {
    StyleSheet,
    Dimensions
} from 'react-native';
import BaseColours from "../../main/consts/BaseColours"

const styles = StyleSheet.create({
    modalContainer: {
        width:290,
        padding: 10,
        flex:1,
        position: 'absolute',
    },

    modalHeader: {
        borderTopColor: BaseColours.border.top,
        borderRightColor: BaseColours.border.right,
        borderBottomColor: BaseColours.border.bottom,
        borderLeftColor: BaseColours.border.left,
        borderWidth: 5,
        backgroundColor: BaseColours.background.mediumBrown,
        height: 50,
        width:290,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    modalBody: {
        height: 150,
        width:290,
        padding: 10,
        borderColor: BaseColours.background.darkBrown,
        backgroundColor: BaseColours.background.mediumBrown,
        borderLeftWidth:5,
        borderRightWidth:5,
        borderTopWidth:5,
        alignItems: 'center',
        justifyContent: 'center'
    },

    reportModalBody: {
        height: 70,
        width:290,
        borderColor: BaseColours.background.darkBrown,
        backgroundColor: BaseColours.background.mediumBrown,
        borderLeftWidth:5,
        borderRightWidth:5,
        borderTopWidth:5,
        justifyContent: 'space-between'
    },

    modalFooter: {
        flex: 1,
        flexDirection: 'row',
        borderLeftWidth:5,
        borderRightWidth:5,
        borderBottomWidth:5,
        height: 50,
        width:290,
        borderColor: BaseColours.background.darkBrown,
        backgroundColor: BaseColours.background.mediumBrown,
    },
    modalFooterButton:{
        margin: 3,
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: BaseColours.background.darkBrown,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default styles;

