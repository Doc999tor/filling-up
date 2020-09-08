import mainRequestService from 'project-components/request.service.js'

export const getParamsForApp = () => {
  const url = config.urls.add_address
  const options = {
    method: 'GET'
  }
  return mainRequestService(url, options).then(r => r.json().then(r => ({ r })))
}
