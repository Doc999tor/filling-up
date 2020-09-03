import mainRequestService from 'project-components/request.service.js'

export const getService = q => {
  const url = config.urls.main + config.urls.add_client_url.replace('{query}', q)
  const options = {
    mode: 'cors',
    method: 'GET'
  }
  return mainRequestService(url, options)
}
