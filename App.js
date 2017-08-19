import React from 'react';
import {
    Text,
    View
} from 'react-native';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Font } from 'expo';
import reducer from './App/Redux/reducers/index'

import AppContent from './App/Main/App'

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

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            appReady: false,
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            'arial': require('./assets/Fonts/arial.ttf'),
            'FontAwesome': require('./assets/Fonts/FontAwesome.ttf')
        });
        this.setState({appReady:true});
    }

    render() {
        console.log("aaa");
        let app;
        if(this.state.appReady){
            app=<AppContent />
        }
        else
        {
            app=<View><Text>Application not ready yet!</Text></View>
        }
        return (
            <Provider store={ store }>
                {app}
            </Provider>
        );
    }
}