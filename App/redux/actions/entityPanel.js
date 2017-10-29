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

export function showEntityPanel(isShow) {
    return {
        type: types.SHOW_ENTITY_PANEL,
        isShow: isShow
    }
}

export function setRelatedEntity(relatedEntityNames,relatedEntityType,relatedEntityCriteria){
    return {
        type: types.SET_RELATED_ENTITY,
        relatedEntityNames: relatedEntityNames,
        relatedEntityType: relatedEntityType,
        relatedEntityCriteria: relatedEntityCriteria
    }
}