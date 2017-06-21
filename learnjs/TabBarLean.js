/**
 * Created by liaoxueyan on 17/6/19.
 */

/**
 * ios toolBar  底部导航栏效果
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
    TabBarIOS,
}from 'react-native';

var screenWidth = require("Dimensions").get("window").width;

var ScrollViewLearn = require("../learnjs/ScrollViewLearn");
var ListViewDemo = require("../learnjs/ListViewDemo")
var ListViewDemo2 = require("../learnjs/ListViewDemo2")
var ListViewDemo3 = require("../learnjs/ListViewDemo3")

var TabBarDemo = React.createClass({

    getInitialState(){
        return {
            selectTab: 0,//默认选中哪个tab
        }
    },


    render(){
        return (
            <View style={TabBarDemoStyle.container}>
                {/*头部*/}
                <View>
                    <Text style={TabBarDemoStyle.titleStyle}> TabBar学习</Text>
                </View>
                {/*选项卡*/}
                <TabBarIOS
                    unselectedTintColor="yellow"
                    tintColor="white"
                    barTintColor="darkslateblue"
                    translucent={true}
                >
                    {/*选项卡1*/}
                    <TabBarIOS.Item
                        title="test1"
                        systemIcon="contacts"
                        selected={this.state.selectTab==0}
                        onPress={()=>{
                           this.setState({
                              selectTab:0,
                           })
                        }}
                    >
                        < ScrollViewLearn />
                    </TabBarIOS.Item>
                    {/*选项卡2*/}
                    <TabBarIOS.Item
                        title="test2"
                        systemIcon="favorites"
                        selected={this.state.selectTab==1}
                        onPress={()=>{
                           this.setState({
                              selectTab:1,
                           })
                        }}
                    >
                        <ListViewDemo/>
                    </TabBarIOS.Item>
                    {/*选项卡3*/}
                    <TabBarIOS.Item
                        title="test3"
                        selected={this.state.selectTab==2}
                        onPress={()=>{
                           this.setState({
                              selectTab:2,
                           })
                        }}
                    >
                        <ListViewDemo2/>
                    </TabBarIOS.Item>
                    {/*选项卡4*/}
                    <TabBarIOS.Item
                        title="微信登录"
                        selected={this.state.selectTab==3}
                        onPress={()=>this.barItemClick(3)}
                    >
                        <ListViewDemo3/>
                    </TabBarIOS.Item>
                </TabBarIOS>
            </View>
        )
    },

    barItemClick(state){
        this.setState({
            selectTab: state,
        })
    }

});

const TabBarDemoStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleStyle: {
        width: screenWidth,
        textAlign: "center",
        fontSize: 30,
        marginTop: 25,
    },
});

module.exports = TabBarDemo;
