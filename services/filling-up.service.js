import mainRequestService from './request.service'

export const patchService = body => {
  const url = config.urls.main + config.urls.filling_up
  const options = {
    mode: 'cors',
    method: 'PATCH',
    body
  }
  return mainRequestService(url, options)
}

export const postService = body => {
  const url = config.urls.main + body.photo ? config.urls.photo_r : config.urls.notes
  const options = {
    mode: 'cors',
    method: 'POST',
    body
  }
  return mainRequestService(url, options)
}
