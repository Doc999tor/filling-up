import React from 'react'
import './last-page.styl'

const LastPage = () => {
  return (
    <div id='last_page'>
      <div className='window_halper'>
        <div className='window'>
          <img className='hand' src={config.urls.media + '3d_hand_ok@2x.png'} alt='hand_ok' />
        </div>
      </div>
      <h1 className='thanks'>{config.data.name ? config.data.name + ', ' + config.translations.thanks : config.translations.thanks}</h1>
      <div className='like_wrap'><img src={config.urls.media + 'like.svg'} /></div>
      <h1 className='glad_see'>{config.translations.glad_see}</h1>
      <div className='text-wrap'>
        <div className='icon'>
          <img src={config.urls.media + 'heart.png'} />
        </div>
        <h1 className='text'>{config.greetings_text}</h1>
      </div>
      <h1 className='bus_name'>{config.business_name}</h1>
      <div className='text-wrap'>
        <div className='icon'>
          <img src={config.urls.media + 'house.png'} />
        </div>
        <div className='text'>
          <h1 className='address'>{config.business_adress}</h1>
          <h1>{config.business_desc}</h1>
        </div>
      </div>
      <div className='links'>
        {config.business_links.map(i => <a href={i.url}><img src={config.urls.media + i.icon} onError={e => { e.target.src = config.urls.media + 'default_link.png' }} /></a>)}
      </div>
      {/* <div className='btn-wrap'>
        <button onClick={() => close()}>{config.translations.close}</button>
      </div> */}
    </div>
  )
}
export default LastPage
