import {
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    modalContainer: {
        height: 350,
        backgroundColor:'gray'
    },

    modalHeader: {
        height: 50,
        backgroundColor:'#fafafa',
        alignItems: 'center',
        justifyContent: 'center'
    },

    modalHeaderText: {
        fontSize: 17,
        fontWeight: 'bold'
    },

    modalFooter: {
        height: 50,
        backgroundColor: '#fafafa',
        alignItems: 'center',
        justifyContent: 'center'
    },

    modalFooterButton: {
        height: 40,
        width: 150
    }
});

export default styles;
