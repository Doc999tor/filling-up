import React, { useState, useEffect } from 'react'

import { unsubscribeService } from 'project-services/unsubscribe'
import validatePhone from 'project-components/validate-phone.js'
import SendingPopup from 'project-components/sending-popup/sending-popup.jsx'

import './unsubscribe.styl'

const Unsubscribe = ({history}) => {
  const [showPopup, setShowPopup] = useState(false)
  const [sendingPopup, setSendingPopup] = useState(true)
  const [validPhone, setValidPhone] = useState(true)
  const [validReason, setValidReason] = useState(true)
  const [inputValues, setValues] = useState({
    phone: '',
    reason: ''
  })

  const handleSubmit = e => {
    e.preventDefault()
    const { phone, reason } = inputValues
    if (reason?.trim() && validatePhone(phone?.trim())) {
      setShowPopup(true)
      const body = `${config.urls.params.slice(1)}&phone=${encodeURIComponent(phone?.trim())}&text=${encodeURIComponent(reason?.trim())}`
      unsubscribeService(body).then(({ status }) => {
        if (status === 200 || status === 204) {
          setSendingPopup(false)
          setTimeout(() => {
            window.location.replace(config.urls.home_site)
          }, 5000)
        }
      })
    } else {
      !reason?.trim() && setValidReason(false)
      !validatePhone(phone?.trim()) && setValidPhone(false)
    }
  }

  const handleChangeInput = ({target: { name, value }}) => {
    setValues(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleBlurPhone = ({target: {value}}) => {
    if (!validatePhone(value?.trim())) {
      setValidPhone(false)
      return
    }
    setValidPhone(true)
  }

  const handleBlurReason = ({target: {value}}) => {
    if (!value?.trim()) {
      setValidReason(false)
      return
    }
    setValidReason(true)
  }

  return <div className='unsubscribe'>
    <div>
      <header className='unsubscribe_header'>
        {config.data.name
          ? <p className='unsubscribe_title'>{config.translations.unsubscribe?.unsubscribe_title_with_name?.replace('{name}', config.data.name)}</p>
          : <p className='unsubscribe_title'>{config.translations.unsubscribe?.unsubscribe_title}</p>}
        <p className='unsubscribe_title with_img'>{config.translations.unsubscribe?.unsubscribe_question} <img src={`${config.urls.media}pic_sad_emoji@2x.png`} alt='' /></p>
        <p className='unsubscribe_subtitle'>{config.translations.unsubscribe?.unsubscribe_subtitle}</p>
      </header>
      {!showPopup
        ? <form className='unsubscribe_form' onSubmit={handleSubmit}>
          <label>
            <span>{config.translations.unsubscribe?.phone_number_label}</span>
            <input
              className={validPhone ? 'normal' : 'warning'}
              type='tel'
              value={inputValues.phone}
              onBlur={handleBlurPhone}
              onChange={handleChangeInput}
              name='phone'
              placeholder={config.translations.unsubscribe?.phone_number_placeholder}
            />
          </label>
          <label>
            <span>{config.translations.unsubscribe?.unsubscribe_reason_label}</span>
            <textarea
              className={validReason ? 'normal' : 'warning'}
              name='reason'
              rows='6'
              value={inputValues.reason}
              onBlur={handleBlurReason}
              onChange={handleChangeInput}
              placeholder={config.translations.unsubscribe?.unsubscribe_reason_placeholder}
            />
          </label>
          <button className={'submit' + (!inputValues.reason || !validatePhone(inputValues.phone) ? ' unactive' : '')} type='submit'>
            <img src={`${config.urls.media}ic_send.svg`} alt='' />
            {config.translations.unsubscribe?.submit_btn_label}
          </button>
      </form>
        : <SendingPopup success_label={config.translations.unsubscribe?.success} sending_label={config.translations.unsubscribe?.sending} sendingPopup={sendingPopup} />}
    </div>
    <footer>
      <a href={config.urls.home_site}>
        <img src={`${config.urls.media}logo_blue.svg`} alt='' />
      </a>
    </footer>
  </div>
}

export default Unsubscribe