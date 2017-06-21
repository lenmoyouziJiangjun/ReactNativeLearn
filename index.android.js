/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

var Main = require("./Component/Main")

export default class ReactNativeLearn extends Component {
  render() {
    return (
         <Main/>
    );
  }
}


AppRegistry.registerComponent('ReactNativeLearn', () => ReactNativeLearn);
