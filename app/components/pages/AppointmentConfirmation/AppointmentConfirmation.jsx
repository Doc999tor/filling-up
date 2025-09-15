import { useState, useEffect } from 'react'

import { appointmentConfirmationService } from 'project-services/filling-up.service.js'
import '../greeting/greeting.styl'

const AppointmentConfirmation = ({ history }) => {
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    history.replace({ pathname: config.urls.baseUrl + config.urls.appointment_confirmation, search: config.urls.ac_params })
  }, [])
  const handleConfirm = () => {
    setLoader(true)
    appointmentConfirmationService().then(r => {
      if (r.status === 204) {
        history.push({ pathname: config.urls.baseUrl + config.urls.ac_last_page, search: config.urls.ac_params })
      }
    })
  }

  function getSubtitle () {
    const start = moment(config.appointment_data.start)
    const daysFromToday = start.diff(moment(), 'days')
    const formatter = new Intl.RelativeTimeFormat(config.locale, { numeric: 'auto' })
    const listFormatter = new Intl.ListFormat(config.locale, { style: 'long', type: 'conjunction' })
    if (daysFromToday === 0) {
      return config.translations.appointment_confirmation?.subtitle_today
        .replace('{appointment_time}', start.format('HH:mm'))
        .replace('{services}', listFormatter.format(config.appointment_data.services.map(({ name }) => name)))
        .replace('{business_name}', config.business_name)
        .replace('{worker_name}', config.appointment_data.worker_name)
    } else if (daysFromToday < 4) {
      return config.translations.appointment_confirmation?.subtitle_week
        .replace('{relative_date}', formatter.format(daysFromToday, 'day'))
        .replace('{appointment_time}', start.format('HH:mm'))
        .replace('{services}', listFormatter.format(config.appointment_data.services.map(({ name }) => name)))
        .replace('{business_name}', config.business_name)
        .replace('{worker_name}', config.appointment_data.worker_name)
    } else {
      return config.translations.appointment_confirmation?.subtitle
        .replace('{appointment_date}', start.format('DD/MM'))
        .replace('{relative_date}', formatter.format(daysFromToday, 'day'))
        .replace('{appointment_time}', start.format('HH:mm'))
        .replace('{services}', listFormatter.format(config.appointment_data.services.map(({ name }) => name)))
        .replace('{business_name}', config.business_name)
        .replace('{worker_name}', config.appointment_data.worker_name)
    }
  }

  return (
    <div className='greeting'>
      <div className='window_helper'>
        <div className='window'>
          <img className='business-logo' src={config.business_logo} alt='business-logo' />
        </div>
      </div>
      <div className='title_text'>
        <p>{config.translations.appointment_confirmation?.title?.replace('{client_name}', config.appointment_data.name)}</p>
      </div>
      <div className='common_container'>
        <p className='greeting_subtitle'>{ getSubtitle() }
        </p>
        <div className='btn_section' onClick={handleConfirm}>
          <button disabled={loader} className='fill_in_button'>
            {!loader && <img src={config.urls.media + 'check-circle.svg'} alt='fill_in_button' />}
            {loader && <img className='loader' src={config.urls.media + 'loader.svg'} alt='' />}
            {config.translations.appointment_confirmation?.btn_label}
          </button>
        </div>
      </div>

    </div>
  )
}
export default AppointmentConfirmation
