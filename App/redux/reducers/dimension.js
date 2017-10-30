import createReducer from '../lib/createReducer'
import * as types from '../types/dimension'

export const dimension = createReducer( {}, {
    [types.CHANGE_DIMENSION]( state, action ) {
        return {
            height: action.height,
            width: action.width,
            orientation: action.orientation
        }
    }
} );
