import React, { Suspense, lazy, useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { Layout } from './layout/layout.jsx'
import './App.styl'

const Greeting = lazy(() => import('./pages/greeting/greeting.jsx'))
const AppointmentConfirmation = lazy(() => import('./pages/AppointmentConfirmation/AppointmentConfirmation.jsx'))
const FillIn = lazy(() => import('./pages/fill-in/fill-in.jsx'))
const LastPage = lazy(() => import('./pages/last-page/last-page.jsx'))
const ACLastPage = lazy(() => import('./pages/ACLastPage/ACLastPage.jsx'))
const OtherData = lazy(() => import('./pages/other-data/other-data.jsx'))

export const App = () => {
  const history = useHistory()
  useEffect(() => {
    const pageName = new URL(document.location).searchParams.get('page')
    if (pageName === config.urls.photo.slice(1)) history.replace({ pathname: config.urls.baseUrl + config.urls.photo, search: config.urls.params })
    if (pageName === config.urls.other_data.slice(1)) history.replace({ pathname: config.urls.baseUrl + config.urls.other_data, search: config.urls.params })
    if (pageName === config.urls.last_page.slice(1)) history.replace({ pathname: config.urls.baseUrl + config.urls.last_page, search: config.urls.params })
    if (pageName === config.urls.appointment_confirmation.slice(1)) history.replace({ pathname: config.urls.baseUrl + config.urls.appointment_confirmation, search: config.urls.params })
    if (pageName === config.urls.ac_last_page.slice(1)) history.replace({ pathname: config.urls.baseUrl + config.urls.ac_last_page, search: config.urls.params })
  }, [])
  return (
    <Layout>
      <Switch>
        <Suspense fallback={<div className='suspense'><img className='loader' src={config.urls.media + 'preloader.svg'} /></div>}>
          <Route exact path={config.urls.baseUrl + config.urls.photo} component={FillIn} />
          <Route exact path={config.urls.baseUrl + config.urls.other_data} component={OtherData} />
          <Route exact path={config.urls.baseUrl + config.urls.last_page} component={LastPage} />
          <Route exact path={config.urls.baseUrl + config.urls.appointment_confirmation} component={AppointmentConfirmation} />
          <Route exact path={config.urls.baseUrl + config.urls.ac_last_page} component={ACLastPage} />
          <Route exact path={config.urls.baseUrl + '/'} component={Greeting} />
        </Suspense>
      </Switch>
    </Layout>
  )
}
