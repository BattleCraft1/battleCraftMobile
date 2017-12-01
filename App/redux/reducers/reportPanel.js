import createReducer from '../lib/createReducer'
import * as types from '../types/reportPanel'

export const reportPanel = createReducer( {}, {
    [types.SHOW_REPORT_PANEL]( state, action ) {
        return {
            isShown: action.isShown,
            objectType: action.objectType,
            objectNames: action.objectNames
        };
    }
} );