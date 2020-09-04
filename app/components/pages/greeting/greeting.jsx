import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { patchService as fillingPatchService } from 'project-services/filling-up.service.js'
import './greeting.styl'

const Greeting = ({ history }) => {
  useEffect(() => {
    history.replace({ pathname: config.urls.baseUrl, search: config.urls.params })
    const b = new URL(document.location).searchParams.get('b')
    const c = new URL(document.location).searchParams.get('c')
    const query = { c, b }
    query.c && query.b && sessionStorage.setItem('fill_query', JSON.stringify(query))
  }, [])
  const facebookLogin = () => {
    FB.login(function (response) {
      if (response.authResponse) {
        FB.api('/me', function (response) {
          const c = new URL(document.location).searchParams.get('c')
          const b = new URL(document.location).searchParams.get('b')
          const body = `b=${b}&c=${c}&fb_data=${encodeURIComponent(JSON.stringify(response))}`
          fillingPatchService(body).then(r => {
            if (r.status === 204) history.push(config.urls.baseUrl + config.urls.last_page)
          })
        })
      } else {
        console.log('User cancelled login or did not fully authorize.')
      }
    }, {
      scope: 'public_profile, email, user_photos, user_age_range, user_gender, user_link, user_photos, user_birthday, user_location, user_hometown'
    })
  }
  return (
    <div className='greeting'>
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
          <button onClick={facebookLogin} className='fb_button'><img src={config.urls.media + 'ic_facebook.svg'} alt='fb_button' />{config.translations.greeting_page?.fb_btn_label}</button>
          <Link to={{ pathname: config.urls.baseUrl + config.urls.photo}} className='fill_in_button'><img src={config.urls.media + 'ic_fill_in.svg'} alt='fill_in_button' />{config.translations.greeting_page?.fill_in_btn_label}</Link>
        </div>
      </div>

    </div>
  )
}
export default Greeting
