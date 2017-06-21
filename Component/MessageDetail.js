/**
 * Created by liaoxueyan on 17/6/21.
 */
/**
 * 消息详情界面
 *
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
    WebView,
} from 'react-native';

var MessageDetail = React.createClass({

    getDefaultProps(){
        return {
            msgDomain: [],
        }
    },
    getInitialState(){
        return {
            url: 'https://www.baidu.com',
            status: 'No Page Loaded',
            backButtonEnabled: false,
            forwardButtonEnabled: false,
            loading: true,
            scalesPageToFit: true,
        }
    },

    render(){
        return (
            <View style={MessageStyle.container}>
                <WebView
                    automaticallyAdjustContentInsets={true}
                    style={MessageStyle.webView}
                    source={{uri: this.state.url}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    onNavigationStateChange={this.onNavigationStateChange}
                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                    startInLoadingState={true}
                    scalesPageToFit={this.state.scalesPageToFit}
                />
            </View>
        )
    },

    onNavigationStateChange(){

    },
    onShouldStartLoadWithRequest(){

    },


});

const MessageStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    webView: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        height: 350,
    },

});

module.exports = MessageDetail;
