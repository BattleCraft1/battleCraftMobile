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
                relatedEntities: [],
                relatedEntityType:"",
                relatedEntityCriteria: "",
                relatedEntityLimit: 0,
                operationCanceled:false
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
                relatedEntities: [],
                relatedEntityType:"",
                relatedEntityCriteria: "",
                relatedEntityLimit: 0,
                operationCanceled:false
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
                relatedEntities: [],
                relatedEntityType:"",
                relatedEntityCriteria: "",
                relatedEntityLimit: 0,
                operationCanceled:false
            }
        };
    },
    [types.CLOSE_ENTITY_PANEL]( state, action ) {
        return {
            mode:entityPanelModes.disabled,
            entityType:entityPanelTypes.none,
            entityName:"",
            hidden:true,
            relatedEntity: {
                relatedEntities: [],
                relatedEntityType:"",
                relatedEntityCriteria: "",
                relatedEntityLimit: 0,
                operationCanceled:false
            }
        };
    },
    [types.SHOW_ENTITY_PANEL]( state, action ) {
        return {
            mode:state.mode,
            entityType:state.entityType,
            entityName:state.entityName,
            hidden:false,
            relatedEntity: {
                relatedEntities: state.relatedEntity.relatedEntities,
                relatedEntityType:state.relatedEntity.relatedEntityType,
                relatedEntityCriteria: state.relatedEntity.relatedEntityCriteria,
                relatedEntityLimit: state.relatedEntity.relatedEntityLimit,
                operationCanceled:false
            }
        };
    },
    [types.SET_RELATED_ENTITY]( state, action ) {
        console.log("debug0");
        return {
            mode:state.mode,
            entityType:state.entityType,
            entityName:state.entityName,
            hidden:true,
            relatedEntity:{
                relatedEntities:action.relatedEntities,
                relatedEntityType:action.relatedEntityType,
                relatedEntityCriteria: action.relatedEntityCriteria,
                relatedEntityLimit: action.relatedEntityLimit,
                operationCanceled:false
            }
        };
    },
    [types.CANCEL_ENTITY_PANEL_OPERATION]( state, action ) {
        return {
            mode:state.mode,
            entityType:state.entityType,
            entityName:state.entityName,
            hidden:false,
            relatedEntity:{
                relatedEntities:state.relatedEntity.relatedEntities,
                relatedEntityType:state.relatedEntity.relatedEntityType,
                relatedEntityCriteria: state.relatedEntity.relatedEntityCriteria,
                relatedEntityLimit: state.relatedEntity.relatedEntityLimit,
                operationCanceled:true
            }
        };
    },
    [types.CHANGE_RELATED_ENTITIES]( state, action ) {
        return {
            mode:state.mode,
            entityType:state.entityType,
            entityName:state.entityName,
            hidden:state.hidden,
            relatedEntity:{
                relatedEntities:action.relatedEntities,
                relatedEntityType:state.relatedEntity.relatedEntityType,
                relatedEntityCriteria: state.relatedEntity.relatedEntityCriteria,
                relatedEntityLimit: state.relatedEntity.relatedEntityLimit,
                operationCanceled:false
            }
        };
    }
} );
