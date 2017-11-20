import * as types from '../types/pageRequest'

export function setPageRequest(pageRequest) {
    return {
        type: types.SET_PAGE_REQUEST,
        pageRequest: pageRequest
    }
}
