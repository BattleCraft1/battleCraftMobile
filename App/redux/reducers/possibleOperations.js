import createReducer from '../lib/createReducer'
import * as types from '../types/possibleOperations'

export const possibleOperations = createReducer( {}, {
    [types.SET_OPERATIONS]( state, action ) {

        let newState = action.operations;

        return newState;
    }
} );