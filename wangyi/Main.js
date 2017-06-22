/**
 * Created by liaoxueyan on 17/6/19.
 */
/**
 * 主界面
 *
 *
 *
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TabBarIOS,
    NavigatorIOS,
    Image,
} from 'react-native';

var HomeCom = require("/Home");
var DiscoverCom = require("/Discover");
var MessageCom = require("/Message");
var ProfileCom = require("/Profile");


var Main = React.createClass({
    getInitialState(){
        return {
            selectTab: 0,
        }
    },
    render(){
        return (
            <TabBarIOS
                unselectedTintColor="yellow"
                tintColor="white"
                barTintColor="darkslateblue"
            >
                <TabBarIOS.Item
                    title="home"
                    icon={{uri: 'tabbar_home', scale: 2}}
                    selected={this.state.selectTab==0}
                    onPress={()=>this.tabBarClick(0)}
                >
                    {this.navigationCom(HomeCom, "Home")}
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="discover"
                    icon={{uri: 'tabbar_discover', scale: 2}}
                    selected={this.state.selectTab==1}
                    onPress={()=>this.tabBarClick(1)}
                >
                    {this.navigationCom(DiscoverCom, "Discover")}
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="message"
                    icon={{uri: 'tabbar_message_center', scale: 2}}
                    selected={this.state.selectTab==2}
                    onPress={()=>this.tabBarClick(2)}
                >
                    {this.navigationCom(MessageCom, "Message")}
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="profile"
                    icon={{uri: 'tabbar_profile', scale: 2}}
                    selected={this.state.selectTab==3}
                    onPress={()=>this.tabBarClick(3)}
                >
                    <NavigatorIOS
                        style={{flex: 1}}
                        initialRoute={{
                             component: ProfileCom,
                             title: 'Profile',
                    }}
                    />
                </TabBarIOS.Item>
            </TabBarIOS>
        )
    },

    tabBarClick(index){
        this.setState({
            selectTab: index,
        })
    },

    /**
     *
     * @param com
     * @param title
     * @returns {XML}
     */
    navigationCom(com, title){
        return (
            <NavigatorIOS
                style={{flex: 1}}
                initialRoute={{
                    component: com,
                    title: title,
                    passProps: { myProp: 'foo' },//传递参数过去
                    leftButtonIcon:{uri:'navigationbar_friendattention', scale: 2},//左边按钮图片
                    rightButtonIcon:{uri:'navigationbar_pop', scale: 2},//右边按钮图片
                }}
            />
        )
    }

});

const MainStyle = StyleSheet.create({
    container: {},


});

module.exports = Main;