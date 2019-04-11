import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import CoachReport from './CoachReport/CoachReport'
import CoachReport2 from './CoachReport/CoachReport2'
import {socket} from './Socket'

if (document.getElementById('root')) {
  render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('root'));
}

  window.XDomain = {
    // http://localhost:3000/XDomain/CoachReport/
    CoachReport : CoachReport,
    // CoachReport2: CoachReport2,
    socket : socket,
    React,
    // Export render
    render

  }

  window.XDomain2 = {
    // http://localhost:3000/XDomain/CoachReport2/
    CoachReport2: CoachReport2,
    socket : socket,
    React,
    // Export render
    render

  }



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
