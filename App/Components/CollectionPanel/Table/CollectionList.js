import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../Redux/actions';

import GestureRecognizer from 'react-native-swipe-gestures';

import TournamentsRows from './Rows/Tournament/Rows'
import UsersRows from './Rows/User/Rows'
import RankingRows from './Rows/Ranking/Rows'
import GamesRows from './Rows/Game/Rows'

class CollectionList extends Component {

    constructor(props) {
        super(props);
    }

    previousPage(event){
        let pageRequest=this.props.pageRequest;
        if(pageRequest.pageRequest.page-1>=0){
            pageRequest.pageRequest.page-=1;
            this.props.setPageRequest(pageRequest);
            this.props.getPage();
        }
    }

    nextPage(event){
        let pageRequest=this.props.pageRequest;
        if(pageRequest.pageRequest.page+1<this.props.page.totalPages){
            pageRequest.pageRequest.page+=1;
            this.props.setPageRequest(pageRequest);
            this.props.getPage();
        }
    }

    prepareRowsOfTable(){
        let rows;

        switch(this.props.collectionType){
            case 'tournaments':
                return <TournamentsRows content={this.props.page.content}/>;
                break;
            case 'users':
                return <UsersRows content={this.props.page.content}/>;
                break;
            case 'games':
                return <GamesRows content={this.props.page.content}/>;
                break;
            case 'ranking':
                return <RankingRows content={this.props.page.content}/>;
                break;
        }
    }

    render() {
        let rows = this.prepareRowsOfTable();
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