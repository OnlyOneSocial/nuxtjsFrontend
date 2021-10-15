export default function ({ $axios, req }, inject) {
  const token = ''
  const headers = {}
  /* if (req.cookies && req.cookies.token) { token = req.cookies.token }
  if (token !== '') {
    headers = {
      authorization: 'bearer ' + token
    }
  } */

  // const headers = (req && req.headers) ? Object.assign({}, req.headers) : {}
  // Create a custom axios instance

  const api = $axios.create({
    headers
  })

  // Set baseURL to something different
  api.setBaseURL('https://social.katelinlis.xyz/api/')

  // Inject to context as $api
  inject('api', api)
}
