import React, { useState, useEffect } from 'react'

import { ContinueBtn } from '../../continue_btn/continue.jsx'
import { Checkbox } from 'project-components/checkbox/checkbox.jsx'
import Datepicker from 'project-components/Datepicker_upd/datepicker.jsx'
import { GenderItem } from 'project-components/single-gender/single-gender.jsx'

import { patchService as fillingPatchService, postService } from 'project-services/filling-up.service.js'
import { getCurrentFormatTime } from '../../../helpers/helpers.js'

import './other-data.styl'

let timeout
const OtherData = ({ history }) => {
  const [loading, setLoading] = useState(false)
  const [loader, setLoader] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [check, setCheck] = useState(false)
  const [permitAds, setPermitAds] = useState((sessionStorage.getItem('permit_ads') === 'true' ? true : false ) || config.data.permit_ads)
  useEffect(() => {
    return () => {
      clearTimeout(timeout)
    }
  }, [])
  const handleCangeCheckbox = ({ target }) => {
    const { checked } = target
    setPermitAds(checked)
    sessionStorage.setItem('permit_ads', checked)
  }

  const [gender, setGender] = useState(sessionStorage.getItem('gender') || config.data.gender)
  const handleChangeGender = type => {
    setGender(gender => {
      sessionStorage.setItem('gender', type === gender ? null : type)
      return type === gender ? null : type
    })
  }

  const [highlightMonth, setHighlightMonth] = useState(false)

  const [highlightDay, setHighlightDay] = useState(false)

  const [year, setYear] = useState(sessionStorage.getItem('year') || config.data.birthyear || config.translations.datepicker.placeholder.year)

  const handleChangeYear = ({ target }) => {
    const { value } = target
    setYear(value)
    sessionStorage.setItem('year', value)
  }

  const [month, setMonth] = useState(sessionStorage.getItem('month') || (config.data.birthdate ? config.data.birthdate.slice(0, 2) : config.translations.datepicker.placeholder.month))
  const handleChangeMonth = ({ target }) => {
    const { value } = target
    setMonth(value)
    sessionStorage.setItem('month', value)
    highlightMonth && setHighlightMonth(false)
  }

  const [day, setDay] = useState(sessionStorage.getItem('day') || (config.data.birthdate ? config.data.birthdate.slice(3) : config.translations.datepicker.placeholder.day))
  const handleChangeDay = ({ target }) => {
    const { value } = target
    setDay(value)
    sessionStorage.setItem('day', value)
    highlightDay && setHighlightDay(false)
  }

  const sendData = (birthyear = null, birthdate = null) => {
    setLoading(true)
    const c = new URL(document.location).searchParams.get('c')
    const b = new URL(document.location).searchParams.get('b')
    const genderValue = gender === 'male' || gender === 'female' ? gender : null
    let body = `b=${b}&c=${c}&gender=${genderValue || null}&permit_ads=${permitAds}&birthyear=${birthyear}&birthdate=${birthdate}`
    fillingPatchService(body).then(r => {
      if (r.status === 204) {
        history.push({ pathname: config.urls.baseUrl + config.urls.last_page, search: config.urls.params })
      }
    }
    )
  }

  const handleAddFile = ({ target }) => {
    if (loader) return false
    const { files } = target
    const file = files[0]
    if (file) {
      setLoader(true)
      setUploadError(null)
      const c = new URL(document.location).searchParams.get('c')
      const b = new URL(document.location).searchParams.get('b')
      const data = new FormData()
      const url = config.urls.api_upload_files
      data.append('b', b)
      data.append('c', c)
      data.append('file', file, file.name)
      data.append('added', getCurrentFormatTime())
      postService(url, data).then(r => {
        if (r.status === 201) {
          setLoader(false)
          setCheck(true)
          timeout = setTimeout(() => {
            setCheck(false)
          }, 2000)
        }
        if (r.status === 413) {
          setUploadError(413)
          setLoader(false)
        }
        if (r.status === 415) {
          setUploadError(415)
          setLoader(false)
        }
      })
    }
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
      <div className='main_content'>
        <div className='gender_strip'>
          <h3 className='gender_title'>{config.translations.other_data.gender_strip_title}</h3>
          <div className='gender_items_wrap'>
            {config.gender?.data?.map(({ id, type, ...props }) => <GenderItem type={type} gender_text={config.translations.other_data.gender[type]} onSelectGender={handleChangeGender} key={id} gender={gender} {...props} />)}
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
        <div className='upload_files_strip'>
          <h3 className='upload_title'>{config.translations.other_data.uploading_files_title}</h3>
          <label className='uploading_wrap'>
            <input className='input_file' type='file' onChange={handleAddFile} />
            <div className='input_file_label'>
              <p className='input_file_text'>{config.translations.other_data.uploading_files_label}</p>
              <div className='img_container'>
                {!loader && !check && <img className='img' src={config.urls.media + 'upload.svg'} alt='' />}
                {loader && <img className='file_loader' src={config.urls.media + 'loader.svg'} alt='' />}
                {check && <img className='img' src={config.urls.media + 'check.svg'} alt='' />}
              </div>
            </div>
            {uploadError == 415 && <p className='error_text'>{config.translations.other_data.error_text_415}</p>}
            {uploadError == 413 && <p className='error_text'>{config.translations.other_data.error_text_413}</p>}
          </label>
        </div>
        <div className='checkbox_container'>
          <div className='permission_strip'>
            <div>
              <h3 className='permission_title'>{config.translations.other_data.permission_strip_title}</h3>
              <Checkbox
                text={config.translations.other_data.checkbox_label.replace('{business_name}', config.business_name)}
                onHandleChange={handleCangeCheckbox}
                value={permitAds}
              />
            </div>
            <img className='gift_box' src={config.urls.media + 'gift_box.svg'} alt='' />
          </div>
          {!permitAds && <img className='recommend_hand' src={config.urls.media + 'hand_recommend.png'} />}
          {permitAds && <img className='ok_hand' src={config.urls.media + 'ok_hand.png'} />}
        </div>
      </div>
      <ContinueBtn continueStep={continueStep} loading={loading} label={config.translations.other_data.continue_btn_label} />
    </div>
  )
}
export default OtherData
