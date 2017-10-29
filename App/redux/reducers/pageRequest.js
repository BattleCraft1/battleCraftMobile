import createReducer from '../lib/createReducer'
import * as types from '../types/pageRequest'

export const pageRequest = createReducer( {}, {
    [types.SET_PAGE_REQUEST]( state, action ) {

        let newState = action.pageRequest;

        return newState;
    }
} );
