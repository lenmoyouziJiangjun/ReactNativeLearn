/**
 * Created by liaoxueyan on 17/6/19.
 */
/**
 * ListView 使用demo3: 汽车品牌列表
 *  分组ListView的固定语法:
 *
 *
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


var carJson = require("../json/Car.json")
var screenWidth = require("Dimensions").get("window").width;


var ListViewDemo3 = React.createClass({

    getInitialState(){
        // 获取组数据,从dataBlob中获取
        var getSectionData = (dataBlob, sectionId)=> {
            return dataBlob[sectionId]
        };
        //获取行数据
        var getRowData = (dataBlob, sectionId, rowId)=> {
            return dataBlob[sectionId + ":" + rowId];
        };

        return {
            //创建listView的DataSource
            dataSource: new ListView.DataSource({
                getSectionData: getSectionData, //获取组数据
                getRowData: getRowData,//获取行数据
                rowHasChanged: (r1, r2)=>r1 != r2, //行变化刷新规则
                sectionHeaderHasChanged: (s1, s2)=>s1 != s2, //组数据变化刷新规则
            })
        }
    },

    /**
     * 复杂操作,数据请求,异步操作
     */
    componentDidMount(){
        this.loadDataFromJson();
    },
    /**
     * 构造分组ListView需要的数据
     */
    loadDataFromJson(){
        //拿到json数据
        var jsonData = carJson.data;

        var dataBlob = {};//对象类型
        var sectionIds = [];//分组id,数组类型
        var rowIds = [];//行id,二维数组类型
        var cars = [];

        for (var i = 0; i < jsonData.length; i++) {
            //1、把组id放入sectionIds;
            sectionIds.push(i);
            //2、将分组显示的数据内容放到dataBlob中;(分组的title)
            dataBlob[i] = jsonData[i].title;//组数据
            //3、取出该组中所有的车
            cars = jsonData[i].cars;
            rowIds[i] = [];//rowIds[i]为一个行id的数组
            //存储行索引
            for (var j = 0; j < cars.length; j++) {
                rowIds[i].push(j);
                //把每一行中的car放入到dataBlob中
                dataBlob[i + ":" + j] = cars[j];//行数据
            }
        }
        //数据准备完成,更新数据
        this.setState({
            //ListView实现分组,需要调用这个方法,所以,我们需要构造如下三个参数。
            //cloneWithRowsAndSections(dataBlob, sectionIdentities, rowIdentities)
            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds),
        });
    },

    render(){
        return (
            <View style={GroupListViewStyle.container}>
                {/*jsx语法,碰到<就按照HTML解析,碰到大括号就按照js解析。html中的注释格式,为这中样式*/}
                <Text style={GroupListViewStyle.titleStyle}> 汽车列表</Text>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderCell}
                    renderSectionHeader={this.renderSection}
                ></ListView>
            </View>
        )
    },
    /**
     * 创建Cell
     * @param rowData
     * @param sectionID
     * @param rowID
     * @param highlightRow
     * @returns {XML}
     */
    renderCell(rowData, sectionID, rowID, highlightRow){
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={(e)=>this.itemClick(e)}>
                <View style={GroupListViewStyle.itemStyle}>
                    <Image source={{uri:rowData.icon}} style={GroupListViewStyle.iconStyle}/>
                    <Text style={GroupListViewStyle.nameStyle}>{rowData.name}</Text>
                </View>
            </TouchableOpacity>
        )
    },
    /**
     * 创建item
     * @param sectionData
     * @param sectionID
     */
    renderSection(sectionData, sectionID){
        return (
            <View style={GroupListViewStyle.sectionStyle}>
                <Text style={{fontSize:20,color:"#FF0000",marginLeft:10,}}>{sectionData} </Text>
            </View>
        )
    },

    itemClick(view){

    }
});

const GroupListViewStyle = StyleSheet.create({
    container: {
        marginTop: 25,
    },
    titleStyle: {
        width: screenWidth,
        textAlign: "center",
        fontSize:30,
    },
    listViewStyle: {},
    sectionStyle: {
        height: 30,
        justifyContent: 'center',
        backgroundColor: '#efefef',
    },
    itemStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ededed',
    },
    iconStyle: {
        width: 60,
        height: 60,
    },
    nameStyle: {
        fontSize: 18,
        marginLeft:10,
    }
});

module.exports = ListViewDemo3;