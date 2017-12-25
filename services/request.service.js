const mainRequestService = (u, o) => fetch(u, o).then(r =>
  r.status !== 503 ? r : new Promise(resolve => setTimeout(() => resolve(mainRequestService(u, o)), r.headers.get('Retry-After'))))
export default mainRequestService
