/**
 * Created by liaoxueyan on 17/6/19.
 */
/**
 *Find 模块
 *
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    ListView,
    ScrollView,
    TouchableOpacity,
    AlertIOS,
    Image,

} from 'react-native';

//获取离线缓存数据
var LocalData = require('LocalData.json');

/*获取屏幕宽高*/
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
//引入广告组件
var Banner = require("./Banner");
//引入详情界面
var MessageDetail = require("./MessageDetail");

var Home = React.createClass({

    getDefaultProps(){
        return {
            token: 'T1348647853363',
            message_url: "https://www.baidu.com",
            banner_url: "",
        }
    },

    /**
     * 初始化数据
     */
    getInitialState(){
        return {
            //广告banner数据
            bannerDataArr: [],
            //ListView的dataSource
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 != r2}),
        }
    },

    render(){
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderCell}
                renderHeader={this.createHeader}
            >
            </ListView>
        )
    },
    /**
     * 创建ListView的header,一个广告banner
     */
    createHeader(){
        console.log("-------createHeader-------" + this.state.bannerDataArr.length)
        //小细节问题,不等于0的时候加载广告banner
        if (this.state.bannerDataArr.length == 0) {
            return;
        }
        return (
            <Banner
                bannerDataArray={this.state.bannerDataArr} //  传递参数给组件
            />
        )
    },


    /**
     * 创建Cell
     * @param rowData
     * @param sectionID
     * @param rowID
     * @param highlightRow
     */
    renderCell(rowData, sectionID, rowID, highlightRow){
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.pushToNewsDetail(rowData)}}>
                <View style={HomeStyle.cellViewStyle}>
                    {/*左边*/}
                    {console.log("--------106-------" + rowData.img) }
                    <Image source={{uri:rowData.img}} style={HomeStyle.imgStyle}/>
                    {/*右边*/}
                    <View style={HomeStyle.rightViewStyle}>
                        <Text style={HomeStyle.titleStyle}>{rowData.title}</Text>
                        <Text style={HomeStyle.subTitleStyle}>{rowData.digest}</Text>
                        <Text style={HomeStyle.flowTitleStyle}>{rowData.replyCount}跟帖</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    },

    /**
     * 请求网络数据
     */
    componentDidMount(){
        this.loadDataFromNet();
    },

    /**
     * 加载网络数据
     */
    loadDataFromNet(){
        fetch(this.props.message_url)
            .then((response)=>response.json())//json格式化数据后返回给下一步
            .then((responseData)=> {
                // 拿到所有的数据
                var jsonData = responseData[this.props.token];
                // 处理网络数据
                this.processNetData(jsonData);
            })
            .catch((error)=> {
                if (error) {
                    AlertIOS.alert("网络错误")
                    // 拿到所有的数据
                    var jsonData = LocalData[this.props.token];
                    // 特殊处理
                    this.processNetData(jsonData)
                }
            })
    },

    /**
     * 处理网络返回的数据
     * @param jsonData
     */
    processNetData(jsonData){
        console.log(jsonData);
        //取出数据
        var headerArr = [];
        var listDataArr = [];
        for (var i = 0; i < jsonData.length; i++) {
            var data = jsonData[i];//取出单个数据
            if (data.hasAD == 1) {//有广告
                headerArr = data.ads;
            } else {//消息数据
                listDataArr.push(data);
            }
        }
        this.setState({
            bannerDataArr: headerArr,
            dataSource: this.state.dataSource.cloneWithRows(listDataArr),
        });
    },

    /**
     * 界面跳转逻辑
     * @param rowData
     */
    pushToNewsDetail(rowData){
        // AlertIOS.alert(rowData.title);
        //拿到导航的navigator
        this.props.navigator.push({
            component: MessageDetail,//下级界面板块
            title: rowData.title,//标题 
            passProps: { msgDomain: rowData },//传递的参数
        });
    },

});

const HomeStyle = StyleSheet.create({

    bannerContainer: {
        height: 120,
        backgroundColor: '#ff00ff'
    },

    cellViewStyle: {
        // 确定主轴的方向
        flexDirection: 'row',
        // 设置侧轴的对齐方式
        // alignItems:'center',
        padding: 10,
        // 设置下边框
        borderBottomColor: '#e8e8e8',
        borderBottomWidth: 0.5
    },

    imgStyle: {
        width: 90,
        height: 90
    },

    rightViewStyle: {
        width: 260,
        marginLeft: 8
    },

    titleStyle: {
        fontSize: 16,
        marginBottom: 5
    },

    subTitleStyle: {
        color: 'gray'
    },

    flowTitleStyle: {
        // 绝对定位
        position: 'absolute',
        right: 10,
        bottom: 0,

        // 边框
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 3,

        color: 'gray'
    },

})


module.exports = Home;