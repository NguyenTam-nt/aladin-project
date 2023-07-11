/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {Provider} from "react-redux";
import store from './src/redux';

export class GiangMy extends React.Component {
    render() {
      return (
        <Provider store={store}>
        <App />
      </Provider>
      )
    }
  }

AppRegistry.registerComponent(appName, () => GiangMy);
