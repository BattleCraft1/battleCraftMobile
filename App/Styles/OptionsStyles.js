import {
    StyleSheet,
    Dimensions
} from 'react-native';

const styles = StyleSheet.create({
    modal: {

        height: 220,
        width: 255,
        position: 'absolute',
        marginLeft: ((Dimensions.get('window').width-285)/2)-10,

        backgroundColor: '#805D2C',
        padding: 10,
        borderTopColor: '#e3ca86',
        borderRightColor: '#4b371b',
        borderBottomColor: '#E0BA51',
        borderLeftColor: '#ecdbac',
        borderWidth: 5,
        flexDirection: 'column'
    },
    icon: {
        width: 70,
        height: 70,
        backgroundColor:'#a58e60',
        borderColor: '#4b371b',
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