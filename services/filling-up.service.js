import mainRequestService from 'project-components/request.service.js'

export const patchService = body => {
  const url = config.urls.main + config.urls.filling_up
  const options = {
    mode: 'cors',
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  }
  return mainRequestService(url, options)
}

export const postPhotoService = body => {
  const url = config.urls.main + config.urls.photo_r
  const options = {
    mode: 'cors',
    method: 'POST',
    body
  }
  return mainRequestService(url, options)
}
export const postService = (url, body) => {
  const options = {
    mode: 'cors',
    method: 'POST',
    body
  }
  return mainRequestService(url, options)
}

export const postNoteService = body => {
  const url = config.urls.main + config.urls.notes
  const options = {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  }
  return mainRequestService(url, options)
}

export const appointmentConfirmationService = () => {
  const url = config.urls.main + config.urls.api_appointment_confirmation.replace('{appointment_id}', config.appointment_data.id)
  const options = {
    mode: 'cors',
    method: 'PUT'
  }
  return mainRequestService(url, options)
}
