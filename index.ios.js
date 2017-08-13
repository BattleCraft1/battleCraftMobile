import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
} from 'react-native';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './App/Redux/reducers/index'
import App from './App/Main/App'

function configureStore( initialState ) {
    const enhancer = compose(
        applyMiddleware(
            thunkMiddleware,
        ),
    );
    return createStore( reducer, initialState, enhancer );
}

const store = configureStore( {
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
        messageType: ""
    },
    page: {
        content: []
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

export default class battleCraft extends Component {

    render() {
        return (
            <Provider store={ store }>
                <App/>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('battleCraft', () => battleCraft);
