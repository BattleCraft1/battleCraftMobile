/**
 * Created by FBegiello on 06.08.2017.
 */

import {
    StyleSheet,
} from 'react-native';


const styles = StyleSheet.create({
    navbarStyle: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 5,
        borderWidth: 5,
        backgroundColor: '#805D2C',
    },
    navbarTextStyle: {
        fontWeight: 'bold',
        fontSize: 26,
    },
    menuStyle: {
        position: 'absolute',
        left:0,
        borderWidth: 0,
        height: 205,
        backgroundColor: '#805D2C',
    },
    menuTextStyle: {
        textAlign: 'center',
        borderWidth: 3,
        backgroundColor: '#805D2C',

        fontSize: 18,
    },
    logoStyle: {
        width: 50,
        height: 50,
    },
    iconStyle: {
        width: 40,
        height: 40,
    },


});

export default styles;