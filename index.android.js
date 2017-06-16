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

var LoginView = require("./login")

export default class ReactNativeLearn extends Component {
  render() {
    return (
         <LoginView/>
    );
  }
}


AppRegistry.registerComponent('ReactNativeLearn', () => ReactNativeLearn);
