import lazy from './lazy.js'
import './main.styl'
const Home = lazy(() => import('./components/home/home.jsx').then(m => m.default))
const {BrowserRouter, Switch, Route} = ReactRouterDOM

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'))
