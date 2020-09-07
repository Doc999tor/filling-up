import React from 'react'

import './single-gender.styl'

export const GenderItem = ({ gender, icon, active_icon, type, onSelectGender }) => (
  <div className={'gender_item' + (type === gender ? ' selected_gender' : '')} onClick={() => onSelectGender(type)}>
    <div className='avatar_wrap'>
      <img src={config.urls.media + (type === gender ? active_icon : icon)} />
    </div>
    <div className='type_wrap'>
      <p>{config.translations.other_data.gender[type]}</p>
      <div className='select' />
    </div>
  </div>
)
