/**
 * Created by FBegiello on 17.07.2017.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import Drawer from 'react-native-drawer'

export default class ListScreen extends Component {

    constructor(props) {
        super(props)
        this.closeControlPanel = this.closeControlPanel.bind(this);
    }

    closeControlPanel = () => {
        this._drawer.close()
    };
    openControlPanel = () => {
        this._drawer.open()
    };

    render() {

        return (
        <Drawer
            ref={(ref) => this._drawer = ref}
            type="overlay"
            tapToClose={true}
            openDrawerOffset={0.3}
            panCloseMask={0.2}
            styles={drawerStyles}
            closedDrawerOffset={0}
            tweenHandler={(ratio) => ({main: { opacity:(2-ratio)/2 }})}

            content={<DrawerContent onClosePanel={this.closeControlPanel}/>}
        >
            <View style={[styles.contentStyle]}>
                <View>
                    <Text style={styles.smallWhiteStyle}>List {this.props.listType}</Text>
                </View>
                <Button title="Open" color='#4b371b' onPress={this.openControlPanel}/>
            </View>
        </Drawer>
        );
    }
}

class DrawerContent extends Component {

    constructor() {
        super()
    }

    render() {
        return (
            <View style={[styles.contentStyle]}>
                <View>
                    <Text style={[styles.textStyle, {fontSize: 26,}]}>Drawer</Text>
                </View>
                <View>
                    <Text style={styles.smallWhiteStyle}>List of filters here</Text>
                </View>

                <Button title="Close" color='#4b371b' onPress={this.props.onClosePanel}/>
            </View>
        );
    }
}

const drawerStyles = {
    drawer: {
        backgroundColor: '#805D2C',
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 3
    },
    main: {
        paddingLeft: 3
    },
}

const styles = StyleSheet.create({
    textStyle:{
        fontFamily:'arial, helvetica, sans-serif',
        textShadowColor: '#000000',
        textShadowOffset: {width: -1, height: -1},
        color: '#fff',
    },
    borderStyle:{
        borderTopColor: '#e3ca86',
        borderRightColor: '#4b371b',
        borderBottomColor: '#E0BA51',
        borderLeftColor: '#ecdbac',
    },
    contentStyle: {
        flex: 0.9,
        padding: 5,
        marginTop: 1,
        justifyContent: 'center',
        borderColor: '#4b371b',
        borderWidth: 5,
        backgroundColor: '#805D2C',
    },
    bigWhiteStyle: {
        fontFamily:'arial, helvetica, sans-serif',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 26,
    },
    smallWhiteStyle: {
        fontFamily:'arial, helvetica, sans-serif',
        color: '#fff',
        fontSize: 20,
    },
    icon: {
        width: 24,
        height: 24,
    },
});

module.export = ListScreen;
