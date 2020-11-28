import React from 'react'

import './continue.styl'

export const ContinueBtn = ({ continueStep, loading }) => {
  return (
    <div className='continue_btn-wrap'>
      <button onClick={continueStep}>{
        loading
          ? <img src={config.urls.media + 'refresh.svg'} />
          : config.translations.continue_btn_label
      }</button>
    </div>
  )
}
