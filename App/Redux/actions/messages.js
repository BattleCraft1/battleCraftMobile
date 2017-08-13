import * as types from '../types/messages'

export function showMessageBox(message) {
    return {
        type: types.SHOW_MESSAGE_BOX,
        message: message
    }
}

export function showNetworkErrorMessageBox(error) {
    return {
        type: types.SHOW_NETWORK_ERROR_MESSAGE_BOX,
        error: error
    }
}
