import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../header/header.jsx'
import { patchService as fillingPatchService } from 'project-services/filling-up.service.js'
import './greeting.styl'

const Greeting = ({ history }) => {
  const loadFB = () => {
    var script = document.createElement('script')
    script.src = config.urls.fb_script
    document.getElementsByTagName('head')[0].appendChild(script)
  }
  useEffect(() => {
    loadFB()
    history.replace({ pathname: config.urls.baseUrl, search: config.urls.params })
    const b = new URL(document.location).searchParams.get('b')
    const c = new URL(document.location).searchParams.get('c')
    const query = { c, b }
    query.c && query.b && sessionStorage.setItem('fill_query', JSON.stringify(query))
  }, [])
  const [highlightBtn, setHighlightBtn] = useState(false)
  const facebookLogin = () => {
    FB.login(function (response) {
      if (response.authResponse) {
        FB.api('/me', 'GET', { fields: 'name,birthday,email,gender,timezone,website,picture.width(480).height(480)' }, function (response) {
          console.log({ response });
          const c = new URL(document.location).searchParams.get('c')
          const b = new URL(document.location).searchParams.get('b')
          const body = `b=${b}&c=${c}&fb_data=${encodeURIComponent(JSON.stringify(response))}`
          if (response.error) {
            setHighlightBtn(true)
          } else {
            if (response.gender) sessionStorage.setItem('gender', response.gender)
            if (response.birthday) {
              const parseBirthday = response.birthday?.split('/')
              if (parseBirthday.length === 3) {
                sessionStorage.setItem('month', parseBirthday[0])
                sessionStorage.setItem('day', parseBirthday[1])
                sessionStorage.setItem('year', parseBirthday[2])
              }
            }
            fillingPatchService(body).then(r => {
              if (r.status === 204) history.push({ pathname: config.urls.baseUrl + config.urls.other_data, search: config.urls.params })
            })
          }
        })
      } else {
        console.log('User cancelled login or did not fully authorize.')
      }
    }, {
      scope: 'public_profile, email, user_photos, user_age_range, user_gender, user_link, user_photos, user_birthday, user_location, user_hometown'
    }
    )
  }
  return (
    <div className='greeting'>
      <Header />
      <div className='window_halper'>
        <div className='window'>
          <img className='hand' src={config.urls.media + '3d_hand@2x.png'} alt='hand' />
        </div>
      </div>
      <div className='title_text'>
        {config.data.name
          ? <p>{config.translations.greeting_page?.greeting_title_with_name?.replace('{name}', config.data.name)}</p>
          : <p>{config.translations.greeting_page?.greeting_title}</p>}
      </div>
      <div className='common_container'>
        <p className='greeting_subtitle'>{config.translations.greeting_page?.greeting_subtitle}</p>
        <div className='btn_section'>
          <button onClick={facebookLogin} className={'fb_button' + (highlightBtn ? ' error_btn' : '')}><img src={config.urls.media + 'ic_facebook.svg'} alt='fb_button' />{config.translations.greeting_page?.fb_btn_label}</button>
          <Link to={{ pathname: config.urls.baseUrl + config.urls.photo, search: config.urls.params }} className='fill_in_button'><img src={config.urls.media + 'ic_fill_in.svg'} alt='fill_in_button' />{config.translations.greeting_page?.fill_in_btn_label}</Link>
        </div>
      </div>

    </div>
  )
}
export default Greeting
