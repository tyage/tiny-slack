import ReactDOM from 'react-dom';
import React from 'react';
import $ from 'jquery';
import App from './components/App';

$(() => {
  ReactDOM.render(<App />, $('#app').get(0));
})
