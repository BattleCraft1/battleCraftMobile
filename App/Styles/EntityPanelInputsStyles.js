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
        margin:2
    },
    avatarStyle:{
        borderWidth:3,
        borderColor: BaseColours.background.lightBrown,
        width:80,
        height:80
    }
};

export default styles;