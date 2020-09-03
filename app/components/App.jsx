import React, { Suspense, lazy } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Layout } from './layout/layout.jsx'
import './App.styl'

const Greeting = lazy(() => import('./pages/greeting/greeting.jsx'))
const FillIn = lazy(() => import('./pages/fill-in/fill-in.jsx'))
const LastPage = lazy(() => import('./pages/last-page/last-page.jsx'))
const OtherData = lazy(() => import('./pages/other-data/other-data.jsx'))

export const App = () => {
  return (
    <Layout>
      <Switch>
        <Suspense fallback={<div className='suspense'><img className='loader' src={config.urls.media + 'preloader.svg'} /></div>}>
          <Route exact path={config.urls.baseUrl + '/'} component={Greeting} />
          <Route exact path={config.urls.baseUrl + config.urls.photo} component={FillIn} />
          <Route exact path={config.urls.baseUrl + config.urls.other_data} component={OtherData} />
          <Route exact path={config.urls.baseUrl + config.urls.last_page} component={LastPage} />
        </Suspense>
      </Switch>
    </Layout>
  )
}
