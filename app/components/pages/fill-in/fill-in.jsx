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
  const [loading, setLoading] = useState(false)
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

  const [name, setName] = useState(sessionStorage.getItem('name') || config.data.name || '')
  const [isNameValid, setIsNameValid] = useState(true)
  const handleChangeName = e => {
    const value = e.target.value
    setIsNameValid(true)
    setName(value)
    sessionStorage.setItem('name', value)
  }

  const [email, setEmail] = useState(sessionStorage.getItem('email') || config.data.email || '')
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

  useEffect(() => {
    config.address_based && editInfo()
    if (config.data.profile_image && !sessionStorage.getItem('photo')) {
      const myImage = document.createElement('img')
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      myImage.onload = () => {
        canvas.width = myImage.width
        canvas.height = myImage.height
        ctx.drawImage(myImage, 0, 0)
        addFoto(null, dataURLtoFile(canvas.toDataURL(), config.data.profile_image))
      }
      myImage.src = config.urls.client_data + config.data.profile_image
    }
  }, [])

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

  const addFoto = (e, data) => {
    const f = e ? e.target.files[0] : data
    if (f) {
      setPhotoName(f.name)
      sessionStorage.setItem('photoName', f.name)
      const highresPhotos = config.plugins?.includes('highres_photos') || false
      Resize(f, callbackPhoto, highresPhotos)
    }
  }

  const [highlightName, setHighlightName] = useState(false)
  const handleToogleName = () => setHighlightName(highlight => !highlight)
  const [highlightEmail, setHighlightEmail] = useState(false)
  const handleToogleEmail = () => setHighlightEmail(highlight => !highlight)
  const [highlightAddress, setHighlightAddress] = useState(false)
  const handleToogleAddress = () => setHighlightAddress(highlight => !highlight)

  const continueStep = () => {
    if (name && name?.trim() && (pattern.test(email?.trim()) || email?.trim() === '' || !email)) {
      setLoading(true)
      const query = JSON.parse(sessionStorage.getItem('fill_query'))
      let body = `b=${query.b}&c=${query.c}&name=${name?.trim()}&email=${email || null}`
      if (config.address_based) body = body + `&address=${address?.trim() || null}`
      const photoData = new FormData()
      photoData.append('b', query.b)
      photoData.append('c', query.c)
      photo && photoData.append('photo', dataURLtoFile(photo, photoName), photoName || 'profile-picture.jpg')
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
    if (email && !pattern.test(email?.trim()) && email?.trim() !== '') {
      setIsEmailValid(false)
    }
  }

  return (
    <div id='fill-in'>
      <div className='client-picture'>
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
            : <label className='photo-section' style={{ backgroundImage: `url('${config.urls.media}pic@2x.jpg')` }}>
              <div className='controls'>
                <div className='control_btn add_button'>
                  <img src={config.urls.media + 'ic_add_photo_plus.svg'} />
                </div>
              </div>
              <input className='file_input' type='file' accept='image/*' onChange={addFoto} />
            </label>
        }
      </div>
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
      <ContinueBtn continueStep={continueStep} loading={loading} />
    </div>
  )
}
export default FillIn
