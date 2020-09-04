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
      <div className='title_text'>
        <p>{config.translations.last_page?.last_page_title}</p>
      </div>
      <p className='subtitle_text'>{config.translations.last_page?.last_page_subtitle}</p>
      <div className='address-strip'>
        <p className='address_text'>{config.translations.last_page?.business_address_title}</p>
        <div className='address_label'>
          <img src={config.urls.media + 'purple_address.svg'} />
          <p>{config.business_adress}</p>
        </div>
      </div>
      <div className='links'>
        {config.business_links?.map(({ url, icon }) => <a key={url} href={url}><img src={config.urls.media + icon} /></a>)}
      </div>
      <footer className='footer'>
        {config.footer?.data?.map(({ name, link, icon }) => <a key={link} href={link}>{icon && <img src={config.urls.media + icon} />}{name && config.translations.last_page.footer[name]}</a>)}
      </footer>
    </div>
  )
}
export default LastPage
