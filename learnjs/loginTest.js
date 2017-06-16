/**
 * Created by liaoxueyan on 17/6/14.
 */
/**
 * QQ登录效果
 *
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
} from 'react-native';

/*获取屏幕宽高*/
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

class loginView extends Component {
    render() {
        return (
            <View style={loginStyle.container}>
                {/*头像*/}
                <Image source={require("./img/icon.png")} style={loginStyle.headerStyle}/>
                {/*账号密码*/}
                <TextInput placeholder={"请输入账号"} style={loginStyle.inputStyle}/>
                <TextInput placeholder={"请输入密码"} password={true} style={loginStyle.inputStyle}/>
                <Text style={loginStyle.loginBtnStyle}>登录</Text>
                {/*忘记密码*/}
                <View style={loginStyle.settingStyle}>
                    <Text style={{color:'green'}}>无法登录</Text>
                    <Text style={{color:'green'}}>新用户</Text>
                </View>
                {/*其它登录方式*/}
                <View style={loginStyle.otherLoginStyle}>
                    <Text>其它登录方式:</Text>
                    <Image source={require("./img/icon3.png")} style={loginStyle.otherLoginIconStyle}/>
                    <Image source={require("./img/icon7.png")} style={loginStyle.otherLoginIconStyle}/>
                    <Image source={require("./img/icon8.png")} style={loginStyle.otherLoginIconStyle}/>
                </View>
            </View>
        );
    }
}

const loginStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ededed',
        //设置侧轴对齐方式
        alignItems: 'center',
    },
    headerStyle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: "red",
        marginTop: 50,
        marginBottom: 30,
    },

    inputStyle: {
        height: 40,
        padding: 5,
        backgroundColor: 'white',
        textAlign: 'center',
        marginTop: 1,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 4,
        fontSize: 14,
    },
    loginBtnStyle: {
        height: 40,
        width: width - 20,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'blue',
        color: 'white',
        fontSize: 20,
        padding: 10,
        textAlign: 'center',
        borderRadius: 30,
        marginTop: 10,
    },
    settingStyle: {
        width: width - 20,//不要写死了,Android和ios的适配
        //设置主轴方向
        flexDirection: 'row',
        //设置主轴对齐方式
        justifyContent: 'space-between',//两边对齐

        marginTop: 10,
        padding: 10,
    },

    otherLoginStyle: {
        //设置主轴方向:
        flexDirection: 'row',
        //侧轴对齐方式
        alignItems: 'center',

        //固定到底部:采用绝对定位方式
        position: 'absolute',
        bottom: 10,
        left: 20,
    },
    otherLoginIconStyle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 10,
    }
})

module.exports = loginView;