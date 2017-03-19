import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Dimensions,
    ScrollView
} from 'react-native';

const window = Dimensions.get('window');

module.exports = class Menu extends Component {
    static propTypes = {
        onItemSelected: React.PropTypes.func.isRequired,
    };
    render() {
        return (
            <ScrollView scrollsToTop={false} style={styles.menu}>
                <TouchableHighlight
                    onPress={() => {
                        this.props.onItemSelected('Home');
                        this.props.navigator.pop();
                    }}
                    underlayColor="gray"
                    style={styles.item}
                >
                    <Text style={styles.item_text}>Home</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={()=>{
                        this.props.onItemSelected('twoScreen');
                        this.props.navigator.push({name: 'twoScreen'})
                    }}
                    style={styles.item}
                    underlayColor="gray"
                >
                    <Text style={styles.item_text}>Second screen</Text>
                </TouchableHighlight>
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        width: window.width,
        height: window.height,
        backgroundColor: '#f1f1f1',
        paddingRight: 10,
        paddingVertical: 10,
    },
    item:{
        backgroundColor: '#f1f1f1',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        paddingVertical: 10,
        paddingLeft: 10,
    },
    item_text:{
        fontSize: 20,
        color: 'black'
    }
});