import React from 'react'

import './continue.styl'

export const ContinueBtn = ({ continueStep }) => {
  return (
    <div className='continue_btn-wrap'>
      <button onClick={continueStep}>{config.translations.continue}</button>
    </div>
  )
}
