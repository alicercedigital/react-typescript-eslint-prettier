import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import reportWebVitals from './reportWebVitals';
import App from './components/App';

Axios.defaults.baseURL = 'http://localhost:8000/v1';
Axios.defaults.headers.common['token-admin'] = '827b~cmzD:;f9#dC~;UqL}WD9BL';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
