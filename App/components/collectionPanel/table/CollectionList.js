import React, { Component } from 'react';
import {
    View
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../redux/actions';

import GestureRecognizer from 'react-native-swipe-gestures';

import TournamentsRows from './rows/tournament/Rows'
import UsersRows from './rows/user/Rows'
import RankingRows from './rows/ranking/Rows'
import GamesRows from './rows/game/Rows'


const rowTypeMap = {
    "tournaments":TournamentsRows,
    "games":GamesRows,
    "ranking":RankingRows,
    "users":UsersRows
};

class CollectionList extends Component {

    constructor(props) {
        super(props);
    }

    previousPage(event){
        let pageRequest=this.props.pageRequest;
        if(pageRequest.pageRequest.page-1>=0){
            pageRequest.pageRequest.page-=1;
            this.props.setPageRequest(pageRequest);
            this.props.getPage(this.props.collectionType);
        }
    }

    nextPage(event){
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
            <View style={{flex:1}}>
                <GestureRecognizer
                    onSwipeLeft={(event) => this.previousPage(event)}
                    onSwipeRight={(event) => this.nextPage(event)}
                    config={{
                        velocityThreshold: 0.1,
                        directionalOffsetThreshold: 30}}>
                    {rows}
                </GestureRecognizer>
            </View>
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