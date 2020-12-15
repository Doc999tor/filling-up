import mainRequestService from 'project-components/request.service.js'

export const unsubscribeService = body => {
  const url = config.urls.unsubscribe_api_service
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