import * as AdditionalEntityPanelActions from './additionalEntityPanel'
import * as ConfirmationActions from './confirmation'
import * as EntityPanel from './entityPanel'
import * as LoadingActions from './loading'
import * as MessagesActions from './messages'
import * as PageActions from './page'
import * as PageRequestActions from './pageRequest'
import * as PossibleOperationsActions from './possibleOperations'
import * as DimensionActions from './dimension'

export const ActionCreators = Object.assign( {},
    AdditionalEntityPanelActions,
    EntityPanel,
    PageActions,
    PossibleOperationsActions,
    PageRequestActions,
    ConfirmationActions,
    MessagesActions,
    LoadingActions,
    DimensionActions
);