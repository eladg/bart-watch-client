import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import MapView from './Components/Map/mapView';

let ReactDOM = require('react-dom');

// render the app root
ReactDOM.render(
  <Provider store={store}>
    <MapView/>
  </Provider>
  
  , document.getElementById("root")
);