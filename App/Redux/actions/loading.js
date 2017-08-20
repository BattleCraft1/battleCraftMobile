import * as types from '../types/loading'

export function startLoading(message) {
    return {
        type: types.START_LOADING,
        message: message
    }
}

export function stopLoading() {
    return {
        type: types.STOP_LOADING
    }
}
