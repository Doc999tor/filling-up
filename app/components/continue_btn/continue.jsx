import React from 'react'

import './continue.styl'

export const ContinueBtn = ({ continueStep, loading, label }) => {
  return (
    <div className='continue_btn-wrap'>
      <button onClick={continueStep}>{
        loading
          ? <img src={config.urls.media + 'refresh.svg'} />
          : label || config.translations.continue_btn_label
      }</button>
    </div>
  )
}
