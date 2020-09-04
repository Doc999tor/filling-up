import React from 'react'

import './single-gender.styl'

export const GenderItem = ({id, icon, type }) => {
  return (
    <div className='gender_item'>
      <div className='avatar_wrap'>
        <img src={config.urls.media + icon} />
      </div>
      <div className='type_wrap'>
        <p>{config.translations.other_data.gender[type]}</p>
        <div className='select' />
      </div>
    </div>
  )
}
