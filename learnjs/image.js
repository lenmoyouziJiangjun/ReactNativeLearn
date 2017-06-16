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
    Image
} from 'react-native';

/**
 * Image学习js
 */


/**
 * 加载本地json数据文件
 */
var BadgeDataJson = require("./../BadgeData.json");

/**
 * 获取屏幕宽高
 */
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
// 定义一些全局的变量
var cols = 3;//3列
var boxW = 100;
var vMargin = (width - cols * boxW) / (cols + 1);//计算左边距
var hMargin = 25;

export default class ReactNativeLearn extends Component {
    render() {
        return (
            <View style={styles.container}>
                {this.renderItem()}
            </View>
        );
    }
    renderItem() {
        var allBadge = [];//定义一个数组,数组里面存储组件
        //遍历json数据
        for (var i = 0; i < BadgeDataJson.data.length; i++) {
            var badge = BadgeDataJson.data[i];//取出单个数据
            allBadge.push(
                <View key={i} style={styles.badgeContainer}>
                    <Image source={{uri:badge.icon}} style={ styles.badgeIcon}/>
                    <Text style={styles.badgeTitle}>
                        {badge.title}
                    </Text>
                </View>)
        }
        return allBadge
    }
}


const styles = StyleSheet.create({
    container: {
        // 确定主轴的方向
        flexDirection:'row',
        // 换行显示
        flexWrap:'wrap',
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
    badgeContainer: {
        backgroundColor:"#e3e3e3",
        alignItems:"center",//侧轴对齐方式
        width:boxW,
        height:boxW,
        marginLeft:vMargin,
        marginTop:hMargin
    },
    badgeIcon: {//通过uri指定的图片source,必须要指明宽高才有作用
        width: 60,
        height: 60,
    },
    badgeTitle: {
        textAlign: 'center',
        fontSize: 20,
        marginTop:10,
        color: 'red',
    },
});

AppRegistry.registerComponent('ReactNativeLearn', () => ReactNativeLearn);
