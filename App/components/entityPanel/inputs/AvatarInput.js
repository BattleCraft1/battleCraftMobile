import React from 'react';
import EntityPanelInputsStyles from '../../../Styles/EntityPanelInputsStyles'
import {
    Image,
    View
} from 'react-native';
import {serverName} from "../../../main/consts/serverName";

export default class NumberInput extends React.Component{
    render(){
        return(
            <View style={EntityPanelInputsStyles.avatarContainerStyle}>
                <Image
                    style={EntityPanelInputsStyles.avatarStyle}
                    source={{uri:serverName+`/get/user/avatar?username=${this.props.name}`}} />
            </View>
        )
    }
}
