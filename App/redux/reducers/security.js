import createReducer from '../lib/createReducer'
import * as types from '../types/security'

export const security = createReducer( {}, {
    [types.SET_TOKEN_AND_ROLE]( state, action ) {
        return {
            token: action.token,
            role: action.role
        };
    }
} );