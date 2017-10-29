import * as types from '../types/possibleOperations'

export function setOperations(operations) {
    return {
        type: types.SET_OPERATIONS,
        operations: operations
    }
}