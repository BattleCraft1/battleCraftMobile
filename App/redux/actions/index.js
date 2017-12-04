import * as AdditionalEntityPanelActions from './additionalEntityPanel'
import * as ConfirmationActions from './confirmation'
import * as EntityPanel from './entityPanel'
import * as LoadingActions from './loading'
import * as MessagesActions from './messages'
import * as PageActions from './page'
import * as PageRequestActions from './pageRequest'
import * as SecurityActions from './security'
import * as PossibleOperationsActions from './possibleOperations'
import * as DimensionActions from './dimension'
import * as SoundAction from './sound'
import * as ReportPanelActions from './reportPanel'

export const ActionCreators = Object.assign( {},
    AdditionalEntityPanelActions,
    EntityPanel,
    PageActions,
    PossibleOperationsActions,
    PageRequestActions,
    ConfirmationActions,
    MessagesActions,
    LoadingActions,
    DimensionActions,
    SecurityActions,
    SoundAction,
    ReportPanelActions
);
