import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './components/App.jsx'
import 'modern-normalize/modern-normalize.css'
import './main.styl'
document.getElementsByTagName('body')[0].style.direction = config.isRTL ? 'rtl' : 'ltr'
const elem = document.getElementById('skeleton')
elem.parentNode.removeChild(elem)

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'))
