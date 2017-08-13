import createReducer from '../lib/createReducer'
import * as types from '../types/messages'

export const message = createReducer( {}, {
    [types.SHOW_MESSAGE_BOX]( state, action ) {
        action.message.isShown=true;
        return action.message;
    },
    [types.SHOW_NETWORK_ERROR_MESSAGE_BOX]( state, action ) {
        let message;
        if(action.error===undefined || action.error.message==='Network Error'){
            message={
                isShown: true,
                messageText: "You can not connect to server!",
                messageType: "alert-danger"
            };
        }
        else
            message={
                isShown: true,
                messageText: action.error.response.data,
                messageType: "alert-danger"
            };
        return message;
    }
} );
