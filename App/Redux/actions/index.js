import * as PageActions from './page'
import * as PageRequestActions from './pageRequest'
import * as ConfirmationActions from './confirmation'
import * as MessagesActions from './message'
import * as LoadingActions from './loading'

export const ActionCreators = Object.assign( {},
    PageActions,
    PageRequestActions,
    ConfirmationActions,
    MessagesActions,
    LoadingActions
);
