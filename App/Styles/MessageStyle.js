import {
    StyleSheet,
    Dimensions
} from 'react-native';

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

    modalBody: {
        height: 150,
        width:300,
        padding: 10,
        borderColor: '#4b371b',
        backgroundColor: '#805D2C',
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
        borderColor: '#4b371b',
        backgroundColor: '#805D2C',
    },
    modalFooterButton:{
        margin: 3,
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#4b371b',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default styles;

