import createReducer from '../lib/createReducer'
import * as types from '../types/page'

export const page = createReducer( {}, {
    [types.CHECK_PREVIOUSLY_CHECKED_ELEMENTS]( state, action ) {
        action.page.checkedElementsNames = state.checkedElementsNames;
        action.page.content.forEach((element) =>{
                element.checked = state.checkedElementsNames.indexOf(element.name) !== -1;
            }
        );
        return action.page;
    },
    [types.SET_EMPTY_PAGE]( state, action ) {
        return {
            checkedElementsNames:[],
            numberOfElements:0,
            content:[],
            totalElements:0,
            size:0,
            totalPages:0
        };
    },
    [types.SET_ELEMENTS_TO_CHECK]( state, action ) {
        state.checkedElementsNames = action.elementsNames;
        return Object.create(state);
    },
    [types.CHECK_ALL_ELEMENTS]( state, action ){
        let elementToCheckNames = state.content
            .map(element => {
                element.checked=action.checked;
                return element.name;
            });
        actualizeCheckedElementsList(state.checkedElementsNames,action.checked,elementToCheckNames);
        return Object.create(state);
    },
    [types.CHECK_ELEMENTS]( state, action ){
        let elementToCheckNames=state.content
            .filter(element => action.elementsNames.indexOf(element.name)!==-1)
            .map(element => {
                element.checked=action.checked;
                return element.name;
            });
        actualizeCheckedElementsList(state.checkedElementsNames,action.checked,elementToCheckNames);
        return Object.create(state);
    },
    [types.CHECK_ELEMENT]( state, action ){
        let elementToCheck=state.content.find(element => element.name===action.elementName);
        elementToCheck.checked=action.checked;
        actualizeCheckedElementsList(state.checkedElementsNames,action.checked,[elementToCheck.name]);
        return Object.create(state);
    },
    [types.CLEAR_CHECKED_ELEMENTS]( state, action ){
        state.checkedElementsNames = [];
        state.content.forEach((element) =>{
                element.checked = false;
            }
        );
        return Object.create(state);
    }
} );

function actualizeCheckedElementsList(checkedElementsNames,checked,elementsToCheckNames){
    elementsToCheckNames.forEach(
        elementToCheckName => {
            if(checked){
                if(checkedElementsNames.indexOf(elementToCheckName)===-1){
                    checkedElementsNames.push(elementToCheckName)
                }
            }
            else{
                if(checkedElementsNames.indexOf(elementToCheckName)!==-1){
                    checkedElementsNames.splice(checkedElementsNames.indexOf(elementToCheckName),1)
                }
            }
        }
    )
}