import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    TouchableOpacity
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

class TwoScreen extends Component {
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
    componentDidMount() {
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
                        <Timer timer={state.endTime} {...actions} isBtns={false} autostart />
                        <SideMenu navigator={this.props.navigator} />
                    </View>
                    <Button style={styles.button} onPress={() => this.toggle()}>
                        <Image
                            source={require('../../js/Images/menu.png')} style={{width: 128, height: 128}} />
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
)(TwoScreen);
const styles = StyleSheet.create({
    bg:{
        position: 'absolute',
        top: 0,
        left:0,
        resizeMode: 'contain'
    },
    row:{
        flexDirection: 'row'
    },
    btsContainer:{
    },
    bt:{
        backgroundColor:'#ffffff',
        marginHorizontal: 5,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    btDisable:{
        backgroundColor:'gray',
    },
    btText:{

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    button: {
        width: 52,
        height: 52,
        position: 'absolute',
        top: 20,
        padding: 10,
    },
    caption: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
    },
});