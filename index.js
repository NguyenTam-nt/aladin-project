/**
 * @format
 */
import React , {useLayoutEffect} from 'react';
import Orientation from 'react-native-orientation-locker';
import {AppRegistry } from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

import {Provider} from 'react-redux';
import store from './src/redux';

export  const  MarketMoa  = () =>  {

useLayoutEffect(() => {
    Orientation.lockToPortrait();
}, []);
      return (
        <Provider store={store}>
          <App />
        </Provider>
      );
    };


AppRegistry.registerComponent(appName, () => MarketMoa);