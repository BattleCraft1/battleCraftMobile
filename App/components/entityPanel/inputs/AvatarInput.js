import React from 'react';
import EntityPanelInputsStyles from '../../../Styles/EntityPanelInputsStyles'
import {
    Image,
    View,
    TouchableHighlight
} from 'react-native';
import {serverName} from "../../../main/consts/serverName";
import Exponent, {ImagePicker} from 'expo';

import { ActionCreators } from '../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import axios from 'axios'

class AvatarInput extends React.Component{
    uploadImage = async() => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            base64:true,
            allowsEditing: false
        });

        this._handleImagePicked(pickerResult);
    };

    _handleImagePicked = async pickerResult => {
        let uploadResponse, uploadResult;

        try {
            this.props.startLoading("Uploading image...");
            if (!pickerResult.cancelled) {
                uploadResponse = await this.uploadImageAsync(pickerResult);
            }
        } catch (e) {
            console.log(e);
            this.props.showFailureMessage('Upload failed');
        } finally {
            this.props.stopLoading();
        }
    };

    async uploadImageAsync(pickerResult) {
        let file = pickerResult.base64;
        let uri = pickerResult.uri;
        let fileType = uri.substr(uri.lastIndexOf(".") + 1);
        if(file && (fileType === 'bmp' || fileType === 'gif' || fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png')){
            let formData = new FormData();
            formData.append('avatar',file);
            console.log(formData);
            await axios.post(serverName+`upload/user/avatar?username=`+ this.props.name,
                formData,
                {
                    headers: {
                        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                    }
                })
                .then(res => {
                    this.props.showSuccessMessage("Avatar successfully changed");
                })
                .catch(error => {
                    this.props.showNetworkErrorMessage(error);
                });
        }
        else{
            this.props.showFailureMessage("Extension: "+fileType+" is not acceptable extension as user avatar. You should try with jpg, gif, bmp or png");
        }
    }

    render(){
        return(
            <View style={EntityPanelInputsStyles.avatarContainerStyle}>
                <TouchableHighlight onPress={this.uploadImage}>
                    <Image
                        style={EntityPanelInputsStyles.avatarStyle}
                        source={{uri:serverName+`/get/user/avatar?username=${this.props.name}`}} />
                </TouchableHighlight>
            </View>
        )
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {};
}

export default connect( mapStateToProps, mapDispatchToProps )( AvatarInput );
