import React, { Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from './layout/layout.jsx'
// import Home from './pages/home/home.jsx'
// import Greeting from './pages/greeting/greeting.jsx'
import './App.styl'
{/* <Route exact path={config.urls.baseUrl + config.urls.other_data} component={OtherData} />

      <Route exact path={config.urls.baseUrl + config.urls.last_page} component={LastPage} />
      <Route exact path={config.urls.baseUrl + config.urls.photo} component={Photo} /> */}
// const Home = lazy(() => import('./routes/Home'));
const Greeting = lazy(() => import('./pages/greeting/greeting.jsx'))
const FillIn = lazy(() => import('./pages/home/home.jsx'))
const LastPage = lazy(() => import('./pages/last-page/last-page.jsx'))
const PhotoPage = lazy(() => import('./pages/photo/photo.jsx'))
const OtherData = lazy(() => import('./pages/other-data/other-data.jsx'))

export const App = () => {
  return (
    <Layout>
      <Switch>
        <Suspense fallback={<div className='suspense'><img className='loader' src={config.urls.media + 'preloader.svg'} /></div>}>
          <Route path={config.urls.baseUrl + config.urls.home} component={Greeting} />
          <Route path={config.urls.baseUrl + config.urls.fill_in} component={FillIn} />
          <Route path={config.urls.baseUrl + config.urls.photo} component={PhotoPage} />
          <Route path={config.urls.baseUrl + config.urls.other_data} component={OtherData} />
          <Route path={config.urls.baseUrl + config.urls.last_page} component={LastPage} />
          <Redirect from='/' to={{ pathname: config.urls.baseUrl + config.urls.home, search: config.urls.params }} />
        </Suspense>
      </Switch>
    </Layout>
  )
}
