import {
    StyleSheet,
    Dimensions
} from 'react-native';
import BaseColours from "../main/consts/BaseColours"

const styles = StyleSheet.create({
    modalContainer: {
        width:340,
        height:270,
        padding: 10,
        flex:1,

        position: 'absolute',
        marginLeft: ((Dimensions.get('window').width-340)/2),
    },

    modalHeader: {
        borderTopColor: BaseColours.border.top,
        borderRightColor: BaseColours.border.right,
        borderBottomColor: BaseColours.border.bottom,
        borderLeftColor: BaseColours.border.left,
        borderWidth: 5,
        backgroundColor: BaseColours.background.mediumBrown,
        height: 50,
        width:300,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    modalBody: {
        height: 150,
        width:300,
        padding: 10,
        borderColor: BaseColours.background.darkBrown,
        backgroundColor: BaseColours.background.mediumBrown,
        borderLeftWidth:5,
        borderRightWidth:5,
        borderTopWidth:5,
        alignItems: 'center',
        justifyContent: 'center'
    },

    modalFooter: {
        flex: 1,
        flexDirection: 'row',
        borderLeftWidth:5,
        borderRightWidth:5,
        borderBottomWidth:5,
        height: 50,
        width:300,
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

