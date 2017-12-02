'use strict';

import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../redux/actions';


import TournamentsRows from './rows/tournament/Rows'
import UsersRows from './rows/user/Rows'
import RankingRows from './rows/ranking/Rows'
import GamesRows from './rows/game/Rows'

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const rowTypeMap = {
    "tournaments":TournamentsRows,
    "participated/tournaments":TournamentsRows,
    "organized/tournaments":TournamentsRows,
    "games":GamesRows,
    "ranking":RankingRows,
    "users":UsersRows
};

class CollectionList extends Component {

    constructor(props) {
        super(props);
    }

    previousPage(event){
        console.log("previous page");
        let pageRequest=this.props.pageRequest;
        if(pageRequest.pageRequest.page-1>=0){
            pageRequest.pageRequest.page-=1;
            this.props.setPageRequest(pageRequest);
            this.props.getPage(this.props.collectionType);
        }
    }

    nextPage(event){
        console.log("next page");
        let pageRequest=this.props.pageRequest;
        if(pageRequest.pageRequest.page+1<this.props.page.totalPages){
            pageRequest.pageRequest.page+=1;
            this.props.setPageRequest(pageRequest);
            this.props.getPage(this.props.collectionType);
        }
    }

    render() {
        let rows = React.createElement(
            rowTypeMap[this.props.collectionType],
            {content:this.props.page.content},
            null);
        return(
            <GestureRecognizer
                style={{flex: 1}}
                onSwipeLeft={(event) => this.previousPage(event)}
                onSwipeRight={(event) => this.nextPage(event)}
                config={{
                    velocityThreshold: 0.1,
                    directionalOffsetThreshold: 30}}>
                {rows}
            </GestureRecognizer>

        );
    }

}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        page: state.page,
        pageRequest: state.pageRequest
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( CollectionList );