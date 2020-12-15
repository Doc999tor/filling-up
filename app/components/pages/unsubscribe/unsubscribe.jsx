import React, { useState, useEffect } from 'react'

import { unsubscribeService } from 'project-services/unsubscribe'
import validatePhone from 'project-components/validate-phone.js'

import './unsubscribe.styl'

const Unsubscribe = ({history}) => {
  const [disableBtn, setDisableBtn] = useState(false)
  const [sending, setSending] = useState(false)
  const [validPhone, setValidPhone] = useState(true)
  const [validReason, setValidReason] = useState(true)
  const [inputValues, setValues] = useState({
    phone: '',
    reason: ''
  })

  // useEffect(() => {
  //   history.replace({ search: config.urls.params })
  // }, [])

  const handleSubmit = e => {
    e.preventDefault()
    const { phone, reason } = inputValues
    if (reason?.trim() && validatePhone(phone?.trim())) {
      setDisableBtn(true)
      setSending(true)
      const body = `${config.urls.params.slice(1)}&phone=${encodeURIComponent(phone?.trim())}&text=${encodeURIComponent(reason?.trim())}`
      unsubscribeService(body).then(({ status }) => {
        if (status === 200 || status === 204) {
          setSending(false)
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
      <form className='unsubscribe_form' onSubmit={handleSubmit}>
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
          <button disabled={disableBtn} className={'submit' + (!inputValues.reason || !validatePhone(inputValues.phone) ? ' unactive' : '')} type='submit'>
            {sending
              ? <img className='loader' src={`${config.urls.media}refresh.svg`} alt='' />
              : <img src={`${config.urls.media}ic_send.svg`} alt='' />
            }
            {config.translations.unsubscribe?.submit_btn_label}
          </button>
      </form>
    </div>
    <footer>
      <a href={config.urls.home_site}>
        <img src={`${config.urls.media}logo_blue.svg`} alt='' />
      </a>
    </footer>
  </div>
}

export default Unsubscribe
