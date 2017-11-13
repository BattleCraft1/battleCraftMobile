import * as types from '../types/entityPanel'

export function editEntity(entityType,entityName) {
    return {
        type: types.EDIT_ENTITY,
        entityType: entityType,
        entityName: entityName
    }
}

export function addEntity(entityType) {
    return {
        type: types.ADD_ENTITY,
        entityType: entityType
    }
}

export function getEntity(entityType,entityName) {
    return {
        type: types.GET_ENTITY,
        entityType: entityType,
        entityName: entityName
    }
}

export function closeEntityPanel() {
    return {
        type: types.CLOSE_ENTITY_PANEL
    }
}

export function showEntityPanel() {
    return {
        type: types.SHOW_ENTITY_PANEL
    }
}

export function setRelatedEntity(relatedEntities,relatedEntityType,relatedEntityCriteria,relatedEntityLimit){
    return {
        type: types.SET_RELATED_ENTITY,
        relatedEntities: relatedEntities,
        relatedEntityType: relatedEntityType,
        relatedEntityCriteria: relatedEntityCriteria,
        relatedEntityLimit: relatedEntityLimit
    }
}

export function cancelEntityPanelOperation() {
    return {
        type: types.CANCEL_ENTITY_PANEL_OPERATION
    }
}

export function changeRelatedEntities(relatedEntities) {
    return {
        type: types.CHANGE_RELATED_ENTITIES,
        relatedEntities: relatedEntities
    }
}