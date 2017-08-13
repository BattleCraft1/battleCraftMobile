import * as types from '../types/page'

export function setPage(page) {
    return {
        type: types.SET_PAGE,
        page: page
    }
}
export function checkAllElements(checked) {
    return {
        type: types.CHECK_ALL_ELEMENTS,
        checked: checked
    }
}
export function checkElement(name,checked) {
    return {
        type: types.CHECK_ELEMENT,
        checked: checked,
        name: name
    }
}