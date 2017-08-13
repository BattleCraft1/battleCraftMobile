import * as types from '../types/confirmation'

export function showConfirmationDialog(confirmation) {
    return {
        type: types.SHOW_CONFIRMATION_DIALOG,
        confirmation: confirmation
    }
}
