import {
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    modalContainer: {
        width:250,
        padding: 10,
        height:200
    },

    modalHeader: {
        backgroundColor: '#4b371b',
        height: 50,
        width:250,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    modalHeaderText: {
        fontFamily:'arial',
        textShadowColor: '#000000',
        fontSize: 17
    },

    modalBody: {
        height: 100,
        width:250,
        padding: 10,
        borderColor: '#4b371b',
        backgroundColor: '#E0BA51',
        borderLeftWidth:2,
        borderRightWidth:2,
        borderTopWidth:2,
        alignItems: 'center',
        justifyContent: 'center'
    },

    modalBodyText: {
        fontFamily:'arial',
        textShadowColor: '#000000',
        fontSize: 17
    },

    modalFooter: {
        borderLeftWidth:2,
        borderRightWidth:2,
        borderBottomWidth:2,
        padding: 10,
        height: 50,
        width:250,
        backgroundColor: '#E0BA51',
        borderColor: '#4b371b',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalFooterButton:{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding:5,
        width:50,
        backgroundColor: '#4b371b'
    }
});

export default styles;

