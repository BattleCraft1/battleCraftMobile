import { combineReducers } from 'redux'
import * as pageReducer from './page'
import * as pageRequestReducer from './pageRequest'
import * as confirmationReducer from './confirmation'
import * as messagesReducer from './messages'
import * as loadingReducer from './loading'
import * as entityPanelReducer from './entityPanel'
import * as possibleOperationsReducer from './possibleOperations'
import * as additionalEntityPanelReducer from './additionalEntityPanel'
import * as reportPanelReducer from './reportPanel'
import * as securityReducer from './security'
import * as orientationReducer from './dimension'

export default combineReducers( Object.assign(
    pageReducer,
    pageRequestReducer,
    confirmationReducer,
    messagesReducer,
    loadingReducer,
    entityPanelReducer,
    possibleOperationsReducer,
    additionalEntityPanelReducer,
    orientationReducer,
    securityReducer,
    reportPanelReducer
) );
