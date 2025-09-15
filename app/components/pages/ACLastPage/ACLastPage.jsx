import parseLinkFromText from 'project-components/parse_link_from_text.js'

import '../last-page/last-page.styl'

const ACLastPage = () => {
  return (
    <div id='last_page'>
      <div className='window_helper'>
        <div className='window'>
          <img className='hand' src={config.urls.media + '3d_hand_ok@2x.png'} alt='hand_ok' />
        </div>
      </div>
      <div className='title_text'>
        <p>{config.translations.ac_last_page?.title}</p>
      </div>
      {/* <p
        className='subtitle_text'
        dangerouslySetInnerHTML={{ __html: parseLinkFromText(config.greetings_text ? config.greetings_text : config.translations.ac_last_page?.subtitle) }}
        /> */}
      <div className='subtitle_text'>
        <p>{config.translations.ac_last_page?.subtitle
          .replace('{appointment_date}', moment(config.appointment_data.start).format('DD/MM'))
          .replace('{appointment_time}', moment(config.appointment_data.start).format('HH:mm'))
        }</p>
      </div>

      <div className='links ac_links'>
        {config.business_links?.map(({ url, icon, type }) => <a
          key={url}
          className={type}
          target='_blank'
          rel='noopener noreferrer'
          href={url}
        ><img src={config.urls.media + icon} /></a>)}
      </div>
    </div>
  )
}
export default ACLastPage
