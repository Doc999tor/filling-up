import React, { useState } from 'react'
import { patchService as fillingPatchService } from 'project-services/filling-up.service.js'
import { postPhotoService as fillingPhotoPostService } from 'project-services/filling-up.service.js'
import { getCurrentFormatTime } from '../../../helpers/helpers.js'
import { default as Resize } from 'project-components/resize.js'
import { default as dataURLtoFile } from 'project-components/decodeBase64.js'

import './fill-in.styl'

const FillIn = props => {
  const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const [name, setName] = useState(config.data.name || sessionStorage.getItem('name'))
  const [isNameValid, setIsNameValid] = useState(true)
  const handleChangeName = e => {
    const value = e.target.value
    setIsNameValid(true)
    setName(value)
    config.data.name = value
    sessionStorage.setItem('name', value)
  }

  const [email, setEmail] = useState(config.data.email || sessionStorage.getItem('email'))
  const [isEmailValid, setIsEmailValid] = useState(true)
  const handleChangeEmail = e => {
    const value = e.target.value
    setIsEmailValid(true)
    setEmail(value)
    config.data.email = value
    sessionStorage.setItem('email', value)
  }

  const [address, setAddress] = useState(config.data.address || sessionStorage.getItem('address'))
  const handleChangeAddress = e => {
    const value = e.target.value
    setAddress(value)
    config.data.address = value
    sessionStorage.setItem('address', value)
  }

  const callbackPhoto = photo => setPhoto(photo)

  const [photo, setPhoto] = useState('')
  const [deleteAnimation, setDeleteAnimation] = useState(false)
  const deletePhoto = () => {
    setDeleteAnimation(true)
    setTimeout(() => {
      setDeleteAnimation(false)
      setPhoto('')
    }, 350)
  }

  const addFoto = e => {
    const f = e.target.files[0]
    if (config.plugins?.includes('highres_photos')) {
      const reader = new FileReader()
      reader.readAsDataURL(f)
      reader.onload = () => setPhoto(reader.result)
    } else {
      Resize(f, callbackPhoto)
    }
  }

  const [highlightName, setHighlightName] = useState(false)
  const handleToogleName = () => setHighlightName(highlight => !highlight)
  const [highlightEmail, setHighlightEmail] = useState(false)
  const handleToogleEmail = () => setHighlightEmail(highlight => !highlight)
  const [highlightAddress, setHighlightAddress] = useState(false)
  const handleToogleAddress = () => setHighlightAddress(highlight => !highlight)
  
  const continueStep = () => {
    if (name?.trim() && pattern.test(email?.trim())) {
      const query = JSON.parse(sessionStorage.getItem('fill_query'))
      let body = `b=${query.b}&c=${query.c}&name=${name?.trim()}&email=${email}`
      if (config.address_based) body = body + `&address=${address?.trim() || null}`
      const photoData = new FormData()
      photoData.append('b', query.b)
      photoData.append('c', query.c)
      photo && photoData.append('photo', dataURLtoFile(photo))
      photoData.append('date', getCurrentFormatTime())
      const promises = [
        fillingPatchService(body),
        photo ? fillingPhotoPostService(photoData) : Promise.resolve('resolved')
      ]
      Promise.all(promises).then(() => {
        props.history.push(config.urls.baseUrl + config.urls.other_data)
      })
      return false
    }
    if (!name?.trim()) {
      setIsNameValid(false)
    }
    if (!pattern.test(email?.trim())) {
      setIsEmailValid(false)
    }
  }

  return (
    <div id='fill-in'>
      {
        photo
          ? <div className={'added_photo' + (deleteAnimation ? ' deleteAnimation' : '')}>
            <img className='client-img' src={photo} />
            <div className='controls'>
              <label className='control_btn'>
                <img src={config.urls.media + 'ic_photo.svg'} />
                <input className='file_input' type='file' accept='image/*' onChange={addFoto} />
              </label>
              <div className='control_btn' onClick={deletePhoto}>
                <img src={config.urls.media + 'ic_delete.svg'} />
              </div>
            </div>
          </div>
          : <div className='photo-section'>
            <label>
              <div className='camera'>
                <img src={config.urls.media + 'ic_add_photo.svg'} />
                <div className='shine_star'>
                  <img src={config.urls.media + 'shine_star.svg'} />
                </div>
              </div>
              <input className='file_input' type='file' accept='image/*' onChange={addFoto} />
            </label>
          </div>
      }
      <div className='inputs'>
        <div className={'input_wrap' + (isNameValid ? '' : ' warning') + (highlightName ? ' highlightInput' : '')}>
          <img src={config.urls.media + 'ic_clients.svg'} />
          <input
            type='text'
            name='name'
            placeholder={config.translations.full_name}
            value={name}
            onFocus={handleToogleName}
            onBlur={handleToogleName}
            onChange={handleChangeName}
          />
        </div>
        <div className={'input_wrap' + (isEmailValid ? '' : ' warning') + (highlightEmail ? ' highlightInput' : '')}>
          <img src={config.urls.media + 'ic_email.svg'} />
          <input
            type='email'
            name='email'
            onFocus={handleToogleEmail}
            onBlur={handleToogleEmail}
            placeholder={config.translations.email}
            value={email}
            onChange={handleChangeEmail}
          />
        </div>
        {config.address_based &&
          <div className={'input_wrap' + (highlightAddress ? ' highlightInput' : '')}>
            <img src={config.urls.media + 'ic_email.svg'} />
            <input
              type='text'
              name='address'
              onFocus={handleToogleAddress}
              onBlur={handleToogleAddress}
              placeholder={config.translations.adress}
              value={address}
              onChange={handleChangeAddress}
            />
          </div>}
      </div>
      <div className='btn-wrap'>
        <button onClick={continueStep}>{config.translations.continue}</button>
      </div>
    </div>
  )
}
export default FillIn
