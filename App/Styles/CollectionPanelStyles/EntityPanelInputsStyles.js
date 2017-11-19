import BaseColours from "../../main/consts/BaseColours"

const styles = {
    inputStyle: {
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor: BaseColours.background.lightBrown,
        paddingTop: 2,
        paddingBottom: 2
    },
    outputTextStyle: {
        marginTop: 2
    },
    avatarContainerStyle:{
        justifyContent:'center',
        alignItems:'center',
        borderTopColor: BaseColours.border.top,
        borderRightColor: BaseColours.border.right,
        borderBottomColor: BaseColours.border.bottom,
        borderLeftColor: BaseColours.border.left,
        backgroundColor:BaseColours.misc.deepRed,
        borderWidth:5,
        padding: 3,
        margin: 3,
        width:170,
        height:170
    },
    avatarStyle:{
        flex: 1,
        backgroundColor:BaseColours.background.lightBrown,
        resizeMode:'contain',
        width:155,
        height:155
    }
};

export default styles;