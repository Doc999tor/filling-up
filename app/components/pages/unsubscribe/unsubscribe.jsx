import React, { useState, useEffect } from 'react'

import './unsubscribe.styl'

const Unsubscribe = ({history}) => {
  const [inputValues, setValues] = useState({
    phone: null,
    reason: ''
  })
  useEffect(() => {
    history.replace({ search: config.urls.params })
  }, [])
  const handleSubmit = e => {
    e.preventDefault()
    console.log('Submit ...', inputValues);
  }
  const handleChangeInput = ({ target: { name, value } }) => {
    setValues(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  return <div className='unsubscribe'>
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
            type='tel'
            value={inputValues.phone}
            onChange={handleChangeInput}
            name='phone'
            placeholder={config.translations.unsubscribe?.phone_number_placeholder}
          />
        </label>
        <label>
          <span>{config.translations.unsubscribe?.unsubscribe_reason_label}</span>
          <textarea
            name='reason'
            rows='6'
            value={inputValues.reason}
            onChange={handleChangeInput}
            placeholder={config.translations.unsubscribe?.unsubscribe_reason_placeholder}
          />
        </label>
        <button className='submit' type='submit'><img src={`${config.urls.media}ic_send.svg`} alt='' />{config.translations.unsubscribe?.submit_btn_label}</button>
    </form>
  </div>
}

export default Unsubscribe
