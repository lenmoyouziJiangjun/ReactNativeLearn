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
    Image,
} from 'react-native';

//引入外部js文件
var ScrollViewLearn = require("./learnjs/ScrollViewLearn");
var ListViewDemo = require("./learnjs/ListViewDemo")
var ListViewDemo2 = require("./learnjs/ListViewDemo2")
var ListViewDemo3 = require("./learnjs/ListViewDemo3")
var TabBarDemo = require("./learnjs/TabBarLean")

var Main = require("./Component/Main")

export default class ReactNativeLearn extends Component {
    /**
     * 创建View组件,刷新界面控件
     * @returns {XML}
     */
    render() {
        return (
            //使用引入的js类
            // < ScrollViewLearn />
            <Main />
            // <Image source={{uri:'https://img1.cache.netease.com/3g/2016/5/16/20160516150721719f3.jpg'}} style={{width:200,height:200,backgroundColor:'#ff0000'}}></Image>
        );
    }
}


AppRegistry.registerComponent('ReactNativeLearn', () => ReactNativeLearn);
