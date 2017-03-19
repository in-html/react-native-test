import React, { Component } from 'react';
import { Navigator, View, Text, Image, StyleSheet } from 'react-native';

import Home from './Home';
import TwoScreen from './TwoScreen';

export default class App extends Component {
    constructor() {
        super();
    }
    renderScene(route, navigator) {
        switch (route.name) {
            case 'home':
                return <Home {...route} navigator={navigator} store={this.props.store} />
            case 'twoScreen':
                return <TwoScreen {...route} navigator={navigator} />;
            default :
                return <Home {...route} navigator={navigator} />;
        }
    }
    render() {
        return (
            <Navigator
                initialRoute={{
                    name:'home'
                }}
                renderScene={this.renderScene.bind(this)}

                configureScene={(route, routeStack) =>
                    Navigator.SceneConfigs.HorizontalSwipeJump
                }
            />
        );
    }
}