/**
 * Created by FBegiello on 03.12.2017.
 */
import createReducer from '../lib/createReducer'
import * as types from '../types/playSound'

export const playSound = createReducer( {}, {
    [types.PLAY_SOUND]( state, action ) {
        return {
            name: action.name,
        }
    }
} );
