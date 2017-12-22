import lazy from './lazy.js'
import './main.styl'
const Photo = lazy(() => import('./components/photo/photo.jsx').then(m => m.default))
const Home = lazy(() => import('./components/home/home.jsx').then(m => m.default))
const {BrowserRouter, Switch, Route, Redirect} = ReactRouterDOM

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path={config.urls.photo} component={Photo} />
      <Route exact path={config.urls.home} component={Home} />
      <Redirect from='*' to={config.urls.home} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'))
