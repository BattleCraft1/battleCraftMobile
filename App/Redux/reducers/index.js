import { combineReducers } from 'redux'
import * as pageReducer from './page'
import * as pageRequestReducer from './pageRequest'
import * as confirmationReducer from './confirmation'
import * as messagesReducer from './messages'

export default combineReducers( Object.assign(
    pageReducer,
    pageRequestReducer,
    confirmationReducer,
    messagesReducer
) );
