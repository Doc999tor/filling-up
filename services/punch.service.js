import mainRequestService from './request.service'

const mainUrl = config.urls.main + config.urls.punch_cards_req.replace('{client_id}', config.data.id)

export const postService = (id, body) => {
  const url = mainUrl + '/' + id + '/use'
  const options = {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    body
  }
  return mainRequestService(url, options)
}

export const deleteService = id => {
  const url = mainUrl + '/' + id
  const options = {
    mode: 'cors',
    method: 'DELETE'
  }
  return mainRequestService(url, options)
}

export const deleteServiceUse = (Pid, Uid) => {
  const url = mainUrl + '/' + Pid + '/use/' + Uid
  const options = {
    mode: 'cors',
    method: 'DELETE'
  }
  return mainRequestService(url, options)
}
