/**
 * Created by liaoxueyan on 17/6/21.
 */
/**
 *
 * 封装广告banner
 *   1、timer插件的引进:
 *   2、组件之间数据的传递
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


/**
 *  ES5创建类语法
 * @type {*|Function}
 */
var Banner = React.createClass({
    //1、注册计时器,
    mixins: [TimerMixin],

    /**
     *固定常量初始化函数,
     *
     */
    getDefaultProps(){
        return {
            //间隔多少秒执行
            duration: 3000,
            //数据对象,可以传递过来
            bannerDataArray: [],
        }
    },

    /**
     *设置可变的和初始值
     *
     */
    getInitialState(){
        console.log("----60---"+this.props.bannerDataArray[0])
        return {
            //当前页
            currentPage: 0,
            //当前页标题
            currentTitle:this.props.bannerDataArray[0].title,
        }
    },

    render(){
        return (
            <View style={BannerStyle.container}>
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
                <View style={BannerStyle.pageViewStyle}>
                    {/*新闻标题*/}
                    {console.log("----89---"+this.props.bannerDataArray)/*不能这样? 报错undefined*/}
                    {/*onsolec.log("----89---"+this.props.bannerDataArray[0].title)不能这样? 报错undefined*/}
                    <Text style={{color:'white',fontSize:12 }}>{this.state.currentTitle} </Text>

                    {/*指示器*/}
                    <View style={{flexDirection:'row'}}>
                        {/*返回5个圆点*/}
                        {this.renderPageCircle()}
                    </View>

                </View>
            </View>
        )
    },

    /**
     *  生命周期方法,实现复杂逻辑
     */
    componentDidMount(){
        console.log("----112---"+this.props.bannerDataArray[0])
        // this.setState({
        //     currentTitle: title,
        // })
        this.startTimer();
    },
    /**
     *
     */
    componentWillReceiveProps(){
        console.log("----componentWillReceiveProps---"+this.props.bannerDataArray)
    },


    /**
     * 绘制scrollView的item
     * @returns {Array}
     */
    renderAllImage(){
        var pageView = [];//定义一个数组
        var imgsArray = this.props.bannerDataArray;
        /*图片数组*/
        for (var i = 0; i < imgsArray.length; i++) {
            var img = imgsArray[i];
            pageView.push(
                <Image key={i} style={{width:width,height:120}} source={{uri:img.imgsrc}}/>
            )
        }
        return pageView;
    },

    /**
     * 绘制指示器
     */
    renderPageCircle(){
        //定义一个数组,放所有圆点
        var circleArray = [];
        var imgslength = this.props.bannerDataArray.length;
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
        var imgCount = this.props.bannerDataArray.length;
        //添加定时器流程this.setInterval定时器函数返回一个timer.可以取消这个timer
        this.timer = this.setInterval(function () {
            //设置圆点
            var activePage = 0;
            if ((this.state.currentPage + 1) >= imgCount) {//越界了,滚动到第一个
                activePage = 0;
            } else {
                activePage = this.state.currentPage + 1;
            }
            //计算scrollView的偏移量
            var offset = activePage * width;
            //滚动到指定位置
            scrollView.scrollResponderScrollTo({x: offset, y: 0, animated: true});

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
        var title = this.props.bannerDataArray[index].title;
        //更新状态,重新绘制View
        this.setState({
            currentPage: index,
            currentTitle: title,
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
const BannerStyle = StyleSheet.create({
    container: {},

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
        justifyContent: 'space-between',//主轴两端对齐
        paddingLeft:5,
        paddingRight:5,
    }
})

module.exports = Banner;