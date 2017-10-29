import * as types from '../types/page'

export function checkPreviouslyCheckedElements(page) {
    return {
        type: types.CHECK_PREVIOUSLY_CHECKED_ELEMENTS,
        page: page
    }
}
export function setEmptyPage() {
    return {
        type: types.SET_EMPTY_PAGE
    }
}
export function checkAllElements(checked) {
    return {
        type: types.CHECK_ALL_ELEMENTS,
        checked: checked
    }
}
export function checkElements(elementsNames,checked) {
    return {
        type: types.CHECK_ELEMENTS,
        checked: checked,
        elementsNames: elementsNames
    }
}
export function checkElement(elementName,checked) {
    return {
        type: types.CHECK_ELEMENT,
        checked: checked,
        elementName: elementName
    }
}
export function clearCheckedElements() {
    return {
        type: types.CLEAR_CHECKED_ELEMENTS
    }
}