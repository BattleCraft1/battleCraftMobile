import BaseColours from "../main/consts/BaseColours"

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
        borderWidth:4,
        width:85,
        height:85
    },
    avatarStyle:{
        backgroundColor:BaseColours.misc.deepRed,
        flex: 1,
        resizeMode:'contain',
        width:79,
        height:81
    }
};

export default styles;