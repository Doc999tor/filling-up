import mainRequestService from './request.service'

export const postService = body => {
  const url = config.urls.main + config.urls.media_url.replace('{client_id}', config.data.id)
  const options = {
    mode: 'cors',
    method: 'POST',
    body
  }
  return mainRequestService(url, options)
}
