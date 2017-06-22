/**
 * Created by liaoxueyan on 17/6/15.
 */
/**
 * ScrollView实现广告banner效果
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
    AlertIOS,//IOS弹框
    ScrollView,
} from 'react-native';

/*获取屏幕宽高*/
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

/*引入timer类*/
var TimerMixin = require("react-timer-mixin");

/*获取广告json*/
var BannerJson = require("./../json/ImageData.json");

/**
 *  ES5创建类语法
 * @type {*|Function}
 */
var ScrollViewDemo = React.createClass({
    //注册计时器,
    mixins: [TimerMixin],

    //固定常量初始化函数
    getDefaultProps(){
        return {
            //间隔多少秒执行
            duration: 3000
        }
    },

    //设置可变的和初始值
    getInitialState(){
        return {
            currentPage: 0,
        }
    },

    render(){
        return (
            <View style={ScrollViewDemoStyle.container}>
                {/*广播banner*/}
                <ScrollView
                    ref="scrollView"
                    horizontal={true}
                    // 隐藏水平滚动条
                    showsHorizontalScrollIndicator={false}
                    // 自动分页
                    pagingEnabled={true}
                    // 当一帧滚动结束
                    onMomentumScrollEnd={(view)=>this.onAnimationEnd(view)}
                    //第二种语法:注意onAnimationEnd没有括号,系统会自动将ScrollView作为参数传递进去
                    //onMomentumScrollEnd={this.onAnimationEnd}
                    // 开始拖拽
                    onScrollBeginDrag={this.onScrollBeginDrag}
                    // 停止拖拽
                    onScrollEndDrag={this.onScrollEndDrag}>
                    {this.renderAllImage()}
                </ScrollView>
                {/*指示器*/}
                <View style={ScrollViewDemoStyle.pageViewStyle}>
                    {/*返回5个圆点*/}
                    {this.renderPageCircle()}
                </View>
            </View>
        )
    },

    /**
     *  生命周期方法,实现复杂逻辑
     */
    componentDidMount(){
        this.startTimer();
    },


    /**
     *
     * @returns {Array}
     */
    renderAllImage(){
        var pageView = [];//定义一个数组
        var imgsArray = BannerJson.data;
        /*图片数组*/
        for (var i = 0; i < imgsArray.length; i++) {
            var img = imgsArray[i];
            pageView.push(
                <Image key={i} style={{width:width,height:120}} source={{uri:img.img}}/>
            )
        }
        return pageView;
    },
    /**
     *
     */
    renderPageCircle(){
        //定义一个数组,放所有圆点
        var circleArray = [];
        var imgslength = BannerJson.data.length;
        var currentStyle;
        for (var i = 0; i < imgslength; i++) {
            //计算样式
            currentStyle = (i == this.state.currentPage) ? {color: 'orange'} : {color: '#ffffff'};

            circleArray.push(
                //多个样式[]
                <Text key={i} style={[{fontSize:25},currentStyle]}>&bull;</Text>
            )
        }
        return circleArray;
    },

    /**
     * 开启指示器动画
     */
    startTimer(){
        var scrollView = this.refs.scrollView;
        var imgCount = BannerJson.data.length;
        //添加定时器流程this.setInterval定时器函数返回一个timer.可以取消这个timer
        this.timer = this.setInterval(function () {
            //设置圆点
            var activePage = 0;
            if((this.state.currentPage+1)>=imgCount){//越界了,滚动到第一个
                activePage=0;
            }else{
                activePage = this.state.currentPage+1;
            }
            //计算scrollView的偏移量
            var offset = activePage*width;
            //滚动到指定位置
            scrollView.scrollResponderScrollTo({x:offset,y:0,animated:true});

        }, this.props.duration)


    },
    /**
     * 一帧滚动结束的时候调用。动画结束的时候更新指示器
     * @param view  scrollView
     */
    onAnimationEnd(view){
        //计算偏移量
        var offSetX = view.nativeEvent.contentOffset.x;
        //计算出当前页数
        var index = Math.floor(offSetX / width);
        //更新状态,重新绘制View
        this.setState({
            currentPage: index,
        })
    },
    /**
     * 开始拖动的时候停止定时器
     */
    onScrollBeginDrag(){
        this.clearInterval(this.timer);
    },
    /**
     * 拖动结束的时候开始定时器
     */
    onScrollEndDrag(){
        this.startTimer();
    },

})

/**
 * 创建样式
 * @type {*|Object|{panHandlers, getInteractionHandle}|GraphFn|{type, property}|{toJSON, toTree, update, unmount, getInstance}}
 */
const ScrollViewDemoStyle = StyleSheet.create({
    container: {
        marginTop: 25,
    },

    pageViewStyle: {
        width: width,
        height: 25,
        backgroundColor: 'rgba(0,0,0,0.4)',
        //定位
        position: 'absolute',
        bottom: 0,
        //设置主轴方向
        flexDirection: 'row',
        alignItems: 'center',//侧轴对齐方向
    }
})

module.exports = ScrollViewDemo;