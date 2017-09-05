import {
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    modalContainer: {
        width:300,
        padding: 10,
        height:300
    },

    modalHeader: {
        borderTopColor: '#e3ca86',
        borderRightColor: '#4b371b',
        borderBottomColor: '#E0BA51',
        borderLeftColor: '#ecdbac',
        borderWidth: 5,
        backgroundColor: '#805D2C',
        height: 50,
        width:300,
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
        height: 200,
        width:300,
        padding: 10,
        borderColor: '#4b371b',
        backgroundColor: '#805D2C',
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
        width:300,
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

