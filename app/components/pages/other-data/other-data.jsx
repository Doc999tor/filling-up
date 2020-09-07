import React, { useState } from 'react'

import { GenderItem } from './components/single-gender/single-gender.jsx'
import { ContinueBtn } from '../../continue_btn/continue.jsx'
import { Checkbox } from 'project-components/checkbox/checkbox.jsx'
import Datepicker from 'project-components/Datepicker_upd/datepicker.jsx'

import { patchService as fillingPatchService } from 'project-services/filling-up.service.js'

import './other-data.styl'

const OtherData = ({ history }) => {
  const [permitAds, setPermitAds] = useState(config.data.permit_ads)
  const handleCangeCheckbox = ({ target }) => {
    const { checked } = target
    setPermitAds(checked)
  }

  const [gender, setGender] = useState(config.data.gender)
  const handleChangeGender = type => {
    setGender(gender => type === gender ? null : type)
  }

  const [highlightMonth, setHighlightMonth] = useState(false)

  const [highlightDay, setHighlightDay] = useState(false)

  const [year, setYear] = useState(config.data.birthyear || config.translations.datepicker.placeholder.year)

  const handleChangeYear = ({ target }) => {
    const { value } = target
    setYear(value)
  }

  const [month, setMonth] = useState(config.data.birthdate ? config.data.birthdate.slice(0, 2) : config.translations.datepicker.placeholder.month)
  const handleChangeMonth = ({ target }) => {
    const { value } = target
    setMonth(value)
    highlightMonth && setHighlightMonth(false)
  }

  const [day, setDay] = useState(config.data.birthdate ? config.data.birthdate.slice(3) : config.translations.datepicker.placeholder.day)
  const handleChangeDay = ({ target }) => {
    const { value } = target
    setDay(value)
    highlightDay && setHighlightDay(false)
  }

  const sendData = (birthyear = null, birthdate = null) => {
    const query = JSON.parse(sessionStorage.getItem('fill_query'))
    let body = `b=${query.b}&c=${query.c}&gender=${gender || null}&permit_ads=${permitAds}&birthyear=${birthyear}&birthdate=${birthdate}`
    fillingPatchService(body).then(() => history.push(config.urls.baseUrl + config.urls.last_page))
  }

  const continueStep = () => {
    if (isNaN(+year) && isNaN(+month) && isNaN(+day)) {
      sendData()
      return false
    } else if (!isNaN(+day) && isNaN(+month) && (isNaN(+year) || !isNaN(+year))) {
      setHighlightMonth(true)
      return false
    } else if (!isNaN(+year) && isNaN(+month) && isNaN(+day)) {
      setHighlightDay(true)
      setHighlightMonth(true)
      return false
    } else if (isNaN(+year) && !isNaN(+month) && isNaN(+day)) {
      setHighlightDay(true)
      return false
    } else if (!isNaN(+month) && !isNaN(+year) && !isNaN(+day)) {
      sendData(year, `${month}-${day}`)
      return false
    } else if (!isNaN(+month) && !isNaN(+year) && isNaN(+day)) {
      sendData(year, `${month}-01`)
      return false
    } else if (!isNaN(+month) && isNaN(+year) && !isNaN(+day)) {
      sendData(new Date().getFullYear(), `${month}-${day}`)
      return false
    }
  }

  return (
    <div id='other_data'>
      <div className='gender_strip'>
        <h3 className='gender_title'>{config.translations.other_data.gender_strip_title}</h3>
        <div className='gender_items_wrap'>
          {config.gender?.data?.map(({ id, ...props }) => <GenderItem onSelectGender={handleChangeGender} key={id} gender={gender} {...props} />)}
        </div>
      </div>
      <div className='birthdate_strip'>
        <h3 className='birthdate_title'>{config.translations.other_data.birthdate_strip_title}</h3>
        <div className='field'>
          <Datepicker
            handleChangeYear={handleChangeYear}
            handleChangeMonth={handleChangeMonth}
            handleChangeDay={handleChangeDay}
            highlightMonth={highlightMonth}
            highlightDay={highlightDay}
            year={year}
            month={month}
            day={day}
          />
        </div>
      </div>
      <div className='checkbox_container'>
        <Checkbox
          text={config.translations.other_data.checkbox_label}
          onHandleChange={handleCangeCheckbox}
          value={permitAds}
        />
        <img className='recommend_hand' src={config.urls.media + 'hand_recommend.png'} />
        {permitAds && <img className='ok_hand' src={config.urls.media + 'ok_hand.png'} />}
      </div>
      <ContinueBtn continueStep={continueStep} />
    </div>
  )
}
export default OtherData
