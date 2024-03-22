import { useState, useEffect } from 'react'

import { appointmentConfirmationService } from 'project-services/filling-up.service.js'
import '../greeting/greeting.styl'

const AppointmentConfirmation = ({ history }) => {

  const [loader, setLoader] = useState(false)

  useEffect(() => {
    history.replace({ pathname: config.urls.baseUrl + config.urls.appointment_confirmation, search: config.urls.params })
    const b = new URL(document.location).searchParams.get('b')
    const c = new URL(document.location).searchParams.get('c')
    const query = { c, b }
    query.c && query.b && sessionStorage.setItem('fill_query', JSON.stringify(query))
  }, [])
  const handleConfirm = () => {
    setLoader(true)
    appointmentConfirmationService().then(r => {
      if (r.status === 204) {
        history.push({pathname: config.urls.baseUrl + config.urls.ac_last_page, search: config.urls.params})
      }
    })
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
        <p className='greeting_subtitle'>{
          config.translations.appointment_confirmation?.subtitle
            .replace('{appointment_date}', new Intl.RelativeTimeFormat(config.locale, { numeric: 'auto' }).format(moment(config.appointment_data.start).diff(moment().format('YYYY-MM-DD'), 'days'), 'day'))
            .replace('{appointment_time}', moment(config.appointment_data.start).format('HH:mm'))
            .replace('{services}', new Intl.ListFormat(config.locale, { style: 'long', type: 'conjunction' }).format(config.appointment_data.services.map(({ name }) => name)))
            .replace('{business_name}', config.business_name)
        }
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
