import * as types from '../types/security'

export function setTokenAndRole(token,role) {
    return {
        type: types.SET_TOKEN_AND_ROLE,
        token: token,
        role: role
    }
}