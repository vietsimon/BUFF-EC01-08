import React from 'react';
import ReactDOM from 'react-dom/client';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/bootstrap.min.css';
import './assets/css/font-awesome.min.css';
import './assets/css/so_megamenu.css';
import './assets/css/so-categories.css';
import './assets/css/so-listing-tabs.css';
// import './assets/css/header7.css';
import './assets/css/header4.css';
import './assets/css/footer2.css';
import './assets/css/theme.css';
import './assets/css/theme-orange.css';
// import './assets/css/home7.css';
import './assets/css/responsive.css';
import './assets/css/App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
    document.getElementById('wrapper') as HTMLElement
);
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
