/**
 * Created by FBegiello on 06.08.2017.
 */

import {
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#000',
    },
    centering:{
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    textStyle:{
        fontFamily:'arial, helvetica, sans-serif',
        textShadowColor: '#000000',
        textShadowOffset: {width: -1, height: -1},
        color: '#fff',
    },
    borderStyle:{
        borderTopColor: '#e3ca86',
        borderRightColor: '#4b371b',
        borderBottomColor: '#E0BA51',
        borderLeftColor: '#ecdbac',
    },
    contentStyle: {
        flex: 0.9,
        padding: 5,
        marginTop: 1,
        justifyContent: 'center',
        borderColor: '#4b371b',
        borderWidth: 5,
        backgroundColor: '#805D2C',
    },
    bigWhiteStyle: {
        fontFamily:'arial, helvetica, sans-serif',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 26,
    },
    smallWhiteStyle: {
        fontFamily:'arial, helvetica, sans-serif',
        color: '#fff',
        fontSize: 20,
    },
});

export default styles;