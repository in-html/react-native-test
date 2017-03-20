import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    Navigator,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Platform
} from 'react-native';
import Timer from '../components/Timer/Timer';
import SideMenu from 'react-native-side-menu';
const Menu = require('../components/Menu/Menu');

import {bindActionCreators} from 'redux';
import * as timerActions from '../actions/timerActions';
import { connect } from 'react-redux';

class Button extends Component {
    handlePress(e) {
        if (this.props.onPress) {
            this.props.onPress(e);
        }
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.handlePress.bind(this)}
                style={this.props.style}>
                <Text>{this.props.children}</Text>
            </TouchableOpacity>
        );
    }
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            selectedItem: 'Home',
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
    updateMenuState(isOpen) {
        this.setState({ isOpen, });
    }

    onMenuItemSelected = (item) => {
        this.setState({
            isOpen: false,
            selectedItem: item,
        });
    }
    render() {
        const menu = <Menu
            onItemSelected={this.onMenuItemSelected}
            navigator={this.props.navigator}
        />;
        const { state, actions } = this.props;
        return (
            <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                onChange={(isOpen) => this.updateMenuState(isOpen)}>
                    <View style={styles.container}>
                        <Image source={require('../../js/Images/bg.jpg')} style={styles.bg} />
                        <Timer timer={state.endTime} {...actions} down />
                    </View>
                    <Button style={styles.button} onPress={() => this.toggle()}>
                        <Image
                            source={require('../../js/Images/menu.png')} style={styles.btImage} />
                    </Button>
            </SideMenu>
        );
    }
}
export default connect(state => ({
        state: state.timer
    }),
    (dispatch) => ({
        actions: bindActionCreators(timerActions, dispatch)
    })
)(Home);
const styles = StyleSheet.create({
    row:{
        flexDirection: 'row'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    bg:{
        position: 'absolute',
        top: (Platform.OS === 'ios') ? 20 : 0,
        left:0,
        flex: 1,
        resizeMode: 'cover'
    },
    button: {
        width: 52,
        height: 52,
        position: 'absolute',
        top: 20,
        padding: 10,
    },
    btImage:{
      width: (Platform.OS === 'ios') ? 52 : 128,
      height: (Platform.OS === 'ios') ? 52 : 128
    },
    caption: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
    }, 
});
