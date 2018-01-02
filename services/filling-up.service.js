import mainRequestService from './request.service'

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
