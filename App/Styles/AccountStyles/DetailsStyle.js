/**
 * Created by FBegiello on 23.11.2017.
 */
import BaseColours from "../../main/consts/BaseColours"

const styles = {

    header:{
        backgroundColor: BaseColours.misc.deepRed,
        padding:3,
        borderWidth:5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:5,
    },

    avatarContainer:{
        width:200,
        height:200,
        borderWidth:5,
        padding:10,
        borderColor:BaseColours.border.top,
        backgroundColor:BaseColours.misc.deepRed,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'center',
    },
    innerContainer:{
        borderWidth:5,
        borderColor:BaseColours.border.top,
        backgroundColor:BaseColours.background.lightBrown,
    },
    avatar:{
        width:150,
        height:150,
        resizeMode:'contain'
    },
    buttonsCard:{
        alignSelf:'center',
        borderWidth:5,
        borderColor:BaseColours.border.top,
        backgroundColor:BaseColours.background.lightBrown,
        flex:1,
        marginTop:10,
    },
    buttonWrapper:{
        margin:5,
    },
    button:{
        backgroundColor: BaseColours.background.darkBrown,
        borderWidth:3,
        alignItems: 'center',
        justifyContent: 'center',
        padding:3,
    },
    buttonLogout:{
        margin:10,
        backgroundColor: BaseColours.background.darkBrown,
        alignItems: 'center',
        justifyContent: 'center',
        padding:3,
    }

};

export default styles;