import React from 'react';
import ReactDom from 'react-dom';
import Routes from './routes';

filepicker.setKey("AF5Az2VdR7yfTzKlmjzVgz");

// All our views are rendered inside the #content div
ReactDom.render(
  Routes,
  document.getElementById('content')
)
