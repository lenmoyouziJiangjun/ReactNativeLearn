/**
 * Created by liaoxueyan on 17/6/14.
 */
/**
 * 控件事件
 *   1、
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
} from 'react-native';

/*获取屏幕宽高*/
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

/**
 * ES6创建类的方式
 */
class loginView extends Component {
    render() {
        return (
            <View style={loginStyle.container}>
                <TouchableOpacity>
                    <Text style={loginStyle.loginBtnStyle}>
                        登录
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    loginBtnClick() {
        console.log("点击登录");
        AlertIOS.alert("点击登录")
    }
}

/**
 * ES5方式创建类
 *
 * */
var LoginViewClass = React.createClass({

    getInitialState(){
        return {title: "不透明触摸"}
    },

    render() {
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center' }}>
                {/*rn的事件跟其他事件注册方式不一样,需要用TouchableOpacity包裹事件组件*/}
                <TouchableOpacity
                    onPress={()=>this.activeEvent("点击事件")}
                    onPressIn={()=>this.activeEvent("按下事件")}
                    onPressOut={()=>this.activeEvent("抬起事件")}
                    onLongPress={()=>this.activeEvent("长按事件")}
                >
                    <Text style={loginStyle.loginBtnStyle}>
                        登录
                    </Text>
                </TouchableOpacity>

                <Text style={{alignSelf:'center', textAlign:'center',fontSize:20}}>
                    {this.state.title}
                </Text>
            </View>
        );
    },

    activeEvent(event){
        this.setState({
            title: event,
        });
    }
});


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

//module.exports = loginView;
module.exports = LoginViewClass;