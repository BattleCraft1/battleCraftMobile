import createReducer from '../lib/createReducer'
import * as types from '../types/confirmation'

export const confirmation = createReducer( {}, {
    [types.SHOW_CONFIRMATION_DIALOG]( state, action ) {
        action.confirmation.isShown=true;
        let newState = action.confirmation;
        return newState;
    }
} );

