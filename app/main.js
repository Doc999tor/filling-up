import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './components/App.jsx'
import './main.styl'
const body = document.getElementsByTagName('body')[0]
if (config.isRTL) body.style.direction = 'rtl'
ReactDOM.render(
  <App />,
document.getElementById('root'))
