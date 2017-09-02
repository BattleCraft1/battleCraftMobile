import createReducer from '../lib/createReducer'
import * as types from '../types/message'

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
        if(action.error===undefined || action.error.message==='Network Error'){
            message={
                isShown: true,
                messageText: "You can not connect to server!",
                messageType: "Network error",
                failedOperation: action.failedOperation
            };
        }
        else if(action.error.message.indexOf('Request failed with status code ') !== -1 && action.error.response.data!==undefined)
        {
            message={
                isShown: true,
                messageText: action.error.response.data,
                messageType: "Fail"
            };
        }
        else{
            message={
                isShown: true,
                messageText: "There are not recognized problems on the server side. Please contact with administrator.",
                messageType: "Fail"
            };
        }

        return message;
    }
} );
