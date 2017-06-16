/**
 * Created by liaoxueyan on 17/6/16.
 */

/**
 * ListView 学习demo
 */


import React, {Component} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,//触摸事件
    AlertIOS,//IOS弹框
    ScrollView,
    ListView,
} from 'react-native';

/*获取屏幕宽高*/
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

/*加载数据*/
var WineJson = require("./json/Wine.json");

var ListViewDemo = React.createClass({

    getInitialState(){
        //1、第一步创建ListView的DataSource;rowHasChanged 指明什么时候更新cell
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 != r2});
        //2、指定dataSource 的数据
        return {
            dataSource: ds.cloneWithRows(WineJson),
        }
    },

    render(){
        return (
            <View style={ListViewStyle.container}>
                <ListView
                    dataSource={this.state.dataSource} //数据源
                    //创建Cell,renderRow(rowData, sectionID, rowID, highlightRow)
                    renderRow={this.createCell}//我们自定义一个函数createCell,注意没有(),表示将renderRow函数的参数自动传递进去了。
                >

                </ListView>
            </View>
        )
    },
    /**
     * 创建Cell
     *     注意,点击事件不能这样写:onPress={AlertIOS.alert("")};这样写界面加载的时候调用一次后,后面就不调用了
     * @param rowData  数据
     * @param sectionID 索引
     * @param rowID    分组索引
     * @param highlightRow   改行是否高亮
     */
    createCell(rowData, sectionID, rowID, highlightRow){
        console.log(rowData + "------------" + sectionID + "-------" + rowID);
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={()=>{AlertIOS.alert('点击了'+rowID+'行')}}>
                <View style={ListViewStyle.cellViewStyle}>
                    {/*左边的icon*/}
                    <Image source={{uri:rowData.image}} style={ListViewStyle.cellIconStyle}/>
                    <View style={ListViewStyle.cellInfoStyle}>
                        <Text style={ListViewStyle.nameStyle}>{rowData.name }</Text>
                        <Text style={ListViewStyle.moneyStyle}>$:{rowData.money}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
});


const ListViewStyle = StyleSheet.create({
    container: {
        paddingTop: 25,
    },

    cellViewStyle: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 4,
        marginLeft: 10,
        marginBottom: 10,
        marginRight: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "#ededed"
    },
    //image 的style 。必须要宽高才行
    cellIconStyle: {
        width: 40,
        height: 40,
    },
    cellInfoStyle: {
        marginLeft: 10,
        justifyContent: 'center',//主轴方向
    },
    nameStyle: {
        color: "#000000",
        fontSize: 12,
        width: width * 0.8,
    },
    moneyStyle: {
        color: 'red',
        fontSize: 10,
        marginTop: 10,
    }
});


module.exports = ListViewDemo;