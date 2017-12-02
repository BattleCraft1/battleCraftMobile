import React, { Component } from 'react';
import CollectionPanel from '../collectionPanel/CollectionPanel'
import AccountPanel from '../account/AuthPanel'
import SplashScreen from '../commonComponents/SplashScreen'
import TournamentManagePanel from '../tournamentManage/TournamentManagePanel'

export default class Navigator extends Component {

    displayResultOfNavigation(){
        if(this.props.navigValue === 'Tournaments'){
            return <CollectionPanel collectionType={"tournaments"}/>;
        }
        else if(this.props.navigValue === 'Played'){
            return <CollectionPanel collectionType={"participated/tournaments"}/>;
        }
        else if(this.props.navigValue === 'Organized'){
            return <CollectionPanel collectionType={"organized/tournaments"}/>;
        }
        else if(this.props.navigValue === 'Games'){
            return <CollectionPanel collectionType={"games"}/>;
        }
        else if(this.props.navigValue === 'Ranking'){
            return <CollectionPanel collectionType={"ranking"}/>;
        }
        else if(this.props.navigValue === 'Users'){
            return <CollectionPanel collectionType={"users"}/>;
        }
        else if(this.props.navigValue === 'My account'){
            return <AccountPanel navigate={this.props.navigate}/>;
        }
        else if(this.props.navigValue.includes('Progress/')){
            let tournamentName = this.props.navigValue.substr(this.props.navigValue.indexOf('/')+1);
            if(tournamentName!==undefined)
                return <TournamentManagePanel navigate={this.props.navigate} tournamentName={tournamentName}/>;
            else
                return <SplashScreen/>
        }
        return <SplashScreen/>
    }

    render(){
        return(this.displayResultOfNavigation())
    }
}
