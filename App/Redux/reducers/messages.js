import createReducer from '../lib/createReducer'
import * as types from '../types/messages'

export const message = createReducer( {}, {
    [types.SHOW_SUCCESS_MESSAGE_BOX]( state, action ) {
        action.message.isShown=true;
        action.message.messageType="Success";
        return action.message;
    },
    [types.SHOW_FAIL_MESSAGE_BOX]( state, action ) {
        action.message.isShown=true;
        action.message.messageType="Fail";
        return action.message;
    },
    [types.SHOW_ERROR_MESSAGE_BOX]( state, action ) {
        let message;
        if(action.error===undefined || action.error.message==='Network request failed'){
            message={
                isShown: true,
                messageText: "You can not connect to server!",
                messageType: "Network error"
            };
        }
        else
            message={
                isShown: true,
                messageText: action.error.response.data,
                messageType: "Fail"
            };
        return message;
    }
} );
