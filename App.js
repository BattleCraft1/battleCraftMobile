import React from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './App/redux/reducers/index'

import {entityPanelModes} from './App/main/consts/entityPanelModes'
import {entityPanelTypes} from './App/main/consts/entityPanelTypes'

import AppContent from './App/main/AppContent'

function configureStore( initialState ) {
    const enhancer = compose(
        applyMiddleware(
            thunkMiddleware,
        ),
    );
    return createStore( reducer, initialState, enhancer );
}

const store = configureStore( {
    loading:{
        dataFetched:false,
        message:""
    },
    possibleOperations:[],
    entityPanel: {
        mode:entityPanelModes.disabled,
        entityType:entityPanelTypes.none,
        entityName:"",
        hidden:false,
        relatedEntity:{
            relatedEntityNames:[],
            relatedEntityType:"",
            relatedEntityCriteria:[]
        }
    },
    additionalEntityPanel:{
        additionalEntityType:entityPanelTypes.none,
        additionalEntityName:""
    },
    confirmation: {
        header:"",
        message:"",
        onConfirmFunction: function () {
        },
        isShown: false
    },
    message:{
        isShown: false,
        messageText: "",
        messageType: "",
        failedOperation: function () {
        }
    },
    page: {
        content: [],
        checkedElementsNames: []
    },
    pageRequest: {pageRequest:{
        size:10,
        page:0,
        direction: "ASC",
        property: "name"
    },
        searchCriteria:[
        ]
    },
} );

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={ store }>
                <AppContent/>
            </Provider>
        );
    }
}
