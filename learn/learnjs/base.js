/**
 * Created by liaoxueyan on 17/6/14.
 */
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

export default class LHelloWorld extends Component {
    render() {//界面初始化函数
        return (
            <View style={styles.container}>{/*父View,注意,注释一定要{}括起来*/}
                <View style={flexStyle.flex_container}>
                    <Text style={{backgroundColor:'red', flex :4,height: 80,}}>我是第1个元素大丰收发顺丰啊发发送的</Text>
                    <Text style={{backgroundColor:'blue',flex:1.5}}>我是第2个元素</Text>
                    <Text style={{backgroundColor:'yellow',flex:1.5}}>我是第3个元素</Text>
                    <Text style={{backgroundColor:'green',flex:1.5}}>我是第4个元素</Text>
                    <Text style={{backgroundColor:'orange',flex:1.5, height:45,alignSelf:'flex-end'}}>我是第5个元素</Text>
                </View>
            </View>
        );
    }
}


//定义样式
const styles = StyleSheet.create({
    container: {
        flex: 1, //flex 布局,占满整个屏幕。类似Android 的weight
        backgroundColor: '#F5FCF0'
    },
});

/**
 * Flex box  布局: 旨在通过弹性方式来对齐和分布容器中的内容的空间,使其能适应不同屏幕。
 *       主要用在:浮动布局,手机屏幕适配,水平垂直居中,自动分配宽度
 *
 * @type {*|{toJSON, toTree, update, unmount, getInstance}|{type, property}|Object|{duration, create, update, delete}|Config}
 */
const flexStyle = StyleSheet.create({
    flex_container: {//flexbox 布局
        flexDirection: 'row',//元素排列方式(主轴方向):column 纵向(默认);row 横向
        padding: 25,
        justifyContent: 'flex-start',//子元素的在主轴对齐方式:flex-start:起始位置对齐(默认),flex-end:结束位置靠齐
        //center : 中间位置,space-between 两端对齐;space-around:平均分布在行里
        alignItems: 'flex-start',//子元素在交叉轴的对齐方式,侧轴方向需要根据主轴方向变化。
        // 侧轴flex-start(顶部对齐);flex-end(底部对齐);center;
        // baseline 第一行文字的基线对齐(网页使用);
        // stretch(默认) 如果项目为设置高度或设置为auto,将占满整个容器的高度;
        flexWrap: 'wrap',//设置换行属性.nowrap(不换行),wrap,wrap-reverse;
        //flex:1,//和Android weight 功能一样,指定元素占比。
        alignSelf: 'auto',//允许单个元素与其他元素不一样的对齐方式。
        //auto(默认),flex-start,flex-end,center,baseline,stretch
    },

})

/**----------------------示例程序2---
 * 和Java public class 一样,export default 也只能有一个
 * -----------------------*/

//引入Dimensions 库,用来获取屏幕的宽高
var Dimensions = require("Dimensions");
class LHelloWorld2 extends Component {
    render() {
        return (
            <View style={styles3.mainContainer}>
                <Text> 当前屏幕的宽度:{Dimensions.get('window').width}</Text>
                <Text> 当前屏幕的高度:{Dimensions.get('window').height}</Text>
                <Text> 当前屏幕的分辨率:{Dimensions.get('window').scale}</Text>
                {/*网络图片*/}
                <Image source ={{uri:'http://imgsrc.baidu.com/imgad/pic/item/caef76094b36acaf0accebde76d98d1001e99ce7.jpg'}} style={styles3.imageStyle}>
                    <Text style={{marginTop:40,backgroundColor:'transparent'}}>背景颜色</Text>

                </Image>
            </View>
        );
    }
}

const styles3 = StyleSheet.create({
    mainContainer:{
        flex:1,
        //主轴居中
        justifyContent:'center',
        //侧轴居中,
        alignItems:'center'
    },
    imageStyle:{
        width:160,
        height:160,
        //图片圆角
        borderRadius:30,
        //设置图片内容模式
        resizeMode:'cover',//contain  stretch
        //resizeMode:Image.resizeMode.cover
    }
})


//加载执行那个类
//AppRegistry.registerComponent('LHelloWorld', () => LHelloWorld);
//AppRegistry.registerComponent('LHelloWorld', () => LHelloWorld2);
