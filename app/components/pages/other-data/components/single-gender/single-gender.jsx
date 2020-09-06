import React from 'react'

import './single-gender.styl'

export const GenderItem = ({ id, gender, icon, active_icon, type, onSelectGender }) => (
  <div className={'gender_item' + (id === gender ? ' selected_gender' : '')} onClick={() => onSelectGender(id)}>
    <div className='avatar_wrap'>
      <img src={config.urls.media + (id === gender ? active_icon : icon)} />
    </div>
    <div className='type_wrap'>
      <p>{config.translations.other_data.gender[type]}</p>
      <div className='select' />
    </div>
  </div>
)
