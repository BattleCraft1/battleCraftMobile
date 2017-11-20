import * as types from '../types/messages'

export function showFailureMessage(message) {
    return {
        type: types.SHOW_FAILURE_MESSAGE_BOX,
        message: message
    }
}

export function showSuccessMessage(message) {
    return {
        type: types.SHOW_SUCCESS_MESSAGE_BOX,
        message: message
    }
}

export function showNetworkErrorMessage(error, failedOperation) {
    return {
        type: types.SHOW_NETWORK_ERROR_MESSAGE_BOX,
        error: error,
        failedOperation: failedOperation
    }
}

export function hideMessageBox() {
    return {
        type: types.HIDE_MESSAGE_BOX
    }
}
