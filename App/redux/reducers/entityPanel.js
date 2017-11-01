import createReducer from '../lib/createReducer'
import * as types from '../types/entityPanel'
import {entityPanelModes} from '../../main/consts/entityPanelModes'
import {entityPanelTypes} from '../../main/consts/entityPanelTypes'

export const entityPanel = createReducer( {}, {
    [types.ADD_ENTITY]( state, action ) {
        return {
            mode:entityPanelModes.add,
            entityType:action.entityType,
            entityName:"",
            hidden:false,
            relatedEntity: {
                relatedEntityNames: [],
                relatedEntityType:"",
                relatedEntityCriteria: ""
            }
        };
    },
    [types.EDIT_ENTITY]( state, action ) {
        return {
            mode:entityPanelModes.edit,
            entityType:action.entityType,
            entityName:action.entityName,
            hidden:false,
            relatedEntity: {
                relatedEntityNames: [],
                relatedEntityType:"",
                relatedEntityCriteria: ""
            }
        };
    },
    [types.GET_ENTITY]( state, action ) {
        return {
            mode:entityPanelModes.get,
            entityType:action.entityType,
            entityName:action.entityName,
            hidden:false,
            relatedEntity: {
                relatedEntityNames: [],
                relatedEntityType:"",
                relatedEntityCriteria: ""
            }
        };
    },
    [types.CLOSE_ENTITY_PANEL]( state, action ) {
        return {
            mode:entityPanelModes.disabled,
            entityType:entityPanelTypes.none,
            entityName:"",
            hidden:false,
            relatedEntity: {
                relatedEntityNames: [],
                relatedEntityType:"",
                relatedEntityCriteria: ""
            }
        };
    },
    [types.SHOW_ENTITY_PANEL]( state, action ) {
        return {
            mode:state.mode,
            entityType:state.entityType,
            entityName:state.entityName,
            hidden:!action.isShow,
            relatedEntity: {
                relatedEntityNames: state.relatedEntity.relatedEntityNames,
                relatedEntityType:state.relatedEntity.relatedEntityType,
                relatedEntityCriteria: state.relatedEntity.relatedEntityCriteria
            }
        };
    },
    [types.SET_RELATED_ENTITY]( state, action ) {
        return {
            mode:state.mode,
            entityType:state.entityType,
            entityName:state.entityName,
            hidden:state.hidden,
            relatedEntity:{
                relatedEntityNames:action.relatedEntityNames,
                relatedEntityType:action.relatedEntityType,
                relatedEntityCriteria: action.relatedEntityCriteria
            }
        };
    }
} );
