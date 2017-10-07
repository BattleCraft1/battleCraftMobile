import React, { Component } from 'react';
import CollectionPanel from '../CollectionPanel/CollectionPanel'
import AccountPanel from '../Account/AccountPanel'
import SplashScreen from '../Common/SplashScreen'

export default class Navigator extends Component {

    displayResultOfNavigation(){
        switch(this.props.navigValue){
            case 'Tournaments':
                return <CollectionPanel collectionType={"tournaments"}/>;
                break;
            case 'Games':
                return <CollectionPanel collectionType={"games"}/>;
                break;
            case 'Rankings':
                return <CollectionPanel collectionType={"ranking"}/>;
                break;
            case 'Users':
                return <CollectionPanel collectionType={"users"}/>;
                break;
            case 'My account':
                return <AccountPanel/>;
                break;
            default:
                return <SplashScreen/>;
        }
    }

    render(){
        return(this.displayResultOfNavigation())
    }
}