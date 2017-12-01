import React from 'react';
import {Dimensions} from 'react-native';
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
    dimension:{
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
        orientation: Dimensions.get('screen').height >= Dimensions.get('screen').width?'portrait':'landscape'
    },
    possibleOperations:[],
    entityPanel: {
        mode:entityPanelModes.disabled,
        entityType:entityPanelTypes.none,
        entityName:"",
        hidden:true,
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
    security:{
        token:"",
        role:""
    }
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
