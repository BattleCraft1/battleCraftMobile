import React from 'react';
import EntityPanelInputsStyles from '../../../Styles/EntityPanelInputsStyles'
import {
    View,
    Image,
    TouchableHighlight
} from 'react-native';
import {serverName} from "../../../main/consts/serverName";
import Exponent, {ImagePicker} from 'expo';

import { ActionCreators } from '../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class AvatarInput extends React.Component{
    uploadImage = async() => {
        if(this.props.disabled)
            return;
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false
        });

        this._handleImagePicked(pickerResult);
    };

    _handleImagePicked = async pickerResult => {
        try {
            this.props.startLoading("Uploading image...");
            if (!pickerResult.cancelled) {
                await this.uploadImageAsync(pickerResult);
            }
        } catch (e) {
            console.log(e);
            this.props.showFailureMessage('Upload failed');
        } finally {
            this.props.stopLoading();
        }
    };

    async uploadImageAsync(pickerResult) {
        let uri = pickerResult.uri;
        let fileType = uri.substr(uri.lastIndexOf(".") + 1);

        if(fileType === 'bmp' || fileType === 'gif' || fileType === 'jpg' || fileType === 'png') {
            if(fileType === 'jpg')
                fileType = 'jpeg';
        }
        else{
            this.props.showFailureMessage("Extension: "+fileType+" is not acceptable extension as user avatar. You should try with jpg, gif, bmp or png");
            return;
        }

        let formData = new FormData();
        formData.append('avatar', { uri: uri, name: 'avatar.'+fileType,type: 'image/'+fileType });

        let url = serverName+`upload/user/avatar?username=`+ this.props.name;
        return await fetch(url, {
            method: 'POST',
            body: formData,
            header: {
                'content-type': 'multipart/form-data',
            },
        }).then(res => {
            console.log(res);
            if(res["status"]!==200){
                this.props.showFailureMessage('Upload failed');
            }
            else{
                this.props.showSuccessMessage("Avatar successfully changed");
            }
        }).catch(error => {
            this.props.showNetworkErrorMessage(error);
        });
    }


    render(){
        return(
            <View style={{alignItems:'center',justifyContent:'center'}}>
                <View style={EntityPanelInputsStyles.avatarContainerStyle}>
                    <TouchableHighlight onPress={this.uploadImage}>
                        <Image
                            style={EntityPanelInputsStyles.avatarStyle}
                            source={{uri:`${serverName}/get/user/avatar?username=${this.props.name}&${new Date().getTime()}`}} />
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        message: state.message
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( AvatarInput );
