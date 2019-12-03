import lazy from './lazy.js'
import './main.styl'
const OtherData = lazy(() => import('./components/other-data/other-data.jsx').then(m => m.default))
const LastPage = lazy(() => import('./components/last-page/last-page.jsx').then(m => m.default))
const Photo = lazy(() => import('./components/photo/photo.jsx').then(m => m.default))
const Home = lazy(() => import('./components/home/home.jsx').then(m => m.default))
const {BrowserRouter, Switch, Route, Redirect} = ReactRouterDOM

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path={config.urls.baseUrl + config.urls.other_data} component={OtherData} />
      <Route exact path={config.urls.baseUrl + config.urls.last_page} component={LastPage} />
      <Route exact path={config.urls.baseUrl + config.urls.photo} component={Photo} />
      <Route path={config.urls.baseUrl + config.urls.home} component={Home} />
      <Redirect to={{ pathname: config.urls.baseUrl + config.urls.home, search: config.urls.params }} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'))
