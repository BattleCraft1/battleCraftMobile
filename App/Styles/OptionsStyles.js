import {
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    modal: {
        width:250,
        height:210,
        backgroundColor: '#E0BA51',
        padding: 10,
        borderColor: '#4b371b',
        borderWidth: 2,
        flexDirection: 'column'
    },
    icon: {
        width: 70,
        height: 70,
        borderColor: '#4b371b',
        borderWidth: 3,
        margin: 2,
        alignItems:'center'
    },
    iconsRow:{
        flexDirection: 'row'
    },
    buttonRow:{
        alignItems:'center'
    },
    iconText: {
        color: '#4b371b',
    }
});

export default styles;