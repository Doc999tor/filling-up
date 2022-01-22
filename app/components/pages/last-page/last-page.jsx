import React from 'react'

import parseLinkFromText from 'project-components/parse_link_from_text.js'

import './last-page.styl'

const LastPage = () => {
  return (
    <div id='last_page'>
      {
        config.business_links && config.business_links[0]?.url && <a href={(config.business_links && config.business_links[0]?.url) || config.footer.data[0]?.link} className='close_button'><img src={config.urls.media + 'ic_close.svg'} alt='' /></a>
      }
      <div className='window_helper'>
        <div className='window'>
          <img className='hand' src={config.urls.media + '3d_hand_ok@2x.png'} alt='hand_ok' />
        </div>
      </div>
      <div className='title_text'>
        <p>{config.translations.last_page?.last_page_title}</p>
      </div>
      <p
        className='subtitle_text'
        dangerouslySetInnerHTML={{ __html: parseLinkFromText(config.greetings_text ? config.greetings_text : config.translations.last_page?.last_page_subtitle) }}
      />
      {config.business_address && <div className='address-strip'>
        <p className='address_text'>{config.translations.last_page?.business_address_title?.replace('{business_name}', config.business_name)}</p>
        <div className='address_label'>
          <img src={config.urls.media + 'purple_address.svg'} />
          <p>{config.business_address}</p>
        </div>
      </div>}
      <div className='links'>
        {config.business_links?.map(({ url, icon, type }) => <a key={url} className={type} href={url}><img src={config.urls.media + icon} /></a>)}
      </div>
      {/*<footer className='footer'>
        {config.footer?.data?.map(({ name, link, icon }) => <a key={link} href={link}>{icon && <img src={config.urls.media + icon} />}{name && config.translations.last_page.footer[name]}</a>)}
      </footer>*/}
    </div>
  )
}
export default LastPage
