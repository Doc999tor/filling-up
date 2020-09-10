import React, { Suspense, lazy, useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { Layout } from './layout/layout.jsx'
import './App.styl'

const Greeting = lazy(() => import('./pages/greeting/greeting.jsx'))
const FillIn = lazy(() => import('./pages/fill-in/fill-in.jsx'))
const LastPage = lazy(() => import('./pages/last-page/last-page.jsx'))
const OtherData = lazy(() => import('./pages/other-data/other-data.jsx'))

export const App = () => {
  let history = useHistory()
  useEffect(() => {
    const pageName = new URL(document.location).searchParams.get('page')
    if (pageName === config.urls.photo.slice(1)) history.push(config.urls.baseUrl + config.urls.photo)
    if (pageName === config.urls.other_data.slice(1)) history.push(config.urls.baseUrl + config.urls.other_data)
    if (pageName === config.urls.last_page.slice(1)) history.push(config.urls.baseUrl + config.urls.last_page)
  }, [])
  return (
    <Layout>
      <Switch>
        <Suspense fallback={<div className='suspense'><img className='loader' src={config.urls.media + 'preloader.svg'} /></div>}>
          <Route exact path={config.urls.baseUrl + config.urls.photo} component={FillIn} />
          <Route exact path={config.urls.baseUrl + config.urls.other_data} component={OtherData} />
          <Route exact path={config.urls.baseUrl + config.urls.last_page} component={LastPage} />
          <Route exact path={config.urls.baseUrl + '/'} component={Greeting} />
        </Suspense>
      </Switch>
    </Layout>
  )
}
