/**
 * Created by FBegiello on 03.12.2017.
 */

import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import Expo, { Audio,} from 'expo';
import { connect } from 'react-redux';
import { ActionCreators } from '../../redux/actions/index';
import { bindActionCreators } from 'redux';

const soundToggle = new Expo.Audio.Sound();
const soundFanfare = new Expo.Audio.Sound();

class SoundManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            soundNotLoaded: true
        };

        this.loadSound();
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

    componentWillReceiveProps(nextProps){
        this.play(nextProps.playSound.name)
    }

    play = async (name) =>{
        switch(name){
            case 'toggle':
                await soundToggle.setPositionAsync(0);
                await soundToggle.playAsync();
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
        playSound: state.playSound
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( SoundManager );