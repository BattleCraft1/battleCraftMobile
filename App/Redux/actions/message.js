import * as types from '../types/message'

export function showSuccessMessageBox(message) {
    return {
        type: types.SHOW_SUCCESS_MESSAGE_BOX,
        message: message
    }
}

export function showFailMessageBox(message) {
    return {
        type: types.SHOW_FAIL_MESSAGE_BOX,
        message: message
    }
}

export function showErrorMessageBox(error, failedOperation) {
    return {
        type: types.SHOW_ERROR_MESSAGE_BOX,
        error: error,
        failedOperation: failedOperation
    }
}
