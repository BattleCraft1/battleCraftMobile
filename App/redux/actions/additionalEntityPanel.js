import * as types from '../types/additionalEntityPanel'

export function showAdditionalEntityPanel(additionalEntityType,additionalEntityName) {
    return {
        type: types.SHOW_ADDITIONAL_ENTITY_PANEL,
        additionalEntityType: additionalEntityType,
        additionalEntityName: additionalEntityName
    }
}

export function disableAdditionalEntityPanel() {
    return {
        type: types.DISABLE_ADDITIONAL_ENTITY_PANEL,
    }
}