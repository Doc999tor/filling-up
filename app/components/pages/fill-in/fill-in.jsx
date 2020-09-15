import React, { useState, useEffect, useRef } from 'react'

import { ContinueBtn } from '../../continue_btn/continue.jsx'

import { patchService as fillingPatchService, postPhotoService as fillingPhotoPostService } from 'project-services/filling-up.service.js'
import { getParamsForApp } from 'project-services/adress.service.js'
import { getCurrentFormatTime } from '../../../helpers/helpers.js'
import Resize from 'project-components/resize.js'
import dataURLtoFile from 'project-components/decodeBase64.js'

import './fill-in.styl'

const FillIn = props => {
  const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  const inputEl = useRef(null)
  const [address, setAddress] = useState(sessionStorage.getItem('address') || config.data.address)
  const handleChangeAddress = ({ target }) => {
    const { value } = target
    setAddress(value)
    sessionStorage.setItem('address', value)
  }
  const loadMap = (url, location) => {
    const scriptTag = document.createElement('script')
    scriptTag.src = url
    location.appendChild(scriptTag)
    scriptTag.onload = () => {
      if (window.google) {
        const input = inputEl.current
        const searchBox = new window.google.maps.places.SearchBox(input)
        searchBox && searchBox.addListener('places_changed', () => {
          const places = searchBox.getPlaces()
          setAddress(places[0].formatted_address)
          sessionStorage.setItem('address', places[0].formatted_address)
        })
      }
    }
  }
  const editInfo = () => {
    if (!window.google) {
      getParamsForApp().then(r => {
        const key = r.r.api_key
        loadMap(`https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&language=${config.locale}`, document.body)
      })
    }
  }
  useEffect(() => {
    config.address_based && editInfo()
  }, [])

  const [name, setName] = useState(sessionStorage.getItem('name') || config.data.name)
  const [isNameValid, setIsNameValid] = useState(true)
  const handleChangeName = e => {
    const value = e.target.value
    setIsNameValid(true)
    setName(value)
    sessionStorage.setItem('name', value)
  }

  const [email, setEmail] = useState(sessionStorage.getItem('email') || config.data.email)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const handleChangeEmail = e => {
    const value = e.target.value
    setIsEmailValid(true)
    setEmail(value)
    sessionStorage.setItem('email', value)
  }

  const [photo, setPhoto] = useState(sessionStorage.getItem('photo') || '')
  const [photoName, setPhotoName] = useState(sessionStorage.getItem('photoName') || '')

  const callbackPhoto = photo => {
    setPhoto(photo)
    sessionStorage.setItem('photo', photo)
  }

  const [deleteAnimation, setDeleteAnimation] = useState(false)
  const deletePhoto = () => {
    setDeleteAnimation(true)
    setTimeout(() => {
      setDeleteAnimation(false)
      setPhoto('')
      setPhotoName('')
      sessionStorage.removeItem('photo')
      sessionStorage.removeItem('photoName')
    }, 350)
  }

  const addFoto = e => {
    const f = e.target.files[0]
    if (config.plugins?.includes('highres_photos')) {
      const reader = new FileReader()
      setPhotoName(f.name)
      sessionStorage.setItem('photoName', f.name)
      reader.readAsDataURL(f)
      reader.onload = () => {
        setPhoto(reader.result)
        sessionStorage.setItem('photo', reader.result)
      }
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
      photo && photoData.append('photo', dataURLtoFile(photo, photoName), 'profile-picture.jpg')
      photoData.append('date', getCurrentFormatTime())
      const promises = [
        fillingPatchService(body),
        photo ? fillingPhotoPostService(photoData) : Promise.resolve('resolved')
      ]
      Promise.all(promises).then(() => {
        props.history.push({ pathname: config.urls.baseUrl + config.urls.other_data, search: config.urls.params })
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
            placeholder={config.translations.fill_in.name_placeholder}
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
            placeholder={config.translations.fill_in.email_placeholder}
            value={email}
            onChange={handleChangeEmail}
          />
        </div>
        {config.address_based &&
          <div className={'input_wrap' + (highlightAddress ? ' highlightInput' : '')}>
            <img src={config.urls.media + 'ic_address.svg'} />
            <input
              id='pac-input'
              className='controls form-input'
              type='text'
              ref={inputEl}
              name='address'
              autoComplete='off'
              onFocus={handleToogleAddress}
              onBlur={handleToogleAddress}
              placeholder={config.translations.fill_in.adress_placeholder}
              value={address}
              onChange={handleChangeAddress}
            />
          </div>}
      </div>
      <ContinueBtn continueStep={continueStep} />
    </div>
  )
}
export default FillIn
