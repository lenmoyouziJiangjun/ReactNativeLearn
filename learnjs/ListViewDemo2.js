/**
 * Created by liaoxueyan on 17/6/18.
 */
/**
 * ListView 实现九宫格
 *  <ListView
 dataSource={this.state.dataSource} //指定数据源
 renderRow={this.renderCell} //创建Cell
 style={GridViewStyle.container} //样式
 contentContainerStyle={} //内部样式。更改原有的样式
 >
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    AlertIOS,
} from 'react-native';

var ShareJson = require("../json/shareData.json");

var itemWidth = 100;//每一个item的宽度
var cols = 3;//3列
var itemMarginBottom = 20;//底部距离
var screenWidth = require("Dimensions").get('window').width;//获取屏幕宽度
//计算margin
var itemMarginLeft = (screenWidth - itemWidth * cols) / (cols + 1);


var ListViewDemo2 = React.createClass({

    /**
     * 初始化常量和,界面数据的跳转
     */
    getDefaultProps(){

    },

    /**
     * 变量初始化
     */
    getInitialState(){
        //初始listView,固定格式
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 != r2});
        return {
            dataSource: ds.cloneWithRows(ShareJson.data)
        }
    },

    /**
     * 渲染View
     * @returns {XML}
     */
    render(){
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderCell}
                style={GridViewStyle.container}
                contentContainerStyle={GridViewStyle.gridViewStyle}
            >

            </ListView>
        )
    },
    /**
     * 创建ListView 的cell
     */
    renderCell(rowData){
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={(e)=>this.itemClick(e)}>
                <View style={GridViewStyle.itemViewStyle}>
                    <Image source={{uri:rowData.icon}} style={GridViewStyle.iconStyle}/>
                    <Text style={GridViewStyle.titleStyle}>{rowData.title} </Text>
                </View>
            </TouchableOpacity>
        )
    },

    itemClick(item){
        AlertIOS.alert("点击了我" + item);
    }

})

const GridViewStyle = StyleSheet.create({
    container: {
        marginTop: 25,
    },
    //实现九宫格样式,1,横向排列,允许多行
    gridViewStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',//允许换行
    },
    itemViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: itemMarginBottom,
        width: itemWidth,
        marginLeft: itemMarginLeft,
    },
    iconStyle: {
        width: 80,
        height: 80,
    },
    titleStyle: {
        textAlign: 'center',
        fontSize: 20,
    }
})


module.exports = ListViewDemo2;