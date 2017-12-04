/**
 * Created by FBegiello on 03.12.2017.
 */

import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import Expo, {Audio} from 'expo';
import { connect } from 'react-redux';
import { ActionCreators } from '../../redux/actions/index';
import { bindActionCreators } from 'redux';

const soundToggle = new Expo.Audio.Sound();
const soundFlip = new Expo.Audio.Sound();
const soundFanfare = new Expo.Audio.Sound();

class SoundManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            soundNotLoaded: true
        };

    }

    async componentDidMount(){
        await this.loadSound();
    }

    componentWillReceiveProps(nextProps){
        this.play(nextProps.sound.name);
    }

    loadSound = async () => {
        if(this.state.soundNotLoaded)
        {
            await Expo.Audio.setIsEnabledAsync(true);

            try{
                await soundToggle.loadAsync(require('battleCraftMobile/sounds/buttonToggle.mp3'));
                this.setState({soundNotLoaded: false});
                console.log("Toggle sound loaded");
            }
            catch(error){
                console.log("Toggle sound not loaded");
                console.log(error);
            }

            try{
                await soundFlip.loadAsync(require('battleCraftMobile/sounds/pageFlip.mp3'));
                this.setState({soundNotLoaded: false});
                console.log("Flip sound loaded");
            }
            catch(error){
                console.log("Flip sound not loaded");
                console.log(error);
            }

            try{
                await soundFanfare.loadAsync(require('battleCraftMobile/sounds/fanfare.mp3'));
                this.setState({soundNotLoaded: false});
                console.log("Fanfare sound loaded");
            }
            catch(error){
                console.log("Fanfare sound not loaded");
                console.log(error);
            }
        }
    };

    play = async (name) =>{
        switch(name){
            case 'toggle':
                await soundToggle.setPositionAsync(0);
                await soundToggle.playAsync();
                break;
            case 'flip':
                await soundFlip.setPositionAsync(0);
                await soundFlip.playAsync();
                break;
            case 'fanfare':
                await soundFanfare.setPositionAsync(0);
                await soundFanfare.playAsync();
                break;
            default:
                console.log(name+" - No sound found");
                break;
        }
    }

    render() {
        return (<View/>);
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        sound: state.sound
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( SoundManager );