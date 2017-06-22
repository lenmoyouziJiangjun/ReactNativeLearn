/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
} from 'react-native';

export default class ReactNativeLearn extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputTypeStyle}
                           multiline={false}
                           placeholder={"我是占位文字"}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },

    /**
     * 输入框 常用属性
     */
    inputTypeStyle: {
        //keyboardType: "", /*键盘样式*/
        width:300,
        height:100,
        //设置边框
        borderWidth:2,
        borderColor:"#e8e8e8",
        alignSelf:"center",

    }

});

AppRegistry.registerComponent('ReactNativeLearn', () => ReactNativeLearn);
