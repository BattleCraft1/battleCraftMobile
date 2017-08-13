/**
 * Created by FBegiello on 06.08.2017.
 */

import {
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    table:{
        alignSelf: "stretch"
    },
    row:{
        backgroundColor:'#a58e60',
        borderColor:'#e3ca86',
        borderWidth: 2,
        borderTopWidth: 0,
    },
    sectionHeader:{
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor:'#4b371b',
        borderColor:'#e3ca86',
        borderWidth: 2,
        borderTopWidth: 0,
    },
    header:{
        flexDirection: 'row',
        justifyContent:'center',
        backgroundColor:'#4b371b',
        borderColor:'#e3ca86',
        borderWidth: 3,
        padding: 3,
    },
});


export default styles;