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

//引入外部js文件
var ScrollViewLearn = require("./learnjs/ScrollViewLearn");
var ListViewDemo = require("./ListViewDemo")

export default class ReactNativeLearn extends Component {
    /**
     * 创建View组件,刷新界面控件
     * @returns {XML}
     */
    render() {
        return (
            //使用引入的js类
            // < ScrollViewLearn />
            <ListViewDemo />
        );
    }
}


AppRegistry.registerComponent('ReactNativeLearn', () => ReactNativeLearn);
